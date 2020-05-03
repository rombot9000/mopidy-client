import React from "react";

import { makeStyles, Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab";

import Placeholder from "./Placeholder";


const GRID_SPACING = 1

const useStyles = makeStyles(theme => ({
    gridList: {
        paddingTop: theme.spacing(GRID_SPACING),
        paddingLeft: theme.spacing(GRID_SPACING),
        width: "100%",
        height: "100%",
    },
    square: {
        paddingTop: "100%"
    }
}));

const skeleton = ( 
    <React.Fragment>
        <Skeleton variant="rect"/>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
    </React.Fragment>
);

const GridItem = ({children, placeholder}) => {
    const ref=React.useRef(null)
    return (
        <Grid ref={ref} item xl={1} lg={2} md={3} sm={4} xs={6}>
            <Placeholder observeRef={ref} placeholder={placeholder}>{children}</Placeholder>
        </Grid>
    )
}


/**
 * @function ResponsiveGrid
 * @param {Object} props
 * @param {Object} props.placeholder
 */
export default ({children, placeholder=skeleton}) => {
    // calc classes
    const classes = useStyles();
    
    return (
        <Grid
            container
            spacing={GRID_SPACING}
            className={classes.gridList}
        >
        {React.Children.map(children, child => 
            <GridItem placeholder={placeholder}>{child}</GridItem>
        )}
        </Grid>
    );
};
