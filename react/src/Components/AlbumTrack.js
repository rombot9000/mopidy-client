import React from "react";

import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import useFormatedTime from "Hooks/useFormatedTime";
import useTrackIcon from "Hooks/useTrackIcon";
import clsx from "clsx";

const useStyles = makeStyles({
    name: {
        fontWeight: props => props.playbackState === "stopped" ? "normal" : "bolder",
    },
    text: {
        fontWeight: props => props.playbackState === "stopped" ? "lighter" : "normal",
    },
    breakWords: {
        overflowWrap: "break-word",
        wordWrap: "break-word",
        "-webkitHyphens": "auto",
        "-msHyphens": "auto",
        "-mozHyphens": "auto",
        hyphens: "auto",
    }
});

/**
 * 
 * @param {Object} props
 * @param {import("Reducers/LibraryReducer").StoredTrack} props.track
 * @param {boolean} props.showArtist
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {number} props.playbackTimePosition
 */
const AlbumTrack = ({track, showArtist, playbackState, playbackTimePosition, dispatch, ...gridProps}) => {

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
                <Typography className={clsx(classes.text, classes.breakWords)} variant="body1" align="center">{trackIcon}</Typography>
            </Grid>
            <Grid item xs zeroMinWidth>
                <Typography className={clsx(classes.name, classes.breakWords)} variant="body1" align="left">{track.name}</Typography>
                {showArtist ? <Typography className={clsx(classes.text, classes.breakWords)} variant="body1" align="left">{track.artistName}</Typography> : null }
            </Grid>
            <Grid item xs={2}>
                <Typography className={clsx(classes.text, classes.breakWords)} variant="body1" align="right">{timeString}</Typography>
            </Grid>
        </Grid>
    );
}

export default AlbumTrack;