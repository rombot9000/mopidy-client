import React from "react";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";

import VirtualizedList from "Components";

const TracksView = ({artists, albums, tracks}) => {

    return (
       <Grid container>
           <Grid item xs={12} sm={6}  md={2}>
                Artists
           </Grid>
           <Grid item xs={12} sm={6}  md={2}>
                Albums
           </Grid>
           <Grid item xs={12} sm={12}  md={8}>
                Tracks
           </Grid>
       </Grid>
    );
};

const mapStateToProps = (state) => ({
    artists: state.library.artists,
    albums: state.library.artists,
    tracks: state.library.tracks
});

export default connect(mapStateToProps)(TracksView);