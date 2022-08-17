import React from "react";

import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import useFormatedTime from "Hooks/useFormatedTime";
//import useTrackIcon from "Hooks/useTrackIcon";

const useStyles = makeStyles(theme => ({
    container: {
        //backgroundColor: "white"
    },
    trackNo: {
        minWidth: theme.spacing(3),
        fontWeight: props => props.playbackState === "stopped" ? "lighter" : "normal",
    },
    name: {
        fontWeight: props => props.playbackState === "stopped" ? "normal" : "bolder"
    },
    duration: {
        minWidth: theme.spacing(5),
        fontWeight: props => props.playbackState === "stopped" ? "lighter" : "normal"
    },
    cover: {
        maxWidth: props => props.coverWidth
    },
    trackName: {
        fontWeight: props => props.playbackState === "stopped" ? "normal" : "bolder"
    },
    text: {
        fontWeight: props => props.playbackState === "stopped" ? "lighter" : "normal"
    }
}));

/**
 * 
 * @param {Object} props
 * @param {import("Reducers/LibraryReducer").StoredTrack} props.track
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {number} props.playbackTimePosition
 */
const TrackViewItem = ({track, playbackState, playbackTimePosition, dispatch, ...gridProps}) => {

    const classes = useStyles({playbackState});

    //const [trackIcon, setHover] = useTrackIcon(track.track_no, playbackState);
    const timeString = useFormatedTime(track.length, playbackState, playbackTimePosition);

    return (
        // <Grid
        //     container
        //     className={classes.container}
        //     {...gridProps}
        //     direction="row"
        //     onMouseEnter={() => setHover(true)}
        //     onMouseLeave={() => setHover(false)}
        //     spacing={1}
        // >
        //     <Grid item zeroMinWidth>
        //         <Typography className={classes.trackNo} noWrap variant="body1" align="center">{trackIcon}</Typography>
        //     </Grid>
        //     <Grid item xs zeroMinWidth>
        //         <Typography className={classes.name} noWrap variant="body1" align="left">{track.name}</Typography>
        //     </Grid>
        //     <Grid item xs={3} zeroMinWidth>
        //         <Typography className={classes.name} noWrap variant="body1" align="left">{track.artistName}</Typography>
        //     </Grid>
        //     <Grid item xs={3} zeroMinWidth>
        //         <Typography className={classes.name} noWrap variant="body1" align="left">{track.album.name}</Typography>
        //     </Grid>
        //     <Grid item zeroMinWidth>
        //         <Typography className={classes.duration} noWrap variant="body1" align="right">{timeString}</Typography>
        //     </Grid>
        // </Grid>
        <Grid
        container
        {...gridProps}
        direction="row"
        // onMouseEnter={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
        spacing={2}
        alignItems="center"
    >
        <Grid xs item zeroMinWidth>
            <Typography className={classes.trackName} variant="body1" align="left" noWrap>{track.name}</Typography>
            <Typography className={classes.text} variant="body1" align="left" noWrap>{track.artistName}</Typography>
        </Grid>
        <Grid item xs={2} zeroMinWidth>
            <Typography className={classes.text} variant="body1" align="right" noWrap>{timeString}</Typography>
        </Grid>
    </Grid>
    );
}

export default TrackViewItem;