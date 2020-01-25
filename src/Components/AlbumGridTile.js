import React from "react";

import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
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
 * 
 * @param {Object} props
 * @param {import('../MopidyHandler/LibraryHandler').mpd_album} props.album
 * @param {number} props.size
 * @param {onTileClick} props.onClick
 */
function AlbumGridTile(props) {
    const classes = useStyles();
    const src = MopidyHandler.album_uri_to_artwork_uri[props.album.uri];
    const artist = MopidyHandler.album_uri_to_tracks[props.album.uri][0].artists[0].name;
    const onClick = () => props.onClick(props.album);
    console.debug("Renderng tile...");
    return (
        <GridListTile>
            <img
                className={classes.cover}
                width={props.size}
                height={props.size}
                src={src}
                alt="No cover for you!"
                onClick={onClick}
            />
            <GridListTileBar
                title={props.album.name}
                subtitle={artist}
            />
        </GridListTile>
      
    );
};

export default AlbumGridTile;