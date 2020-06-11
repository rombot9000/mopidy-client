import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { PlayArrowRounded, Pause } from "@material-ui/icons";

import CoverButton from "./CoverButton";

import useFormatedTime from "Hooks/useFormatedTime";

const useStyles = makeStyles({
    cover: {
        maxWidth: props => props.coverWidth
    },
    trackName: {
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

    const [hover, setHover] = React.useState(false);

    const timeString = useFormatedTime(track.length, playbackState, playbackTimePosition);

    const ref = React.useRef(null);
    const [coverWidth, setCoverWidth] = React.useState(0);
    React.useEffect(() => {
        if(ref.current) setCoverWidth(ref.current.offsetHeight);
    }, [ref]);

    const classes = useStyles({playbackState, coverWidth});

    return (
        <Grid
            container
            {...gridProps}
            direction="row"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            spacing={2}
            alignItems="center"
        >
            <Grid item xs className={classes.cover}>
               <CoverButton src={track.album.cover} showButton={hover}>
                    {playbackState === "playing" ? <Pause/> : <PlayArrowRounded/>}
                </CoverButton>
            </Grid>
            <Grid xs item ref={ref} zeroMinWidth>
                <Typography className={classes.trackName} variant="body1" align="left" noWrap>{track.name}</Typography>
                <Typography className={classes.text} variant="body1" align="left" noWrap>{track.artist.name}</Typography>
            </Grid>
            <Grid item xs={2} zeroMinWidth>
                <Typography className={classes.text} variant="body1" align="right" noWrap>{timeString}</Typography>
            </Grid>
        </Grid>
    );
}