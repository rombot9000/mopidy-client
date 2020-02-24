import React from "react";

import { Drawer, Typography, Divider } from "@material-ui/core";

import TrackList from "Components/Tracklist";

import { TracklistStore, ViewStore } from "Stores";
import { ViewActions } from "Actions";

function MenuDrawer() {

    const [drawerState, setDrawerState] = React.useState(false);
    React.useEffect(() => {
        
        const toggleDrawerState = () => setDrawerState(s => !s);
        ViewStore.on("toggleMenuDrawer", toggleDrawerState);

        return () => {
            ViewStore.removeListener("toggleMenuDrawer", toggleDrawerState);
        };
    }, [])

    return (
        <Drawer open={drawerState} onClose={ViewActions.toggleMenuDrawer}>
            <Typography variant="h6">Current Tracklist</Typography>
            <Divider orientation="horizontal"/>
            <TrackList tracks={TracklistStore.tracks}/>
        </Drawer>
    );
}

export default MenuDrawer;