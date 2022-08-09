import React from "react";

import { v4 as uuidv4 } from 'uuid';

import { Grid } from "@mui/material";
import { Skeleton } from "@mui/lab";

import Placeholder from "./Placeholder";

const skeleton = ( 
    <React.Fragment>
        <Skeleton animation={false} variant="rect"/>
        <Skeleton animation={false} variant="text" />
        <Skeleton animation={false} variant="text" />
    </React.Fragment>
);

/**
 * Use separate function becaus of refs
 */
const GridItem = ({children, ...placeholderProps}) => {
    const ref=React.useRef(null)
    return (
        <Grid ref={ref} item xl={1} lg={2} md={3} sm={4} xs={6}>
            <Placeholder observeRef={ref} {...placeholderProps}>
                {children}
            </Placeholder>
        </Grid>
    )
}


/**
 * @function ResponsiveGrid
 * @param {Object} props
 * @param {Object} props.placeholder
 */
const ResponsiveGrid = ({children, placeholder=skeleton, ...gridProps}) => {
    // calc classes
    const rootId = uuidv4();
    
    return (
        <Grid container id={rootId} {...gridProps}>
            {React.Children.map(children, child =>
                <GridItem 
                    placeholder={placeholder} 
                    rootId={rootId} 
                    rootMargin="1000% 0%" 
                    threshold={1}
                >
                    {child}
                </GridItem>
            )}
        </Grid>
    );
};

export default ResponsiveGrid;