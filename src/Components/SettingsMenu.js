import React from "react";

import { Paper, List, ListItem, ListItemText, FormControl, NativeSelect } from "@material-ui/core";

import { Album } from "ViewModel";

import { LibraryActions } from "Actions";
import { LibraryStore, NetworkStore } from "Stores";

export default function SettingsMenu() {

    const [albumSortKey, setAlbumSortKey] = React.useState(LibraryStore.albumSortKey);

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


    return (
        <Paper>
            <List>
                <ListItem>
                    <ListItemText>Sort albums by</ListItemText>
                    <FormControl>
                        <NativeSelect
                            value={albumSortKey}
                            onInput={(event) => {
                                event.preventDefault();
                                LibraryActions.sortAlbums(event.target.value);
                                setAlbumSortKey(event.target.value);
                            }}
                        >
                            {Object.keys(Album(null)).map(key => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </ListItem>
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