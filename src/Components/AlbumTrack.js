import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

import AnimatedEq from "./AnimatedEq";

import useFormatedTime from "Hooks/useFormatedTime";

const useStyles = makeStyles({
    text: {
        fontWeight: props => props.playbackState === "stopped" ? "normal" : 500
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

    const firstCellReducer = (firstCell, action) => {
        switch(action) {
            case "CTRL": return playbackState === "playing" ? <Pause fontSize="inherit"/> : <PlayArrow fontSize="inherit"/>;
            case "INFO": return playbackState === "stopped" ?  track.track_no : <AnimatedEq fontSize="inherit"/>;
            default: return firstCell;
        }
    };
    const [firstCell, setFirstCell] = React.useReducer(
        firstCellReducer,
        playbackState === "stopped" ?  track.track_no : <AnimatedEq fontSize="inherit"/>
    );

    const timeString = useFormatedTime(track.length, playbackState, playbackTimePosition);

    return (
        <Grid
            container
            {...gridProps}
            direction="row"
            onMouseEnter={() => setFirstCell("CTRL")}
            onMouseLeave={() => setFirstCell("INFO")}
            spacing={2}
        >
            <Grid item xs={1}>
                <Typography className={classes.text} variant="body1" align="right">{firstCell}</Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography className={classes.text} variant="body1" align="left">{track.name}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography className={classes.text} variant="body1" align="right">{timeString}</Typography>
            </Grid>
        </Grid>
    );
}