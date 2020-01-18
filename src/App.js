import React from "react";

import { CssBaseline } from '@material-ui/core';
import { makeStyles } from "@material-ui/core"
import { GridList, GridListTile } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";

import Modal from "./Modal";
import MopidyHandler from "./MopidyHandler/MopidyHandler";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '90vw',
        height: '100vh'
    },
}));

function AlbumGrid(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <GridList
                className={classes.gridList}
                cellHeight={100}
                cols={3}
            >{props.albums.map((a,i) => (
                <div key={i}>
                    <AlbumGridTile artwork={props.album_to_artwork[a.uri]}/>
                </div>
            ))}
            </GridList>
        </div>
    );
};

function AlbumGridTile(props) {
    let artwork_src;
    if(props.artwork != null && props.artwork.length > 0) {
        artwork_src = `http://raspberrypi.fritz.box:6680${props.artwork[0].uri}`;
    } else {
        console.warn(`No artwork...`);
    }

    console.log("Rendering tile...")
    return (
        <GridListTile>
            <img
                src={artwork_src}
                alt="No cover for you"
            />
        </GridListTile>
    );
};

class AlbumDetails extends React.Component {
    constructor(props) {
        super(props);
        /** @type {string} */
        this.artwork_src = null;
        /** @type {import("./MopidyHandler/MopidyHandler").mpd_track[]} */
        this.tracks = [];
    } 
    render() {
        console.log("Rendering Album detail...")
        if(this.props.uri) {
            this.artwork_src = MopidyHandler.album_uri_to_artwork[this.props.uri];
            this.tracks = MopidyHandler.album_uri_to_tracks[this.props.uri];
        }
        return (
            <List>{this.tracks.map((track,i) => (
                <ListItem key={i} onClick={() => {MopidyHandler.playTrack(track)}}>
                    <ListItemIcon>
                        <PlayArrow/>
                    </ListItemIcon>
                    <ListItemText>{track.name}</ListItemText>
                </ListItem>
            ))}
            </List>
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
            <React.Fragment>
                <CssBaseline/>
                <AlbumGrid albums={MopidyHandler.albums} album_to_artwork={MopidyHandler.album_uri_to_artwork}/>
                <Modal show={this.state.showDetails} handleClose={this.closeDetailsModal.bind(this)}>
                    <AlbumDetails uri={this.state.uriDetails}/>
                </Modal>
            </React.Fragment>
        );
    }
};

export default App;
