import React from "react";
import PropTypes from "prop-types";

import { GridList, GridTile, GridTilePrimary, GridTilePrimaryContent } from "@rmwc/grid-list";
import "@material/grid-list/dist/mdc.grid-list.css";

import MopidyHandler from "./MopidyHandler";

class AlbumGrid extends React.Component {
    static propTypes = {
        albums: PropTypes.array,
        album_to_artwork: PropTypes.object,
    }

    render() {
        console.log("Rendering...");
        return (
            <GridList tileAspect="1x1">
                {this.props.albums.map((a,i) => (
                    <AlbumGridTile key={i} artwork={this.props.album_to_artwork[a.uri]}/>
                ))}
            </GridList>
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
                        alt="test"
                    />
                </GridTilePrimary>
            </GridTile>
        )
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mpdState: null
        }
        MopidyHandler.on("state", (state) => this.setState({mpdState: state}));
    }
    render() {
        return (
            <div className="App">
                <AlbumGrid albums={MopidyHandler.albums} album_to_artwork={MopidyHandler.album_uri_to_artwork}/>
            </div>
        );
    }
};

export default App;
