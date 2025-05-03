import React from "react";

const mapOptionsToObserver = {};
/**
 * 
 * @param {Object} options
 * @param {Element}[options.root]
 * @param {string} [options.rootId]
 * @param {string} [options.rootMargin]
 * @param {number} [options.threshold]
 */
const getObserver = ({root = null, rootId = null, rootMargin = "0px", threshold = 0}) => {

    if(!root && typeof rootId === 'string' ) root = document.getElementById(rootId);
    if(!rootId && root) rootId = root.id;

    const optionsKey = `${rootId}_${rootMargin}_${threshold}`;

    if(!mapOptionsToObserver[optionsKey]) mapOptionsToObserver[optionsKey] = new window.IntersectionObserver(
        entries => entries.forEach(entry => {
            if(entry.target && typeof entry.target.__$$IntersectionObserverCallback === 'function') {
                entry.target.__$$IntersectionObserverCallback(entry);
            }
        }),
        {
            root: root,
            rootMargin: rootMargin,
            threshold: threshold
        }
    );

    return mapOptionsToObserver[optionsKey];
}

/**
 * 
 * @param {Element} element 
 * @param {Function} callback
 * @param {IntersectionObserverEntry} callback.entry
 */
const setObserverCallback = (element, callback) => {
    if(element) element.__$$IntersectionObserverCallback = callback;
};

/**
 * @param {Object} options
 * @param {Element}[options.root]
 * @param {string} [options.rootId]
 * @param {string} [options.rootMargin]
 * @param {number} [options.threshold]
 */
const useIntersection = (options) => {

    const [isIntersecting, setIntersecting] = React.useState(false);
    const [observant, setObservant] = React.useState(null);
    
    React.useEffect(() => {

        let timeout = null;
        let wasIntersecting = false
        const observerCallback = (entry) => {
            clearTimeout(timeout);
            if(wasIntersecting === entry.isIntersecting) {
                return;
            }
            
            timeout = setTimeout((isIntersecting) => {
                wasIntersecting = isIntersecting;
                setIntersecting(isIntersecting);

            }, entry.isIntersecting ? 100 : 10000, entry.isIntersecting);
        };
        
        const observer = getObserver(options);
        if(observant) { 
            setObserverCallback(observant, observerCallback);
            observer.observe(observant);
        }
        
        return () => {
            if(timeout) clearTimeout(timeout);
            if(observant) observer.unobserve(observant);
        }

    }, [observant, options]);

    return [isIntersecting, setObservant];
};

export default useIntersection;