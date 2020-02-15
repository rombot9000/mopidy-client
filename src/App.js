import React from "react";

import { Box } from '@material-ui/core';
import { CssBaseline, makeStyles } from '@material-ui/core';
import MopidyHandler from "MopidyHandler/MopidyHandler";

import AlbumGrid from "Components/AlbumGrid";
import AlbumDetails from "Components/AlbumDetails";
import ScollableModal from "Components/ScrollableModal";
import PlaybackCtrlBar from "Components/PlaybackCtrlBar";
import SearchBar from "Components/SearchBar";
import MenuDrawer from "Components/MenuDrawer";

const useStyles = makeStyles(theme => ({
    rootBox: {
        width: '100%',
        height: '100%',
    },
    searchBar: {
        zIndex: 1100,
        position: "fixed",
        width: 500,
        top: "1vw",
        left: "1vw",
        maxWidth: "98vw"
    }
}));


function App() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        mpdState: null,
        ctrlBarHeight: 0
    });

    const[showMenuDrawer, setShowMenuDrawer] = React.useState(false);

    const [components, setComponents] = React.useState({
        /** @type {Object.<string, JSX.Element>} */
        "components": {}
    });

    // setup listener
    React.useEffect(() => {
        // Listen for changes from mopidy handler
        const mdpListener = MopidyHandler.on("state", (mpdState) => setState(prev => ({...prev, mpdState: mpdState})));
        // clean up
        return () => {
            MopidyHandler.removeListener("state", mdpListener);
        };
    },[]); // only execute once

    // adjust offset of view depending on ctrl bar height
    const ctrlBarRef = React.useRef(null);
    React.useEffect(() => {
        const height = ctrlBarRef.current ? ctrlBarRef.current.offsetHeight : 0;
        setState(prev => ({...prev, ctrlBarHeight: height}));
    }, [ctrlBarRef]); // listen for ctrl bar changes


    /**
     * @param {import('ViewModel/Album').Album} album 
     */
    function openDetailsModal(album) {
        function closeDetailsModal() {
            delete components.components["detailsModal"];
            setComponents(components);
        }
        components.components["detailsModal"] = (
            <ScollableModal key="detailsModal" open onClose={closeDetailsModal}>
                <AlbumDetails album={album}/>
            </ScollableModal>
        );
        setComponents({
            "components": components.components
        });
    }

    function toggleSideMenu() {
        setShowMenuDrawer(!showMenuDrawer);
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <SearchBar className={classes.searchBar} onMenuIconClick={toggleSideMenu}/>
            <MenuDrawer open={showMenuDrawer} onClose={toggleSideMenu}/>
            <Box mb={`${state.ctrlBarHeight}px`} className={classes.rootBox}>
                <AlbumGrid
                    albums={MopidyHandler.Albums}
                    onTileClick={openDetailsModal}
                />
            </Box>
            <PlaybackCtrlBar ref={ctrlBarRef}/>
            {Object.values(components.components)}
        </React.Fragment>
    );
};

export default App;
