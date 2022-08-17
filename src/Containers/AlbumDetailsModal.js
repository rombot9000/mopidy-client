import React from "react";
import { connect } from "react-redux";

import ScrollableModal from "Components/ScrollableModal";
import AlbumDetails from "./AlbumDetails";

import {ViewActions} from "Actions";

/**
 * @param {Object} props
 * @param {boolean} open
 * @param {Function} onClose
 * @param {import("Reducers/LibraryReducer").StoredAlbum} album
 */
const AlbumDetailsModal = ({open, album, onClose}) =>  (
    <ScrollableModal open={open} onClose={onClose}>
        <AlbumDetails album={album} />
    </ScrollableModal>
);

/**
 * @param {import("Reducers").State} state 
 */
const mapStateToProps = (state) => ({
    open: state.view.albumDetailsModalOpen,
    album: state.view.albumDetailsAlbum
});
  
const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(ViewActions.toggleAlbumDetailsModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailsModal);