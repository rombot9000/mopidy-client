import React from "react";

import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, IconButton, Grid } from "@mui/material";
import {
    QueueMusic as PlaylistIcon,
    MusicNote as TracksIcon,
    LibraryMusic as ArtistsIcon,
    AlbumRounded as AlbumsIcon,
    Tune as SettingsIcon,
    Clear as ClearTracklistIcon
} from "@mui/icons-material";

import { ListLinkItem } from "Components";
import Tracklist from "./Tracklist";

import { ViewActions, TracklistActions } from "Actions";

const useStyles = makeStyles(theme => ({
    paper: {
        [theme.breakpoints.up('sm')]: {
            width: theme.breakpoints.values.sm - 56,
        },
        [theme.breakpoints.down('xs')]: {
            width: `calc(100% - 56px)`,
        },
        maxHeight: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    list: {
        width: "100%",
        maxHeight: "100%",
        flexShrink: 0
    },
    text: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        fontWeight: "normal"
    },
    tracklist : {
        width: "100%",
        flexShrink: 1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        overflowY: "scroll",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
            display: "none"
        },
        "-msOverflowStyle": "none",
        "-webkit-overflow-scrolling": "auto",
    }
}));

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {Function} props.onClose
 * @param {Function} props.onSettingsItemClick
 */
function MenuDrawer({open, onClose, onSettingsItemClick, onClearTracklistClick}) {

    const classes = useStyles();

    return (
        <Drawer
            open={open}
            onClose={onClose}
            PaperProps={{
                className: classes.paper
            }}
        >
            <List className={classes.list}>
                <ListItem>
                    <ListItemText disableTypography>
                        <Typography variant="h5">Mopidy</Typography>
                    </ListItemText>
                </ListItem>
                <Divider/>
                <ListLinkItem to="/albums" icon={<AlbumsIcon/>} text="Albums"/>
                <ListLinkItem to="/artists" icon={<ArtistsIcon/>} text="Artists"/>
                <ListLinkItem to="/tracks" icon={<TracksIcon/>} text="Tracks"/>
                <ListLinkItem to="/playlists" icon={<PlaylistIcon/>} text="Playlists"/>
                <Divider/>
                <ListItem button onClick={onSettingsItemClick}>
                    <ListItemIcon><SettingsIcon/></ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </ListItem>
                <Divider/>
            </List>
            {/* TODO: fix vertival placement of clear icon */}
            <Grid container
                direction="row"
                alignItems="center"
                justify="space-between"
            >
                <Grid item xs>
                    <Typography className={classes.text} variant="h6">Now Playing</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={onClearTracklistClick} size="small">
                        <ClearTracklistIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <Tracklist className={classes.tracklist} scrollToActive/>
        </Drawer>
    );
}

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    open: state.view.menuDrawerOpen,
});
  
const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(ViewActions.toggleMenuDrawer()),
    onSettingsItemClick: () => dispatch(ViewActions.toggleSettingModal()),
    onClearTracklistClick: () => dispatch(TracklistActions.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);