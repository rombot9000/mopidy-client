import React from "react";

import { useTheme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    }
}));

/** 
 * @callback OnPositonClick
 * @param {number} position clicked timeposition in ms
 */

/**
 * @param {Object} props
 * @param {number} props.position time position in ms
 * @param {number} props.length total length in ms
 * @param {import("Reducers/PlaybackReducer").MopdiyPlaybackState} props.state
 * @param {OnPositonClick} props.onPositionClick
 */
export default ({state, position, length,  onPositionClick}) => {
    const classes = useStyles();

    /** @type {React.Ref<SVGAnimateElement>} */
    const animationRef = React.useRef(null);
    // start/stop animation
    const updateAnimation = () => {
        if(!animationRef.current) {
            setTimeout(updateAnimation, 200);
        }
        else if(state === "playing") {
            console.log("state playing");
            animationRef.current.beginElement();
        }
        else {
            console.log("state paused");
            animationRef.current.endElement();
        }
    };
    
    updateAnimation();

    /**
     * 
     * @param {MouseEvent} event 
     */
    function handleClick(event) {
        const relPos = (event.clientX - event.currentTarget.offsetLeft) / event.currentTarget.offsetWidth;
        onPositionClick(Math.floor(length * relPos));
    };

    const theme = useTheme();
    const fillColor = theme.palette["secondary"].main;
    const backgroundColor = theme.palette["grey"][200];

    const start =  length ? 100*position/length : 0;
    const duration = length - position;
    const end = 100;

    console.log(start, duration, state);

    return (
        <div onClick={handleClick} className={classes.root}>
            <svg width="100%" height="100%" style={{display: "block"}}>
                <rect x="0" y="0" width="100%" height="100%" fill={backgroundColor}/>
                <rect x="0" y="0" width={`${start}%`} height="100%" fill={fillColor}>
                    <animate
                        ref = {animationRef}
                        attributeName="width"
                        values={`${start}%;${end}%`}
                        dur={`${duration}ms`}
                        repeatCount="0"
                        begin="indefinite"
                    />
                </rect>
            </svg>
        </div>
    );
}