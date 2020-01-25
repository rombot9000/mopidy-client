import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableRow, TableCell, TableContainer } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";

import MopidyHandler from "MopidyHandler/MopidyHandler";

const useStyles = makeStyles(theme => ({
    table: {
        height: '50vh',
        backgroundColor: theme.palette.background.paper,
    },
    iconcell: {
        width: '3em'
    }
}));

/**
 * 
 * @param {Object} props
 * @param {import('MopidyHandler/LibraryHandler').mpd_track} props.track
 * @param {bool} props.playing
 */
function TracklistItem(props) {
    const classes = useStyles();

    const [icon, setIcon] = React.useState(props.track.track_no);
    const seconds = Math.floor(props.track.length/1000);

    return (
        <TableRow
            onClick={(e) => {
                e.stopPropagation();
                MopidyHandler.playAlbumTrack(props.track);
            }}
            onMouseEnter={(e) => {
                setIcon(props.playing ? <Pause fontSize="inherit"/> : <PlayArrow fontSize="inherit"/>);
            }}
            onMouseLeave={(e) => {
                setIcon(props.track.track_no);
            }}
        >
            <TableCell className={classes.iconcell} align="right">{icon}</TableCell>
            <TableCell align="left">{props.track.name}</TableCell>
            <TableCell align="right">{Math.floor(seconds/60)}:{`00${seconds%60}`.slice(-2)}</TableCell>
        </TableRow>
    );
}

/**
 * @param {Object} props
 * @param {import('MopidyHandler/LibraryHandler').mpd_track[]} tracks 
 */
function Tracklist(props) {
    const classes = useStyles();

    const [currentTrack, setCurrentTrack] = React.useState(MopidyHandler.playback.track);
    React.useEffect(() => {

        function onTrackInfoUpdate() {
            setCurrentTrack(MopidyHandler.playback.track);
        }

        MopidyHandler.playback.on("trackInfoUpdated", onTrackInfoUpdate);

        return () => {
            MopidyHandler.playback.removeListener("trackInfoUpdated", onTrackInfoUpdate);
        }
        
    }, []); // prevents call on each render

    return (
        <TableContainer className={classes.table}>
            <Table size="small">
                <TableBody>{props.tracks.map((track,i) => (
                    <TracklistItem
                        key={i}
                        track={track}
                        playing={currentTrack ? track.uri === currentTrack.uri : false}
                    />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tracklist;