import React from "react";

import { Grid, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { PlayArrowRounded, PauseRounded } from "@material-ui/icons";

import CoverButton from "./CoverButton";

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

    const [highlighted, setHighlighted] = React.useState(false);

    const classes = useStyles({playbackState});

    const timeString = useFormatedTime(track.length, playbackState, playbackTimePosition);

    return (
        <Grid
            container
            {...gridProps}
            direction="row"
            onMouseEnter={() => setHighlighted(true)}
            onMouseLeave={() => setHighlighted(false)}
            spacing={2}
            alignItems="center"
        >
            <Grid item xs={2}>
               <CoverButton src={track.album.cover} showButton={highlighted}>
                    {playbackState === "playing" ? <PauseRounded/> : <PlayArrowRounded/>}
                </CoverButton>
            </Grid>
            <Grid item xs={8}>
                <Typography className={classes.text} variant="body1" align="left" noWrap>{track.name}</Typography>
                <Typography className={classes.text} variant="body1" align="left" noWrap>{track.artist.name}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography className={classes.text} variant="body1" align="right">{timeString}</Typography>
            </Grid>
        </Grid>
    );
}