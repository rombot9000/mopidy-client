import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Card, Grid} from "@material-ui/core";

import Tracklist from "./Tracklist";
import SquareImage from "./SquareImage";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    container: {
        spacing: 0
    },
    item: {
        width: "100%"
    },
    cover: {
        width: "100%",
        objectFit: "cover",
    },
    content: {
        width:"100%",
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2),
    },
}));

/**
 * 
 * @param {Object} props
 * @param {import("ViewModel/Album").Album} props.album 
 */
function AlbumDetails(props){

    const {to, album, ...filteredProps} = props;
    const classes = useStyles();

    return (
        <Card {...filteredProps} className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item xs={12} sm={6} className={classes.item}>
                    <SquareImage src={album.cover} elevation={0} square={true}/>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.content}>
                    <Typography variant="h5">{album.name}</Typography>
                    <Typography variant="h6">{album.artist}</Typography>
                    <Typography variant="overline">{album.year}</Typography>
                    <Tracklist tracks={album.tracks}/>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AlbumDetails;