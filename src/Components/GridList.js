import React from "react";

import { Grid, Divider} from "@mui/material";
import { makeStyles } from "@mui/material";

const useStyles = makeStyles({
    topDivider: {
        //backgroundColor: "white",
        backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0.75))",
        position: "sticky",
        top: 0,
        zIndex: 1,
    }
})

/**
 * @param {Object} props 
 * @param {JSX.Element[]} props.children
 * @param {import("@mui/material").GridProps} props.gridProps
 */
const GridList = ({children, divider, ...gridProps}) => {
    const classes = useStyles();

    return (
        <Grid container
            {...gridProps}
        >
            {divider ? (<Grid item className={classes.topDivider} xs={12}><Divider/></Grid>) : null}
            {React.Children.map(children, child => 
                <React.Fragment>
                    <Grid item xs={12}>{child}</Grid>
                    {divider ? (<Grid item xs={12}><Divider light/></Grid>) : null}
                </React.Fragment>
            )}
        </Grid>
    );
}

export default GridList;