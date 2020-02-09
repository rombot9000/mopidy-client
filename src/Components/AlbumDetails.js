import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Card, CardContent, CardMedia } from "@material-ui/core";

import Tracklist from "./Tracklist";

const useStyles = makeStyles(theme => ({
    card: {
        display: "flex",
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        outline: 0,
        maxHeight: "80%",
        maxWidth: "80%",
        height: 500
    },
    cover: {
        width: 500,
        objectFit: "cover"
    },
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
}));

/**
 * 
 * @param {Object} props
 * @param {import('Model/Album').Album} props.album 
 */
const AlbumDetails = React.forwardRef( (props, ref) => {
    const {to, album, ...filteredProps} = props;

    const classes = useStyles();

    return (
        <Card ref={ref} {...filteredProps} className={classes.card}>
            <CardMedia className={classes.cover} image={album.cover}/>
            <CardContent className={classes.content}>
                    <Typography variant="h5">{album.name}</Typography>
                    <Typography variant="h6">{album.artist}</Typography>
                    <Typography variant="overline">{album.year}</Typography>
                    <Tracklist tracks={album.tracks}/>
            </CardContent>
        </Card>
    );
});

export default AlbumDetails;