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
 * @param {bool} props.isCurrentTrack
 */
function TracklistItem(props) {
    const classes = useStyles();

    // filter props
    const {to, track, isCurrentTrack, ...tableRowProps} = props;
    
    // set styles when active
    const [seconds, setSeconds] = React.useState(Math.floor(track.length/1000));

    // set first cell content
    const [firstCell, setFirstCell] = React.useState(isCurrentTrack ? <AnimatedEq fontSize="inherit"/> : track.track_no);
    
    // React to track changes
    React.useEffect(() => {
        // eq icon
        setFirstCell(isCurrentTrack ? <AnimatedEq fontSize="inherit"/> : track.track_no);

        // track length or counter
        let interval = null;
        if(isCurrentTrack) {
            setSeconds(Math.floor(MopidyHandler.playback.timePosition/1000));
            interval = setInterval(() => setSeconds(Math.floor(MopidyHandler.playback.timePosition/1000)), 1000);
        } else {
            setSeconds(Math.floor(track.length/1000));
        }

        // return clean up function
        return () => {
            if(interval) {
                clearInterval(interval);
            }
        };
    }, [isCurrentTrack, track.length]);

    /**
     * @param {MouseEvent} event 
     */
    function handleClick(event) {
        event.stopPropagation();
        if(isCurrentTrack) {
            if(MopidyHandler.playback.state === PlaybackStates.PLAYING){
                MopidyHandler.playback.sendCmd(PlaybackCmds.PAUSE);
            } else {
                MopidyHandler.playback.sendCmd(PlaybackCmds.RESUME);
            }
        } else {
            MopidyHandler.playAlbumTrack(track);
        }
    }

    /**
     * @param {MouseEvent} event 
     */
    function showTrackNo(event) {
        setFirstCell(isCurrentTrack ? <AnimatedEq fontSize="inherit"/> : track.track_no);
    }
    
    /**
     * @param {MouseEvent} event 
     */
    function showIcon(event) {
        setFirstCell(isCurrentTrack ? <Pause fontSize="inherit"/> : <PlayArrow fontSize="inherit"/>);
    }


    return (
        <TableRow
            {...tableRowProps}
            selected={isCurrentTrack}
            onClick={handleClick}
            onMouseEnter={showIcon}
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
    React.useEffect(() => {

        function onTrackInfoUpdate() {
            setCurrentTrack(MopidyHandler.playback.track);
        }
        MopidyHandler.playback.on("trackInfoUpdated", onTrackInfoUpdate);

        // return clean up method
        return () => {
            MopidyHandler.playback.removeListener("trackInfoUpdated", onTrackInfoUpdate);
        }
        
    }, []); // prevents call on each render

    return (
        <TableContainer className={classes.container}>
            <Table size="small">
                <TableBody>{props.tracks.map((track,i) => (
                    <TracklistItem
                        key={i}
                        track={track}
                        isCurrentTrack={currentTrack ? track.uri === currentTrack.uri : false}
                    />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tracklist;