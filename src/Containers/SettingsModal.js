import React from "react";
import { connect } from "react-redux";

import { Switch } from "@mui/material";

import SettingsMenu from "Components/SettingsMenu";
import ScrollableModal from "Components/ScrollableModal";
import MultiSelect from "Components/MultiSelect";

import { LibraryActions, NotifyActions, ViewActions } from "Actions";
import { EmptyAlbum } from "Reducers/StoreModel";

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    open: state.view.settingsMenuOpen,
    albumSortKeys: state.library.albumSortKeys,
    networkState: state.network,
    doNotify: state.notify.enabled,
});
  
const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(ViewActions.toggleSettingModal()),
    onSetAlbumSortKeys: keys => dispatch(LibraryActions.sortAlbums(keys)),
    onToggleDoNotify: event => dispatch(NotifyActions.enableNotifications(event.target.checked))
});

/**
 * @callback SettingsCallback
 * @param {MouseEvent}
 * @returns {void} 
 */

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {Function} props.onClose
 * @param {string[]} props.albumSortKeys
 * @param {SettingsCallback} props.onSetAlbumSortKey
 * @param {{socketState: string, serverState: string}} props.networkState
 * @param {boolean} doNotify
 * @param {SettingsCallback} onToggleDoNotify
 */
function SettingsModal({open, onClose, albumSortKeys, onSetAlbumSortKeys, networkState, doNotify, onToggleDoNotify}) {

    const options = [
        {
            text: "Sort albums by",
            input: (<MultiSelect options={Object.keys(EmptyAlbum())} selection={albumSortKeys} onSelect={onSetAlbumSortKeys}/>)
        },
        {
            text: "Show server messages",
            input: (
                <Switch
                    edge="end"
                    onChange={onToggleDoNotify}
                    checked={doNotify}
                />
            )
        }
    ];

    const states = [
        {
            text: "Server State",
            value: networkState.serverState
        },
        {
            text: "Socker State",
            value: networkState.serverState
        }
    ];
    
    return (
        <ScrollableModal open={open} onClose={onClose}>
            <SettingsMenu
                options={options}
                states={states}
            />
        </ScrollableModal>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);