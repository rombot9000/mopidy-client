import React from "react";
import PropTypes from "prop-types";

import { GridList, GridTile, GridTilePrimary, GridTilePrimaryContent } from "@rmwc/grid-list";
import "@material/grid-list/dist/mdc.grid-list.css";

import { Card } from "@rmwc/card";
import "@material/card/dist/mdc.card.css";
import "@material/button/dist/mdc.button.css";
import "@material/icon-button/dist/mdc.icon-button.css";

import Modal from "./Modal";

import MopidyHandler from "./MopidyHandler";

class AlbumGrid extends React.Component {
    static propTypes = {
        albums: PropTypes.array,
        album_to_artwork: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            uriDetails: null
        };
    }

    /**
     * 
     * @param {string} uri 
     */
    openDetailsModal(uri) {
        console.log("openDetailsModal");
        this.setState({showDetails: true, uriDetails: uri});
    }

    closeDetailsModal() {
        this.setState({showDetails: false});
    }

    render() {
        console.log("Rendering...");
        return (
            <div>
                <GridList tileAspect="1x1">
                    {this.props.albums.map((a,i) => (
                        <div key={i} onClick={this.openDetailsModal.bind(this, a.uri)}>
                            <AlbumGridTile artwork={this.props.album_to_artwork[a.uri]}/>
                        </div>
                    ))}
                </GridList>
                <Modal show={this.state.showDetails} handleClose={this.closeDetailsModal.bind(this)}>
                    <AlbumDetails uri={this.state.uriDetails}/>
                </Modal>
            </div>
        )
    }
};

class AlbumGridTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        if(this.props.artwork != null && this.props.artwork.length > 0) {
            this.state.artwork_src = `http://raspberrypi.fritz.box:6680${this.props.artwork[0].uri}`;
        } else {
            console.warn(`No artwork...`);
        }
    }

    render() {
        console.log("Rendering tile...")
        return (
            <GridTile>
                <GridTilePrimary>
                    <GridTilePrimaryContent
                        width={100}
                        height={100}
                        src={this.state.artwork_src}
                        alt="No cover for you"
                    />
                </GridTilePrimary>
            </GridTile>
        );
    }
};

class AlbumDetails extends React.Component {
    render() {
        return (
            <Card>Album Details</Card>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mpdState: null
        }
        MopidyHandler.on("state", (state) => this.setState({mpdState: state}));
    }

    render() {
        console.log("Rendering...");
        return (
            <div className="App">
                <AlbumGrid albums={MopidyHandler.albums} album_to_artwork={MopidyHandler.album_uri_to_artwork}/>
            </div>
        );
    }
};

export default App;
