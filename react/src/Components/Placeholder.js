import React from "react";
import useIntersection from "Hooks/useIntersection";

/**
 * @param {Object} props
 * @param {Element}[options.root]
 * @param {string} [options.rootId]
 * @param {string} [options.rootMargin]
 * @param {number} [options.threshold]
 */
const Placeholder =  ({observeRef, placeholder, children, root, rootId, rootMargin, threshold}) => {
    
    const [isIntersecting, setObservant] = useIntersection({
        root: root,
        rootId: rootId,
        rootMargin: rootMargin,
        threshold: threshold
    });

    React.useEffect(() => {
        setObservant(observeRef.current);
    }, [observeRef, setObservant])

    return isIntersecting ? children : placeholder;

};

export default Placeholder;