import React from "react";
import useIntersection from "Hooks/useIntersection";

export default React.memo(({observant, placeholder, children}) => {

    const root = document.getElementById("scroll-box");
    const rootMargin = `2000% 0px`
    
    const [isIntersecting, setObservant] = useIntersection({root: root, rootMargin: rootMargin, threshold: 1});

    React.useEffect(() => {
        setObservant(observant);
    }, [observant, setObservant])

    return isIntersecting ? children : placeholder;

}, (prevProps, nextProps) => {
    return  prevProps.observant === nextProps.observant;
});