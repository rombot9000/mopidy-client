import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import { Card, Grid} from "@material-ui/core";

import Tracklist from "./Tracklist";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    gridContainer: {
        spacing: 0
    },
    cover: {
        width: "100%",
        objectFit: "cover"
    },
    content: {
        display: "flex",
        flexDirection: "column"
    },
}));

/**
 * 
 * @param {Object} props
 * @param {import("ViewModel/Album").Album} props.album 
 */
const AlbumDetails = React.forwardRef( (props, ref) => {
    const {to, album, ...filteredProps} = props;

    const classes = useStyles();

    return (
        <Card ref={ref} {...filteredProps} className={classes.root}>
            <Grid container className={classes.gridContainer}>
                <Grid item sm={12} md={6}>
                    <Container className={classes.cover}  disableGutters={true}>
                        <img src={album.cover}/>
                    </Container>
                </Grid>
                <Grid item sm={12} md={6} className={classes.content}>
                    <Typography variant="h5">{album.name}</Typography>
                    <Typography variant="h6">{album.artist}</Typography>
                    <Typography variant="overline">{album.year}</Typography>
                    <Tracklist tracks={album.tracks}/>
                </Grid>
            </Grid>
        </Card>
    );
});

export default AlbumDetails;