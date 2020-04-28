import React from "react";
import { connect } from "react-redux";

import ScrollableModal from "Components/ScrollableModal";
import AlbumDetails from "Components/AlbumDetails";

import {ViewActions} from "Actions";

/**
 * @param {Object} props
 * @param {boolean} open
 * @param {Function} onClose
 * @param {import("ViewModel/Album").Album} album
 */
const AlbumDetailsModal = ({open, album, onClose}) =>  (
    <ScrollableModal open={open} onClose={onClose}>
        <AlbumDetails album={album} />
    </ScrollableModal>
);

const mapStateToProps = (state, ownProps) => ({
    open: state.view.albumDetailsModalOpen,
    album: state.view.albumDetailsAlbum
});
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClose: () => dispatch(ViewActions.toggleAlbumDetailsModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailsModal);