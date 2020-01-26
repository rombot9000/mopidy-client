import React from "react";

import { makeStyles } from "@material-ui/core";
import { GridListTile, GridListTileBar } from "@material-ui/core";

import MopidyHandler from "MopidyHandler/MopidyHandler"

const useStyles = makeStyles(theme => ({
    paper: {
    },
    cover: {
        objectFit: 'cover'
    }
}));

/**
 * @callback onTileClick
 * @param {import('MopidyHandler/LibraryHandler').mpd_album} album
 */


/**
 * 
 * @typedef AlbumGridTileProps
 * @property {import('../MopidyHandler/LibraryHandler').mpd_album} album
 * @property {number} size
 * @property {onTileClick} onClick
 */

/**
 * 
 * @param {AlbumGridTileProps} prevProps 
 * @param {AlbumGridTileProps} nextProps 
 * @returns {boolean} True if component should NOT rerender, false otherwise
 */
function checkProps(prevProps, nextProps) {
    return prevProps.size === nextProps.size && prevProps.album.uri === nextProps.album.uri;
};

/**
 * 
 * @param {AlbumGridTileProps} props
 */
const AlbumGridTile = React.memo(props => {
    const classes = useStyles();

    // filter props and set consts
    const {to, album, size, onClick, ...gridListTileProps} = props;
    const src = MopidyHandler.album_uri_to_artwork_uri[album.uri];
    const artist = MopidyHandler.album_uri_to_tracks[album.uri][0].artists[0].name;
    
    return (
        <GridListTile
            {...gridListTileProps}
            >
            <img
                className={classes.cover}
                width={size}
                height={size}
                src={src}
                alt="No cover for you!"
                onClick={() => onClick(album)}
            />
            <GridListTileBar
                title={album.name}
                subtitle={artist}
            />
        </GridListTile>
    );
}, checkProps);

export default AlbumGridTile;