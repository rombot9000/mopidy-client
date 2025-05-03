/*
 * Copied from https://stackoverflow.com/questions/48048957/react-long-press-event 
 */

import React from "react";
import { isDesktop } from "react-device-detect";

const useLongPress = (
    onLongPress = (event) => {},
    onClick = (event) => {},
    { shouldPreventDefault = true, delay = 300 } = {}
) => {
    const [longPressTriggered, setLongPressTriggered] = React.useState(false);
    const [clickCanceled, setClickCanceled] = React.useState(false);
    const timeout = React.useRef();
    const target = React.useRef();

    const start = React.useCallback(event => {
        // keep track of new clicks
        setClickCanceled(false);
        //
        if (shouldPreventDefault && event.target) {
            event.target.addEventListener("touchend", preventDefault, {
                passive: false
            });
            target.current = event.target;
        }
        // Start timeout for longpress
        timeout.current = setTimeout(() => {
            onLongPress(event);
            setLongPressTriggered(true);
        }, delay);
    }, [onLongPress, delay, shouldPreventDefault]);

    const clear = React.useCallback((event, shouldTriggerClick = true) => {
        // Clear timeout
        if(timeout.current) clearTimeout(timeout.current);
        // check if cancel
        if(!shouldTriggerClick) setClickCanceled(true);
        // check if short press -> call onClick
        else if(!longPressTriggered && !clickCanceled) onClick(event);
        // set state
        setLongPressTriggered(false);
        // prevent default
        if (shouldPreventDefault && target.current) {
            target.current.removeEventListener("touchend", preventDefault);
        }
    },[shouldPreventDefault, onClick, longPressTriggered, clickCanceled]);

    // Do not use on desktop but pass on onClick prop!
    if(isDesktop) return {
        onClick: onClick
    };

    // return 
    return {
        // start long press timer
        onMouseDown: e => start(e),
        onTouchStart: e => start(e),
        // clear timer and trigger click if no long press
        onMouseUp: e => clear(e),
        onTouchEnd: e => clear(e),
        // Do not trigger click or long press event in these cases
        onMouseLeave: e => clear(e, false),
        onTouchCancel: e => clear(e, false),
        onTouchMove: e => clear(e, false),
    };
};

const isTouchEvent = event => {
    return "touches" in event;
};

const preventDefault = event => {
    if (!isTouchEvent(event)) return;

    if (event.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
    }
};

export default useLongPress;