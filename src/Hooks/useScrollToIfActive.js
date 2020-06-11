import React from "react";

/**
 * @param {React.MutableRefObject} ref
 * @param {import("ViewModel/Track").Track} track
 */
export default (ref, playbackState) => {

    React.useEffect(() => {
        
        if(ref.current && playbackState !== "stopped") {
            if(ref.current.scrollIntoViewIfNeeded) ref.current.scrollIntoViewIfNeeded();
            else if(ref.current.scrollIntoView) ref.current.scrollIntoView();
        }
        
    }, [ref, playbackState]);

}

   