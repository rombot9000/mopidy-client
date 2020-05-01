import React from "react";

import { SvgIcon, Grid, Typography } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";

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
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.playbackState
 * @param {number} props.playbackTimePosition
 */
export default ({track, playbackState, playbackTimePosition, ...gridProps}) => {

    const firstCellReducer = (firstCell, action) => {
        switch(action) {
            case "TRACK_NO": return track.track_no;
            case "EQ": return <AnimatedEq fontSize="inherit"/>;
            case "PLAY": return <PlayArrow fontSize="inherit"/>;
            case "PAUSE": return <Pause fontSize="inherit"/>;
            case "CTRL": return playbackState === "playing" ? <Pause fontSize="inherit"/> : <PlayArrow fontSize="inherit"/>;
            case "INFO": return playbackState === "playing" ? <AnimatedEq fontSize="inherit"/> : track.track_no;
            default: return firstCell;
        }
    };
    const [firstCell, setFirstCell] = React.useReducer(firstCellReducer, track.track_no);

    const secondsReducer = (seconds, action) => {
        switch(action.type){
            case "SET_MS": return Math.floor(action.value/1000);
            case "INCREMENT": return seconds + 1; 
        }
    };
    const [seconds, setSeconds] = React.useReducer(secondsReducer, {type: "SET_MS", value: track.length});

    // set last cell content (duration or time position)
    React.useEffect(() => {
        
        let interval = null;
        switch(playbackState) {
            case "playing":
                setFirstCell("EQ");
                setSeconds({type: "SET_MS", value: playbackTimePosition});
                interval = setInterval(() => setSeconds({type: "INCREMENT"}), 1000);
            break;
    
            case "paused":
                setFirstCell("PAUSE");
                setSeconds({type: "SET_MS", value: playbackTimePosition});
            break;
    
            case "stopped":
                setFirstCell("TRACK_NO");
                setSeconds({type: "SET_MS", value: track.length});
            break;
    
            default:
                console.warn(`Unknwon playback playbackState: ${playbackState}`);
        }

        //cleanup
        return () => clearInterval(interval);

    }, [playbackState, playbackTimePosition, track.length]);

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
                <Typography variant="body2" align="right">{firstCell}</Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body2" align="left">{track.name}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body2" align="right">{Math.floor(seconds/60)}:{`00${seconds%60}`.slice(-2)}</Typography>
            </Grid>
        </Grid>
    );
}