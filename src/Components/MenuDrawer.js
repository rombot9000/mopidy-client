import React from "react";

import { Drawer, Typography, Divider } from "@material-ui/core";

import TrackList from "Components/Tracklist";

import TracklistStore from "Stores/TracklistStore";

function MenuDrawer(props) {
    return (
        <Drawer open={props.open} onClose={props.onClose}>
            <Typography variant="h6">Current Tracklist</Typography>
            <Divider orientation="horizontal"/>
            <TrackList tracks={TracklistStore.tracks}/>
        </Drawer>
    );
}

export default MenuDrawer;