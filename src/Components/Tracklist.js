import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { TableContainer, Table, TableBody, TableRow, TableCell, SvgIcon } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";

import MopidyHandler from "MopidyHandler/MopidyHandler";

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
 * @param {import('ViewModel/Track').Track} props.track
 * @param {import('MopidyHandler/PlaybackHandler').PlaybackState} props.state
 */
function TracklistItem(props) {
    const classes = useStyles();

    // filter props
    const {to, track, state, ...tableRowProps} = props;
    
    // set last cell content (duration or time position)
    const [seconds, setSeconds] = React.useState(Math.floor(track.length/1000));

    // set first cell content
    const [firstCell, setFirstCell] = React.useState(track.track_no);
    
    // React to track changes
    React.useEffect(() => {

        let interval = null;
        console.log(state);
        switch(state) {
            case "playing":
                setFirstCell(<AnimatedEq fontSize="inherit"/>);
                setSeconds(Math.floor(MopidyHandler.playback.timePosition/1000));
                interval = setInterval(() => setSeconds(Math.floor(MopidyHandler.playback.timePosition/1000)), 1000);
            break;

            case "paused":
                setFirstCell(<AnimatedEq fontSize="inherit"/>);//TODO: Make icon for stopped playback
                setSeconds(Math.floor(MopidyHandler.playback.timePosition/1000));
            break;

            case "stopped":
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

    }, [state, track.length, track.track_no]);

    /**
     * @param {MouseEvent} event 
     */
    function showTrackNo(event) {
        setFirstCell(state !== "stopped" ? <AnimatedEq fontSize="inherit"/> : track.track_no);
    }
    
    /**
     * @param {MouseEvent} event 
     */
    function showCtrlIcons(event) {
        setFirstCell(state === "playing" ? <Pause fontSize="inherit"/> : <PlayArrow fontSize="inherit"/>);
    }


    return (
        <TableRow
            {...tableRowProps}
            selected={state !== "stopped"}
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
 * @param {import('ViewModel/Track').Track[]} props.tracks 
 */
function Tracklist(props) {
    const classes = useStyles();

    const [currentTrack, setCurrentTrack] = React.useState(MopidyHandler.currentTrack);
    const [playbackState, setPlaybackState] = React.useState(MopidyHandler.playbackState);
    React.useEffect(() => {

        const handleTrackInfoUpdate = setCurrentTrack.bind(this);
        MopidyHandler.playback.on("trackInfoUpdated", handleTrackInfoUpdate);

        const handlePlaybackStateChanged = setPlaybackState.bind(this);
        MopidyHandler.playback.on("playbackStateChanged", handlePlaybackStateChanged);

        // return clean up method
        return () => {
            MopidyHandler.playback.removeListener("trackInfoUpdated", handleTrackInfoUpdate);
            MopidyHandler.playback.removeListener("playbackStateChanged", handlePlaybackStateChanged);
        }
        
    }, []); // prevents call on each render

    /**
     * @param {import('ViewModel/Track').Track} track 
     */
    function handleClick(track) {

        if(track._uri === currentTrack._uri) {
            MopidyHandler.togglePlayback();
        } else {
            MopidyHandler.playTracklist(props.tracks, track);
        }

    }

    return (
        <TableContainer className={classes.container}>
            <Table size="small">
                <TableBody>{props.tracks.map((track,i) => (
                    <TracklistItem
                        key={i}
                        track={track}
                        state={track._uri === currentTrack._uri ? playbackState : "stopped"}
                        onClick={(e) => handleClick(track)}
                    />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tracklist;