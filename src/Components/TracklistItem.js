import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { PlayArrowRounded, Pause } from "@material-ui/icons";

import CoverButton from "./CoverButton";

import useFormatedTime from "Hooks/useFormatedTime";
import useHeight from "Hooks/useHeight";
import useScrollToIfActive from "Hooks/useScrollToIfActive";

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
 * @param {import("ViewModel/Track").TracklistItem} props.item
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {number} props.playbackTimePosition
 */
const TracklistItem = ({item, playbackState, playbackTimePosition, scrollToIfActive, dispatch, ...gridProps}) => {

    const [hover, setHover] = React.useState(false);

    const timeString = useFormatedTime(item.track.length, playbackState, playbackTimePosition);

    const ref = React.useRef(null);
    const coverWidth = useHeight(ref);
    useScrollToIfActive(ref, playbackState);

    const classes = useStyles({playbackState, coverWidth});

    return (
        <Grid
            container
            {...gridProps}
            direction="row"
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            spacing={2}
            alignItems="center"
        >
            <Grid item xs className={classes.cover}>
               <CoverButton src={item.track.album.cover} showButton={hover}>
                    {playbackState === "playing" ? <Pause/> : <PlayArrowRounded/>}
                </CoverButton>
            </Grid>
            <Grid xs item ref={ref} zeroMinWidth>
                <Typography className={classes.trackName} variant="body1" align="left" noWrap>{item.track.name}</Typography>
                <Typography className={classes.text} variant="body1" align="left" noWrap>{item.track.artist.name}</Typography>
            </Grid>
            <Grid item xs={2} zeroMinWidth>
                <Typography className={classes.text} variant="body1" align="right" noWrap>{timeString}</Typography>
            </Grid>
        </Grid>
    );
}

export default TracklistItem;