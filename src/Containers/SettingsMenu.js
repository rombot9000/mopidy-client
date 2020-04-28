import React from "react";

import { connect } from "react-redux";

import { Paper, List, ListItem, ListItemText, ListItemSecondaryAction, NativeSelect, Divider, Switch } from "@material-ui/core";

import { Album } from "ViewModel";

import { LibraryActions, NotifyActions } from "Actions";

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    albumSortKey: state.library.albumSortKey,
    networkState: state.network,
    doNotify: state.notify.enabled
});
  
const mapDispatchToProps = (dispatch) => ({
    onSetAlbumSortKey: event => dispatch(LibraryActions.sortAlbums(event.target.value)),
    onToggleDoNotify: event => dispatch(NotifyActions.enableNotifications(event.target.checked))
});

/**
 * @callback SettingsCallback
 * @param {MouseEvent}
 * @returns {void} 
 */

/**
 * @param {Object} props
 * @param {string} props.albumSortKey
 * @param {SettingsCallback} props.onSetAlbumSortKey
 * @param {{socketState: string, serverState: string}} props.networkState
 * @param {boolean} doNotify
 * @param {SettingsCallback} onToggleDoNotify
 */
function SettingsMenu({albumSortKey, onSetAlbumSortKey, networkState, doNotify, onToggleDoNotify}) {

    return (
        <Paper>
            <List>
                <ListItem>
                    <ListItemText>Sort albums by</ListItemText>
                    <ListItemSecondaryAction>
                        <NativeSelect
                            value={albumSortKey}
                            onInput={onSetAlbumSortKey}
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
                            onChange={onToggleDoNotify}
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);