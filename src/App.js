import React from "react";

import { CssBaseline, Box, makeStyles } from '@material-ui/core';
import MopidyHandler from "MopidyHandler/MopidyHandler";

import Modal from "Components/Modal";
import AlbumGrid from "Components/AlbumGrid"
import AlbumDetails from "Components/AlbumDetails"
import PlaybackCtrlBar from "Components/PlaybackCtrlBar";

const useStyles = makeStyles(theme => ({
    rootBox: {
        width: '100%',
        height: '100%',
    },
}));


function App() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        mpdState: null,
        ctrlBarHeight: 0
    });

    const [components, setComponents] = React.useState({
        /** @type {Object.<string, JSX.Element>} */
        "components": {}
    });

    // setup listener
    React.useEffect(() => {
        // Listen for changes from mopidy handler
        const mdpListener = MopidyHandler.on("state", (mpdState) => setState(prev => ({...prev, mpdState: mpdState})));
        return () => {
            MopidyHandler.removeListener("state", mdpListener);
        };
    },[]);

    const ctrlBarRef = React.useRef(null);
    React.useEffect(() => {
        const height = ctrlBarRef.current ? ctrlBarRef.current.offsetHeight : 0;
        setState(prev => ({...prev, ctrlBarHeight: height}));
    }, [ctrlBarRef]);


    /**
     * @param {import('./MopidyHandler/LibraryHandler').mpd_album} album 
     */
    function openDetailsModal(album) {
        function closeDetailsModal() {
            delete components.components["detailsModal"];
            setComponents(components);
        }
        components.components["detailsModal"] = (
            <Modal key="detailsModal" show={true} handleClose={closeDetailsModal}>
                <AlbumDetails uri={album.uri}/>
            </Modal>
        );
        setComponents({
            "components": components.components
        });
    }

    console.log(state);
    return (
        <React.Fragment>
            <CssBaseline/>
            <Box mb={`${state.ctrlBarHeight}px`} className={classes.rootBox}>
                <AlbumGrid
                    albums={MopidyHandler.albums}
                    onTileClick={openDetailsModal}
                    />
                {Object.values(components.components)}
            </Box>
            <PlaybackCtrlBar ref={ctrlBarRef}/>
        </React.Fragment>
    );
};

export default App;
