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

/**
 * 
 * @param {Object} props
 * @param {import('./MopidyHandler/LibraryHandler').mpd_album[]} props.albums
 */
function AlbumGrid(props) {
    // calc classes
    const classes = useStyles();
    
    // calc number of cols and height
    const ref = React.useRef(null);
    const [dims, setDims] = React.useState({size: 200, cols: 3});

    // effect runs on each render, unless dependecy list if given
    React.useEffect(() => {
        function handleResize() {
            const minSize = 150;
            const width = ref.current ? ref.current.offsetWidth : 0;
            
            const cols = Math.floor(width / minSize);
            const size = Math.floor(width / cols);
            
            setDims({
                cols: cols,
                size: size
            });
        }
        // resize once manually 
        handleResize();
        // add listener for window resize
        window.addEventListener('resize', handleResize);
        // return remove, why?
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [ref]); // prevents call on each render

    return (
        <div className={classes.root}>
            <GridList
                ref={ref}
                className={classes.gridList}
                cellHeight={dims.size}
                cols={dims.cols}
            >{props.albums.map((a,i) => (
                <GridListTile key={i}>
                    <AlbumGridTile
                        album={a}
                        size={dims.size}
                    />
                </GridListTile>
            ))}
            </GridList>
        </div>
    );
};

/**
 * 
 * @param {Object} props
 * @param {import('./MopidyHandler/LibraryHandler').mpd_album} props.album
 * @param {number} props.size
 */
function AlbumGridTile(props) {
    let src = MopidyHandler.album_uri_to_artwork_uri[props.album.uri];
    return (
        <img
            width={props.size}
            height={props.size}
            src={src}
            alt="No cover for you"
        />
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
                <AlbumGrid
                    albums={MopidyHandler.albums}
                />
                <Modal show={this.state.showDetails} handleClose={this.closeDetailsModal.bind(this)}>
                    <AlbumDetails uri={this.state.uriDetails}/>
                </Modal>
            </React.Fragment>
        );
    }
};

export default App;
