import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import useFormatedTime from "Hooks/useFormatedTime";
import useTrackIcon from "Hooks/useTrackIcon";

const useStyles = makeStyles({
    name: {
        fontWeight: props => props.playbackState === "stopped" ? "normal" : "bolder"
    },
    text: {
        fontWeight: props => props.playbackState === "stopped" ? "lighter" : "normal"
    }
});

/**
 * 
 * @param {Object} props
 * @param {import("ViewModel/Track").Track} props.track
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {number} props.playbackTimePosition
 */
export default ({track, playbackState, playbackTimePosition, dispatch, ...gridProps}) => {

    const classes = useStyles({playbackState});

    const [trackIcon, setHover] = useTrackIcon(track.track_no, playbackState);
    const timeString = useFormatedTime(track.length, playbackState, playbackTimePosition);

    return (
        <Grid
            container
            {...gridProps}
            direction="row"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            spacing={1}
        >
            <Grid item xs={1}>
                <Typography className={classes.text} variant="body1" align="center">{trackIcon}</Typography>
            </Grid>
            <Grid item xs>
                <Typography className={classes.name} variant="body1" align="left">{track.name}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography className={classes.text} variant="body1" align="right">{timeString}</Typography>
            </Grid>
        </Grid>
    );
}