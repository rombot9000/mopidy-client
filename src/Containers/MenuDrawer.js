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
            width: 400,
        },
        [theme.breakpoints.down('xs')]: {
            width: `calc(100% - 56px)`,
        }
    },
    list: {
        width: "100%"
    }
}));

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    open: state.view.menuDrawerOpen,
    tracks: state.tracklist.tracks
});
  
const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(ViewActions.toggleMenuDrawer())
});

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {Function} props.onClose
 */
function MenuDrawer({open, onClose, tracks}) {

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
                <ListLinkItem to="/playlists" icon={<QueueMusic/>} text="Playlists"/>
                <Divider/>
                <ListItem button onClick={ViewActions.toggleSettingModal}>
                    <ListItemIcon><Tune/></ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText>Now Playing</ListItemText>
                </ListItem>
                <Container>
                    <Tracklist tracks={tracks} height="full"/>
                </Container>
            </List>
        </Drawer>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);