import React from "react";

import { CssBaseline } from '@material-ui/core';

import MopidyHandler from "MopidyHandler/MopidyHandler";

import Modal from "./Modal";
import AlbumGrid from "Components/AlbumGrid"
import AlbumDetails from "Components/AlbumDetails"
import PlaybackCtrlBar from "Components/PlaybackCtrlBar";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mpdState: null,
            componentCount: 0
        }
        MopidyHandler.on("state", (state) => this.setState({mpdState: state}));
        
        /** @type {Object.<string, JSX.Element>} */
        this._components = {};

        this._openDetailsModal = this._openDetailsModal.bind(this);
    }

    /**
     * 
     * @param {import('./MopidyHandler/LibraryHandler').mpd_album} album 
     */
    _openDetailsModal(album) {
        this._components["detailsModal"] = (
            <Modal key="detailsModal" show={true} handleClose={this._closeDetailsModal.bind(this)}>
                <AlbumDetails uri={album.uri}/>
            </Modal>
        );
        this.setState({componentCount: Object.keys(this._components).length});
    }

    _closeDetailsModal() {
        delete this._components["detailsModal"];
        this.setState({componentCount: Object.keys(this._components).length});
    }

    render() {
        console.debug("Rendering App...");
        return (
            <React.Fragment>
                <CssBaseline/>
                <PlaybackCtrlBar/>
                <AlbumGrid
                    albums={MopidyHandler.albums}
                    onTileClick={this._openDetailsModal}
                />
                {Object.values(this._components)}
            </React.Fragment>
        );
    }
};

export default App;
