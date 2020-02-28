import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography} from "@material-ui/core";
import { QueueMusic, MusicNote, LibraryMusic, AlbumRounded, Tune } from "@material-ui/icons";

import TrackList from "Components/Tracklist";

import { TracklistStore, ViewStore } from "Stores";
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

function MenuDrawer() {

    const classes = useStyles();

    const [drawerState, setDrawerState] = React.useState(true);
    React.useEffect(() => {
        
        const toggleDrawerState = () => setDrawerState(s => !s);
        ViewStore.on("toggleMenuDrawer", toggleDrawerState);

        return () => {
            ViewStore.removeListener("toggleMenuDrawer", toggleDrawerState);
        };
    }, [])

    return (
        <Drawer
            open={drawerState}
            onClose={() => setDrawerState(false)}
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
                <ListItem>
                    <ListItemIcon><AlbumRounded/></ListItemIcon>
                    <ListItemText>Albums</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon><LibraryMusic/></ListItemIcon>
                    <ListItemText>Artists</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon><MusicNote/></ListItemIcon>
                    <ListItemText>Tracks</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon><QueueMusic/></ListItemIcon>
                    <ListItemText>Playlists</ListItemText>
                </ListItem>
                <ListItem button onClick={ViewActions.openSettingsModal}>
                    <ListItemIcon><Tune/></ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText>Now Playing</ListItemText>
                </ListItem>
                <TrackList tracks={TracklistStore.tracks}/>
            </List>
        </Drawer>
    );
}

export default MenuDrawer;