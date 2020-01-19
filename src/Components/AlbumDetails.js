import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { PlayArrowRounded } from "@material-ui/icons";

import MopidyHandler from "MopidyHandler/MopidyHandler";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

function TrackListItem(props) {
    const [icon, setIcon] = React.useState(<div/>);
    
    return (
        <ListItem
            onClick={(e) => {
                e.stopPropagation();
                MopidyHandler.playTrack(props.track)
            }}
            onMouseEnter={(e) => {
                setIcon(<PlayArrowRounded/>);
            }}
            onMouseLeave={(e) => {
                setIcon(<div/>);
            }}
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={props.track.name}/>
        </ListItem>
    );
}

/**
 * 
 * @param {Object} props
 * @param {string} props.uri 
 */
function AlbumDetails(props) {

    const classes = useStyles();

    //const artwork_src = MopidyHandler.album_uri_to_artwork_uri[props.uri];
    const tracks = MopidyHandler.album_uri_to_tracks[props.uri];

    console.debug("Rendering Album detail...")
    return (
        <List className={classes.root}>{tracks.map((track,i) => (
            <TrackListItem key={i} track={track}/>
        ))}
        </List>
    );
}

export default AlbumDetails;