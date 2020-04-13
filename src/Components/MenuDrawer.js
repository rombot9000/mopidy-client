import React from "react";

import { NavLink, useRouteMatch } from "react-router-dom";

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

function LinkItem(props) {
    const {to, text, icon, ...listItemProps} = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <NavLink to={to} ref={ref} {...itemProps}/>)
    , [to]);

    return (
        <ListItem
            button
            selected={useRouteMatch(to)}
            {...listItemProps} 
            component={renderLink}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
        </ListItem>
    );
}

function MenuDrawer() {

    const classes = useStyles();

    const [drawerState, setDrawerState] = React.useState(false);
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
                <LinkItem to="/albums" icon={<AlbumRounded/>} text="Albums"/>
                <LinkItem to="/artists" icon={<LibraryMusic/>} text="Artists"/>
                <LinkItem to="/tracks" icon={<MusicNote/>} text="Tracks"/>
                <LinkItem to="/playlists" icon={<QueueMusic/>} text="Playlists"/>
                <Divider/>
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