import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { TableContainer, Table, TableBody, TableRow, TableCell, SvgIcon } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";

import MopidyHandler from "MopidyHandler/MopidyHandler";
import { PlaybackStates, PlaybackCmds } from "MopidyHandler/PlaybackHandler";

const useStyles = makeStyles(theme => ({
    container: {
        maxHeight: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    iconcell: {
        width: '3em'
    }
}));

/**
 * Animated eq icon
 * @param {import("@material-ui/core").SvgIconProps} props 
 */
const AnimatedEq = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <line x1="3" x2="3" y1="24" y2="0" strokeWidth="6" stroke="black">
            <animate attributeName="y2" values="0;6;12;18;24;0" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="12" x2="12" y1="24" y2="0" strokeWidth="6" stroke="black">
            <animate attributeName="y2" values="18;24;0;6;12;18" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="21" x2="21" y1="24" y2="0" strokeWidth="6" stroke="black">
            <animate attributeName="y2" values="6;12;18;24;0;6" dur="1s" repeatCount="indefinite" />
        </line>
    </SvgIcon>
)

/**
 * 
 * @param {Object} props
 * @param {import('MopidyHandler/LibraryHandler').mpd_track} props.track
 * @param {import('MopidyHandler/PlaybackHandler').PlaybackStates} props.state
 */
function TracklistItem(props) {
    const classes = useStyles();

    // filter props
    const {to, track, state, ...tableRowProps} = props;
    
    // set styles when active
    const [seconds, setSeconds] = React.useState(Math.floor(track.length/1000));

    // set first cell content
    const [firstCell, setFirstCell] = React.useState(track.track_no);
    
    // React to track changes
    React.useEffect(() => {

        let interval = null;
        switch(state) {
            case PlaybackStates.PLAYING:
                setFirstCell(<AnimatedEq fontSize="inherit"/>);
                interval = setInterval(() => setSeconds(Math.floor(MopidyHandler.playback.timePosition/1000)), 1000);
            break;

            case PlaybackStates.PAUSED:
                setFirstCell(<AnimatedEq fontSize="inherit"/>);//TODO: Make icon for stopped playback
                setSeconds(Math.floor(MopidyHandler.playback.timePosition/1000));
            break;

            case PlaybackStates.STOPPED:
                setFirstCell(track.track_no);
                setSeconds(Math.floor(track.length/1000));
            break;

            default:
                console.warn(`Unknwon playback state: ${state}`);
        }

        // return clean up function
        return () => {
            if(interval) clearInterval(interval);
        };

    }, [state, track.length]);

    /**
     * @param {MouseEvent} event 
     */
    function handleClick(event) {
        event.stopPropagation();
        switch(state) {
            case PlaybackStates.PLAYING:
                MopidyHandler.playback.sendCmd(PlaybackCmds.PAUSE);
            break;

            case PlaybackStates.PAUSED:
                MopidyHandler.playback.sendCmd(PlaybackCmds.RESUME);
            break;
            
            case PlaybackStates.STOPPED:
                MopidyHandler.playAlbumTrack(track);
            break;
            
            default:
                console.warn(`Unknwon playback state: ${state}`);
        }
    }

    /**
     * @param {MouseEvent} event 
     */
    function showTrackNo(event) {
        setFirstCell(state === PlaybackStates.PLAYING ? <AnimatedEq fontSize="inherit"/> : track.track_no);
    }
    
    /**
     * @param {MouseEvent} event 
     */
    function showCtrlIcons(event) {
        setFirstCell(state === PlaybackStates.PLAYING ? <Pause fontSize="inherit"/> : <PlayArrow fontSize="inherit"/>);
    }


    return (
        <TableRow
            {...tableRowProps}
            selected={state !== PlaybackStates.STOPPED}
            onClick={handleClick}
            onMouseEnter={showCtrlIcons}
            onMouseLeave={showTrackNo}
        >
            <TableCell className={classes.iconcell} align="right">{firstCell}</TableCell>
            <TableCell align="left">{track.name}</TableCell>
            <TableCell align="right">{Math.floor(seconds/60)}:{`00${seconds%60}`.slice(-2)}</TableCell>
        </TableRow>
    );
}

/**
 * @param {Object} props
 * @param {import('MopidyHandler/LibraryHandler').mpd_track[]} props.tracks 
 */
function Tracklist(props) {
    const classes = useStyles();

    const [currentTrack, setCurrentTrack] = React.useState(MopidyHandler.playback.track);
    const [playbackState, setPlaybackState] = React.useState(MopidyHandler.playback.state);
    React.useEffect(() => {

        const onTrackInfoUpdate = () => setCurrentTrack(MopidyHandler.playback.track);
        MopidyHandler.playback.on("trackInfoUpdated", onTrackInfoUpdate);

        const onPlaybackStateChanged = () => setPlaybackState(MopidyHandler.playback.state);
        MopidyHandler.playback.on("playbackStateChanged", onPlaybackStateChanged);

        // return clean up method
        return () => {
            MopidyHandler.playback.removeListener("trackInfoUpdated", onTrackInfoUpdate);
            MopidyHandler.playback.removeListener("playbackStateChanged", onPlaybackStateChanged);
        }
        
    }, []); // prevents call on each render

    return (
        <TableContainer className={classes.container}>
            <Table size="small">
                <TableBody>{props.tracks.map((track,i) => (
                    <TracklistItem
                        key={i}
                        track={track}
                        state={currentTrack && track.uri === currentTrack.uri ? playbackState : PlaybackStates.STOPPED}
                    />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tracklist;