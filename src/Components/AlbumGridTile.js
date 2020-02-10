import React from "react";

import { makeStyles } from "@material-ui/core";
import { GridListTile, GridListTileBar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
    },
    cover: {
        objectFit: 'cover'
    }
}));

/**
 * @callback onTileClick
 * @param {import('ViewModel/Album').Album} album
 */

/**
 * 
 * @typedef AlbumGridTileProps
 * @property {import('ViewModel/Album').Album} album
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
    return prevProps.size === nextProps.size && prevProps.album._uri === nextProps.album._uri;
};

/**
 * 
 * @param {AlbumGridTileProps} props
 */
const AlbumGridTile = React.memo(props => {
    const classes = useStyles();

    // filter props and set consts
    const {to, album, size, onClick, ...gridListTileProps} = props;
    
    return (
        <GridListTile
            {...gridListTileProps}
            >
            <img
                className={classes.cover}
                width={size}
                height={size}
                src={album.cover}
                alt="No cover for you!"
                onClick={() => onClick(album)}
            />
            <GridListTileBar
                title={album.name}
                subtitle={album.artist}
            />
        </GridListTile>
    );
}, checkProps);

export default AlbumGridTile;