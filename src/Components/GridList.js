import React from "react";

import { Grid, Divider} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

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
 * @param {import("@material-ui/core").GridProps} props.gridProps
 */
export default ({children, divider, ...gridProps}) => {
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