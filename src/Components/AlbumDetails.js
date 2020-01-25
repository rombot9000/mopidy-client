import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { Card, CardContent, CardMedia} from "@material-ui/core";

import Tracklist from "./Tracklist";

import MopidyHandler from "MopidyHandler/MopidyHandler";

const useStyles = makeStyles(theme => ({
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
                <Tracklist tracks={tracks}/>
            </CardContent>
        </Card>
    );
}

export default AlbumDetails;