import React from "react";

import { useTheme, makeStyles } from "@material-ui/core";

//import { PlaybackActions } from "Actions";
import { PlaybackStore } from "Stores";
import { PlaybackActions } from "Actions";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    }
}));


export default function TimePositionBar() {
    const classes = useStyles();

    /** @type {React.Ref<SVGAnimateElement>} */
    const animationRef = React.useRef(null);

    // State object for animation
    const [animation, setAnimation] = React.useState({
        start: 0,
        end: 0,
        duration: 0
    });

    // Listen for events: playback and window focus/blur
    React.useEffect(() => {
        const updateAnimationState = () => {
            animationRef.current.endElement();
            const trackPercentage = PlaybackStore.track.length ? 100*PlaybackStore.timePosition/PlaybackStore.track.length : 0;
            setAnimation({
                start: trackPercentage,
                end: 100,
                duration: PlaybackStore.track.length - PlaybackStore.timePosition
            });
        }
        PlaybackStore.on("update", updateAnimationState);


        // Keep svg active when window in background
        let backgroundUpdateInterval;
        const handleBlur = () => {
            backgroundUpdateInterval = setInterval(updateAnimationState, 2000);
        };
        window.addEventListener('blur', handleBlur);

        // clear interval and update state once
        const handleFocus = () => {
            clearInterval(backgroundUpdateInterval);
            updateAnimationState();
        };
        window.addEventListener('focus', handleFocus);

        // return clean up function
        return () => {
            PlaybackStore.removeListener("update", updateAnimationState);
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
        };

    }, []);

    React.useEffect(() => {
        // Timeout needed if renedering to slow...
        setTimeout(() =>{
            if(PlaybackStore.state === "playing") {
                animationRef.current.beginElement();
            }
            else {
                animationRef.current.endElement();
            }
        },500);
    }, [animation]);

    /**
     * 
     * @param {MouseEvent} event 
     */
    function handleClick(event) {
        const relativePosition = (event.clientX - event.currentTarget.offsetLeft) / event.currentTarget.offsetWidth;
        const timePosition = Math.floor(PlaybackStore.track.length * relativePosition);
        PlaybackActions.seek(timePosition);
    };

    const theme = useTheme();
    const fillColor = theme.palette["secondary"].main;
    const backgroundColor = theme.palette["grey"][200];

    return (
        <div onClick={handleClick} className={classes.root}>
            <svg width="100%" height="100%" style={{display: "block"}}>
                <rect x="0" y="0" width="100%" height="100%" fill={backgroundColor}/>
                <rect x="0" y="0" width={`${animation.start}%`} height="100%" fill={fillColor}>
                    <animate
                        ref = {animationRef}
                        attributeName="width"
                        values={`${animation.start}%;${animation.end}%`}
                        dur={`${animation.duration}ms`}
                        repeatCount="0"
                        begin="indefinite"
                    />
                </rect>
            </svg>
        </div>
    );
}