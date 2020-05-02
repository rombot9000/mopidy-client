import React from "react";

export default ({root=null, rootMargin="0px", threshold=0}) => {

    const [isIntersecting, setIntersecting] = React.useState(false);
    const [observant, setObservant] = React.useState(null);
    
    const observerRef = React.useRef(null);
    React.useEffect(() => {

        if(observerRef.current) observerRef.current.disconnect();
        
        let timeout = null;
        let wasIntersecting = false
        observerRef.current = new window.IntersectionObserver(
            ([entry]) => {

                clearTimeout(timeout);
                if(wasIntersecting === entry.isIntersecting) return;

                timeout = setTimeout((isIntersecting) => {

                    wasIntersecting = isIntersecting;
                    setIntersecting(isIntersecting);

                }, entry.isIntersecting ? 200 : 2000, entry.isIntersecting)
                
            },
            {
                root: root,
                rootMargin: rootMargin,
                threshold: threshold
            }
        );
        
        const currentObserver = observerRef.current;
        
        if(observant) currentObserver.observe(observant);
        
        return () => currentObserver.disconnect();

    }, [observant, root, rootMargin, threshold]);

    return [isIntersecting, setObservant];
};