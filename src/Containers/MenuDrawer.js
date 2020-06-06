import React from "react";

import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Container} from "@material-ui/core";
import { QueueMusic, MusicNote, LibraryMusic, AlbumRounded, Tune } from "@material-ui/icons";

import { ListLinkItem } from "Components";
import Tracklist from "./Tracklist";

import { ViewActions } from "Actions";

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
function MenuDrawer({open, onClose, onSettingsItemClick}) {

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
                <ListLinkItem to="/albums" icon={<AlbumRounded/>} text="Albums"/>
                <ListLinkItem to="/artists" icon={<LibraryMusic/>} text="Artists"/>
                <ListLinkItem to="/tracks" icon={<MusicNote/>} text="Tracks"/>
                <ListLinkItem to="/playlists" icon={<QueueMusic/>} text="Tracklists"/>
                <Divider/>
                <ListItem button onClick={onSettingsItemClick}>
                    <ListItemIcon><Tune/></ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </ListItem>
                <Divider/>
            </List>
            <Typography className={classes.text} variant="h6">Now Playing</Typography>
            <Tracklist className={classes.tracklist}/>
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
    onSettingsItemClick: () => dispatch(ViewActions.toggleSettingModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);