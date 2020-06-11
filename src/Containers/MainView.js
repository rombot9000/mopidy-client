import React from "react";

import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import { makeStyles } from '@material-ui/core';

import TrackView from "./TrackView"; 
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
        paddingTop: props => props.top,
        bottom: props => props.bottom,
        width: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
    },
    albumGrid: {
        position: "absolute",
        top: 0,
        paddingTop: props => props.top + theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        bottom: props => props.bottom,
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
    notifyBar: {
        position: "absolute",
        bottom: props => props.bottom + theme.spacing(1),
    },
}));


export default function MainView() {
    /*
     * Listen for view changes
     */
    const [view, setView] = React.useState({
        bottom: 0,
        top: 0
    });
    // adjust offset of view depending on ctrl bar height
    const ctrlBarRef = React.useRef(null);
    const srchBarRef = React.useRef(null);
    React.useEffect(() => {
        setView({
            bottom: ctrlBarRef.current ? ctrlBarRef.current.offsetHeight : 0,
            top: srchBarRef.current ? srchBarRef.current.offsetHeight : 0
        });
    }, [ctrlBarRef, srchBarRef]); // listen for ctrl bar changes

    const classes = useStyles(view);

    return (
        <Router>
            <AlbumSearchBar className={classes.searchBar} ref={srchBarRef} />
            <Switch>
                <Route path="/albums"><AlbumGrid className={classes.albumGrid}/></Route>
                <Route path="/tracks"><TrackView/></Route>
                <Route><Redirect to="/albums"/></Route>
            </Switch>
            <NotifyBar className={classes.notifyBar}/>
            <MenuDrawer/>
            <SettingsModal/>
            <AlbumDetailsModal/>
            <PlaybackCtrlBar ref={ctrlBarRef} />
        </Router>
    );
};