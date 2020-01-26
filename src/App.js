import React from "react";

import { CssBaseline } from '@material-ui/core';

import MopidyHandler from "MopidyHandler/MopidyHandler";

import Modal from "Components/Modal";
import AlbumGrid from "Components/AlbumGrid"
import AlbumDetails from "Components/AlbumDetails"
import PlaybackCtrlBar from "Components/PlaybackCtrlBar";

function App() {

    const [state, setState] = React.useState({
        mpdState: null,
    });

    const [components, setComponents] = React.useState({
        /** @type {Object.<string, JSX.Element>} */
        "components": {}
    });

    React.useEffect(() => {
        const listener = MopidyHandler.on("state", (state) => setState({mpdState: state}));
        return () => {
            MopidyHandler.removeListener("state", listener);
        };
    },[]);

    /**
     * 
     * @param {import('./MopidyHandler/LibraryHandler').mpd_album} album 
     */
    function openDetailsModal(album) {
        function closeDetailsModal() {
            delete components.components["detailsModal"];
            setComponents(components);
        }
        console.log("openDetailsModal", album);
        components.components["detailsModal"] = (
            <Modal key="detailsModal" show={true} handleClose={closeDetailsModal}>
                <AlbumDetails uri={album.uri}/>
            </Modal>
        );
        setComponents({
            "components": components.components
        });
        console.log(components);
    }


    return (
        <React.Fragment>
            <CssBaseline/>
            <AlbumGrid
                albums={MopidyHandler.albums}
                onTileClick={openDetailsModal}
                />
            {Object.values(components.components)}
            <PlaybackCtrlBar/>
        </React.Fragment>
    );
};

export default App;
