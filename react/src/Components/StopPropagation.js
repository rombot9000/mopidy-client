import React from "react";

const StopPropagation = ({children}) => {
    
    const stopPropagation = (e) => {e.stopPropagation()};
    
    return (
        <div
            onClick={stopPropagation}
            onMouseDown={stopPropagation}
            onMouseUp={stopPropagation}
            onTouchStart={stopPropagation}
            onTouchEnd={stopPropagation}
            children={children}
        />
    )
};

export default StopPropagation;
