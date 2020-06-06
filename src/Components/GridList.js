import React from "react";

import { Grid, Divider} from "@material-ui/core";

/**
 * @param {Object} props
 * @param {JSX.Element[]} props.children
 * @param {import("@material-ui/core").GridProps} props.gridProps
 */
export default ({children, divider, ...gridProps}) => {

    console.log("divider = ", divider);

    return (
        <Grid container
            {...gridProps}
        >
            {divider ? (<Grid item xs={12}><Divider/></Grid>) : null}
            {React.Children.map(children, child => 
                <React.Fragment>
                    <Grid item xs={12}>{child}</Grid>
                    {divider ? (<Grid item xs={12}><Divider/></Grid>) : null}
                </React.Fragment>
            )}
        </Grid>
    );
}