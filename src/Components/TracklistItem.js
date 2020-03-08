import React from "react";

import { SvgIcon, Grid, Typography } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";

import { PlaybackStore } from "Stores";

/**
 * Animated eq icon
 * @param {import("@material-ui/core").SvgIconProps} props 
 */
const AnimatedEq = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <line x1="3" x2="3" y1="24" y2="0" strokeWidth="6" stroke="black">
            <animate attributeName="y2" values="0;6;12;18;24;0" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="12" x2="12" y1="24" y2="0" strokeWidth="6" stroke="black">
            <animate attributeName="y2" values="18;24;0;6;12;18" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="21" x2="21" y1="24" y2="0" strokeWidth="6" stroke="black">
            <animate attributeName="y2" values="6;12;18;24;0;6" dur="1s" repeatCount="indefinite" />
        </line>
    </SvgIcon>
)

/**
 * 
 * @param {Object} props
 * @param {import("ViewModel/Track").Track} props.track
 * @param {import("Stores/PlaybackStore").PlaybackState} props.playbackState
 */
function TracklistItem(props) {

    const {track, playbackState, ...gridProps} = props;

    // set last cell content (duration or time position)
    const [seconds, setSeconds] = React.useState(Math.floor(props.track.length/1000));

    // set first cell content
    const [firstCell, setFirstCell] = React.useState(props.track.track_no);
    
    // React to track changes
    React.useEffect(() => {

        let interval = null;
        switch(props.playbackState) {
            case "playing":
                setFirstCell(<AnimatedEq fontSize="inherit"/>);
                setSeconds(Math.floor(PlaybackStore.timePosition/1000));
                interval = setInterval(() => setSeconds(Math.floor(PlaybackStore.timePosition/1000)), 1000);
            break;

            case "paused":
                setFirstCell(<AnimatedEq fontSize="inherit"/>);//TODO: Make icon for stopped playback
                setSeconds(Math.floor(PlaybackStore.timePosition/1000));
            break;

            case "stopped":
                setFirstCell(props.track.track_no);
                setSeconds(Math.floor(props.track.length/1000));
            break;

            default:
                console.warn(`Unknwon playback playbackState: ${props.playbackState}`);
        }

        // return clean up function
        return () => {
            if(interval) clearInterval(interval);
        };

    }, [props.playbackState, props.track.length, props.track.track_no]);

    function showTrackNo() {
        setFirstCell(props.playbackState !== "stopped" ? <AnimatedEq fontSize="inherit"/> : props.track.track_no);
    }
    
    function showCtrlIcons() {
        setFirstCell(props.playbackState === "playing" ? <Pause fontSize="inherit"/> : <PlayArrow fontSize="inherit"/>);
    }

    console.log("Render:", props.track.track_no);
    return (
        <Grid
            container
            {...gridProps}
            direction="row"
            onMouseEnter={showCtrlIcons}
            onMouseLeave={showTrackNo}
            spacing={2}
        >
            <Grid item xs={1}>
                <Typography align="right">{firstCell}</Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography align="left">{props.track.name}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography align="right">{Math.floor(seconds/60)}:{`00${seconds%60}`.slice(-2)}</Typography>
            </Grid>
        </Grid>
    );
}

/**
 * 
 * @param {Object} prevProps 
 * @param {Object} nextProps 
 * @returns {boolean} True if component should NOT rerender, false otherwise
 */
function propsAreEqual(prevProps, nextProps) {
    console.log("propsAreEqual:", prevProps.playbackState === nextProps.playbackState && prevProps.track._uri === nextProps.track._uri);
    return prevProps.playbackState === nextProps.playbackState && prevProps.track._uri === nextProps.track._uri;
};

export default React.memo(TracklistItem, propsAreEqual);