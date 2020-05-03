import React from "react";
import {  } from "react";
import useIntersection from "Hooks/useIntersection";

/**
 * 
 * @param {Object} objA 
 * @param {Object} objB 
 */
const valuesEqual = (objA, objB) => {
    if(objA === objB) return true;

    if( objA === null || objB === null || typeof objA !== "object" || typeof objB !== "object") return false;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if(keysA.length !== keysB.length) return false;

    for(let keyA of keysA) if(objA[keyA] !== objB[keysA]) return false;
    
    return true;
}

export default React.memo(({observant, placeholder, children}) => {

    const root = document.getElementById("scroll-box");
    const rootMargin = `2000% 0px`
    
    const [isIntersecting, setObservant] = useIntersection({root: root, rootMargin: rootMargin, threshold: 1});

    React.useEffect(() => {
        setObservant(observant);
    }, [observant, setObservant])

    return isIntersecting ? children : placeholder;

}, (prevProps, nextProps) => {
    return prevProps.observant === nextProps.observant &&
           prevProps.placeholder === nextProps.placeholder &&
           valuesEqual(prevProps.children, nextProps.children);
});