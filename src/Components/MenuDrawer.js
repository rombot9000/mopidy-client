import React from "react";

import { Drawer, Typography, Divider } from "@material-ui/core";

import TrackList from "Components/Tracklist";

import { TracklistStore, ViewStore } from "Stores";
import { ViewActions } from "Actions";

function MenuDrawer() {
    return (
        <Drawer open={ViewStore.menuDrawerState} onClose={ViewActions.toggleMenuDrawer}>
            <Typography variant="h6">Current Tracklist</Typography>
            <Divider orientation="horizontal"/>
            <TrackList tracks={TracklistStore.tracks}/>
        </Drawer>
    );
}

export default MenuDrawer;