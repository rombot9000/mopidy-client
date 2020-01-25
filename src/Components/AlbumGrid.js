import React from "react";

import { makeStyles } from "@material-ui/core"
import { GridList, GridListTile } from "@material-ui/core";

import AlbumGridTile from "./AlbumGridTile"

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100vw',
        height: '100vh',
        transform: 'translateZ(0)'
    },
}));

/**
 * @function AlbumGrid
 * @param {Object} props
 * @param {import('./MopidyHandler/LibraryHandler').mpd_album[]} props.albums
 * @param {import('./AlbumGridTile').onTileClick} props.onTileClick
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
            const minSize = 250;
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

    console.debug("Rendering Grid...")
    return (
        <div className={classes.root}>
            <GridList
                ref={ref}
                className={classes.gridList}
                cellHeight={1.4*dims.size}
                cols={dims.cols}
            >{props.albums.map((a,i) => (
                <AlbumGridTile
                    key={i}
                    album={a}
                    size={dims.size}
                    onClick={props.onTileClick} 
                />
            ))}
            </GridList>
        </div>
    );
};

export default AlbumGrid;