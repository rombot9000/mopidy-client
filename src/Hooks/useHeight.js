import React from "react";

/**
 * @param {React.MutableRefObject} ref
 */
export default (ref) => {

    const [height, setHeight] = React.useState(0);
    React.useEffect(() => {
        if(ref.current) setHeight(ref.current.offsetHeight);

    }, [ref]);

    return height
};