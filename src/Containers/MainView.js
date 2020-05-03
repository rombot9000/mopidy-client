import React from "react";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import { TracksView} from "Components"; 

import AlbumGrid from "./AlbumGrid";
import AlbumSearchBar from "./AlbumSearchBar";
import NotifyBar from "./NotifyBar";
import MenuDrawer from "./MenuDrawer";
import AlbumDetailsModal from "./AlbumDetailsModal";
import PlaybackCtrlBar from "./PlaybackCtrlBar";
import SettingsModal from "./SettingsModal";

const useStyles = makeStyles(theme => ({
    viewBox: {
        position: "absolute",
        top: 0,
        width: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
    },
    searchBar: {
        zIndex: 1100,
        position: "fixed",
        width: "100%",
        maxWidth: theme.spacing(64),
        padding: theme.spacing(1,1,0,1),//top-right-bottom-left
        left: "50%",
        transform: "translate(-50%,0)",
    },
    snackBar: {
        position: "absolute",
        bottom: theme.spacing(1),
    },
}));


export default function MainView() {
    const classes = useStyles();

    /*
     * Listen for view changes
     */
    const [view, setView] = React.useState({
        height: 0,
        paddingTop: 0
    });
    // adjust offset of view depending on ctrl bar height
    const ctrlBarRef = React.useRef(null);
    const srchBarRef = React.useRef(null);
    React.useEffect(() => {
        const height = ctrlBarRef.current ? ctrlBarRef.current.offsetHeight : 0;
        const paddingTop = srchBarRef.current ? srchBarRef.current.offsetHeight : 0;
        setView({
            height: height,
            paddingTop: paddingTop
        });
    }, [ctrlBarRef, srchBarRef]); // listen for ctrl bar changes

    return (
        <Router>
            <Box
                id="scroll-box"
                className={classes.viewBox}
                bottom={`${view.height}px`}
                paddingTop={`${view.paddingTop}px`}
            >
                <Switch>
                    <Route path="/albums"><AlbumGrid/></Route>
                    <Route patch="/tracks"><TracksView/></Route>
                </Switch>
                <NotifyBar className={classes.snackBar}/>
            </Box>
            <AlbumSearchBar className={classes.searchBar} ref={srchBarRef} />
            <MenuDrawer/>
            <SettingsModal/>
            <AlbumDetailsModal/>
            <PlaybackCtrlBar ref={ctrlBarRef} />
        </Router>
    );
};