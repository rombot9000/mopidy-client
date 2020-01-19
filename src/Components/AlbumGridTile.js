import React from "react";

import MopidyHandler from "MopidyHandler/MopidyHandler"

/**
 * 
 * @param {Object} props
 * @param {import('../MopidyHandler/LibraryHandler').mpd_album} props.album
 * @param {number} props.size
 * @param {onTileClick} props.onClick
 */
function AlbumGridTile(props) {
    const src = MopidyHandler.album_uri_to_artwork_uri[props.album.uri];
    const onClick = () => props.onClick(props.album);
    console.debug("Renderng tile...");
    return (
        <img
            width={props.size}
            height={props.size}
            src={src}
            alt="No cover for you"
            onClick={onClick}
        />
    );
};

export default AlbumGridTile;