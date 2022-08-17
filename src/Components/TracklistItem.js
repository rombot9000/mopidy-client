import React from "react";

import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PlayArrowRounded, Pause, Clear } from "@mui/icons-material";

import CoverButton from "./CoverButton";

import useFormatedTime from "Hooks/useFormatedTime";
import useHeight from "Hooks/useHeight";
import useScrollToIfActive from "Hooks/useScrollToIfActive";
import StopPropagation from "./StopPropagation";

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
 * @typedef TracklistItemProps
 * @property {import("Reducers/TracklistReducer").TracklistItem} props.item
 * @property {string} props.albumCover 
 * @property {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @property {number} props.playbackTimePosition
 * @property {Function} props.onTrackClick
 * @property {Function} props.onRemoveClick
 * @property {Function} props.dispatch Filter out reducx dispatch property from grid props
 */

/**
 * 
 * @param {TracklistItemProps} props 
 * @returns 
 */
const TracklistItem = ({item, albumCover, playbackState, playbackTimePosition, onTrackClick, onRemoveClick, scrollToIfActive, dispatch, ...gridProps}) => {

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
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            spacing={2}
            alignItems="center"
            justify="space-between"
            onClick={onTrackClick}
        >
            <Grid item xs className={classes.cover}>
               <CoverButton
                src={albumCover}
                showButton={hover}
                >
                    {playbackState === "playing" ? <Pause/> : <PlayArrowRounded/>}
                </CoverButton>
            </Grid>
            <Grid xs item ref={ref} zeroMinWidth>
                <Typography className={classes.trackName} variant="body1" align="left" noWrap>{item.track.name}</Typography>
                <Typography className={classes.text} variant="body1" align="left" noWrap>{item.track.artistName}</Typography>
            </Grid>
            <Grid item>
                
            </Grid>
            <Grid item xs="auto" zeroMinWidth>{hover ? 
                <StopPropagation>
                    <IconButton onClick={onRemoveClick} size="small">
                        <Clear/>
                    </IconButton>
                </StopPropagation>
                :
                <Typography className={classes.text} variant="body1" align="right" noWrap>{timeString}</Typography>}
            </Grid>
        </Grid>
    );
}

export default TracklistItem;