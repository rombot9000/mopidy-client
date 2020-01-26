import React from "react";

import { makeStyles } from "@material-ui/core"
import { GridList } from "@material-ui/core";

import AlbumGridTile from "./AlbumGridTile"

const useStyles = makeStyles(theme => ({
    gridList: {
        overflow: 'scroll',
        width: '100%',
        height: '100%',
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
    const gridListRef = React.useRef(null);
    const [dims, setDims] = React.useState({size: 200, cols: 3});

    // effect runs on each render, unless dependecy list if given
    React.useEffect(() => {
        function handleResize() {
            const minSize = 250;
            const width = gridListRef.current ? gridListRef.current.offsetWidth : 0;
            
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
    }, [gridListRef]); // prevents call on each render

    console.debug("Rendering Grid...")
    return (
        <GridList
            ref={gridListRef}
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
    );
};

export default AlbumGrid;