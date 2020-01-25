import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { Table, TableBody, TableRow, TableCell, TableContainer } from "@material-ui/core";
import { Card, CardContent, CardMedia} from "@material-ui/core";
import { PlayArrowRounded } from "@material-ui/icons";

import MopidyHandler from "MopidyHandler/MopidyHandler";

const useStyles = makeStyles(theme => ({
    table: {
        height: '50vh',
        backgroundColor: theme.palette.background.paper,
    },
    iconcell: {
        width: '3em'
    },
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    cover: {
        width: '60vh',
        height: '80vh',
        objectFit: 'cover'
    },
    content: {
    },
}));

/**
 * 
 * @param {Object} props 
 * @param {import('MopidyHandler/LibraryHandler').mpd_track} props.track 
 */
function TrackListItem(props) {
    const classes = useStyles();

    const [icon, setIcon] = React.useState(props.track.track_no);
    const seconds = Math.floor(props.track.length/1000);
    return (
        <TableRow
            onClick={(e) => {
                e.stopPropagation();
                MopidyHandler.playTrack(props.track)
            }}
            onMouseEnter={(e) => {
                setIcon(<PlayArrowRounded fontSize="inherit"/>);
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
 * 
 * @param {Object} props
 * @param {string} props.uri 
 */
function AlbumDetails(props) {

    const classes = useStyles();

    const artwork_src = MopidyHandler.album_uri_to_artwork_uri[props.uri];
    const tracks = MopidyHandler.album_uri_to_tracks[props.uri];

    console.debug("Rendering Album detail...")
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.cover} image={artwork_src}/>
            <CardContent className={classes.content}>
                <Typography variant="h5">{tracks[0].album.name}</Typography>
                <Typography variant="h6">{tracks[0].artists[0].name}</Typography>
                <Typography variant="overline">{tracks[0].date.slice(0,4)}</Typography>
                <TableContainer className={classes.table}>
                    <Table size="small">
                        <TableBody>{tracks.map((track,i) => (
                            <TrackListItem key={i} track={track}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}

export default AlbumDetails;