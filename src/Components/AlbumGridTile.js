import React from "react";

import { makeStyles, Typography } from "@material-ui/core";
import SquareImage from "./SquareImage";

/**
 * @callback onTileClick
 * @param {import("ViewModel/Album").Album} album
 */

/**
 * 
 * @typedef AlbumGridTileProps
 * @property {import("ViewModel/Album").Album} album
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
 * Use Memo to prevent rerender when onClick is called
 * NOTE: we use backgound-image hack since the Paper component adds white space below a child img...
 * @param {AlbumGridTileProps} props
 */
const AlbumGridTile = React.memo(props => {
    
    return (
        <div onClick={() => props.onClick(props.album)}>
            <SquareImage src={props.album.cover}/>
            <Typography variant="button">{props.album.name}</Typography>
            <br/>
            <Typography variant="caption">{props.album.artist}</Typography>
        </div>
    );

}, checkProps);

export default AlbumGridTile;