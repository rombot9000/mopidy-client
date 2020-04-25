import React from "react";

import { Paper, List, ListItem, ListItemText, ListItemSecondaryAction, NativeSelect, Divider, Switch } from "@material-ui/core";

import { Album } from "ViewModel";

import { LibraryActions, NotifyActions } from "Actions";
import { LibraryStore, NetworkStore, NotifyStore } from "Stores";

export default function SettingsMenu() {

    const [networkState, setNetworkState] = React.useState({
        socketState: NetworkStore.socketState,
        serverState: NetworkStore.serverState
    })

    React.useEffect(() => {
        
        const handleNetworkUpdate = () => {
            setNetworkState({
                socketState: NetworkStore.socketState,
                serverState: NetworkStore.serverState
            });
        }
        
        NetworkStore.on("update", handleNetworkUpdate);
        
        return () => {
            NetworkStore.removeListener("update", handleNetworkUpdate);
        }
        
    }, []);

    const [albumSortKey, setAlbumSortKey] = React.useState(LibraryStore.albumSortKey);
    function handleSortKeySelect(event) {
        event.preventDefault();
        LibraryActions.sortAlbums(event.target.value);
        setAlbumSortKey(event.target.value);
    };

    const [doNotify, setDoNotify] = React.useState(NotifyStore.enabled);
    function handleNotifyToggle(event) {
        event.preventDefault();
        NotifyActions.enableNotifications(event.target.checked);
        setDoNotify(event.target.checked);
    }


    return (
        <Paper>
            <List>
                <ListItem>
                    <ListItemText>Sort albums by</ListItemText>
                    <ListItemSecondaryAction>
                        <NativeSelect
                            value={albumSortKey}
                            onInput={handleSortKeySelect}
                        >
                            {Object.keys(Album(null)).map(key => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </NativeSelect>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText>Server messages</ListItemText>
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            onChange={handleNotifyToggle}
                            checked={doNotify}
                       />
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText>Server State: {networkState.serverState}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>Socket State: {networkState.socketState}</ListItemText>
                </ListItem>
            </List>
        </Paper>
    );
}