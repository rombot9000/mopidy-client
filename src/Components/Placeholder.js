import React from "react";
import useIntersection from "Hooks/useIntersection";

export default ({observeRef, placeholder, children}) => {
    
    const [isIntersecting, setObservant] = useIntersection({rootId: "scroll-box", rootMargin: "1000% 0%", threshold: 1});

    React.useEffect(() => {
        setObservant(observeRef.current);
    }, [observeRef, setObservant])

    return isIntersecting ? children : placeholder;

};