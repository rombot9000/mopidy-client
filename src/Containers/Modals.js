import React from "react";

import { connect } from "react-redux";

import ScrollableModal from "Components/ScrollableModal";
import SettingsMenu from "Containers/SettingsMenu"; 

/** 
 * @typedef {Object.<string, JSX.Element>} ViewComponents
 */


function Modals({}) {

    /** 
     * State var for holding additional view components
     * @type {[ViewComponents, React.Dispatch<React.SetStateAction<ViewComponents>>]} 
     */
    const [modalComponent, setModalComponent] = React.useState(null);
    React.useEffect(() => {

        const showAsModal = (component) => {
            setModalComponent(component);
            showModal(true);
        }


        const openAlbumDetailsModal = () => {showAsModal(<AlbumDetails album={ViewStore.detailsModalAlbum}/>)};
        ViewStore.on("openAlbumDetailsModal", openAlbumDetailsModal);

        const openSettingsModal = () => {showAsModal(<SettingsMenu/>)}
        ViewStore.on("openSettingsModal", openSettingsModal);

        return () => {
            ViewStore.removeListener("openAlbumDetailsModal", openAlbumDetailsModal);
            ViewStore.removeListener("openSettingsModal", openSettingsModal);
        };

    }, []);

    const [open, showModal] = React.useState(false);
    const closeModal = () => {
        showModal(false);
        setModalComponent(null);
    }
    
    return (
        <ScrollableModal open={open} onClose={closeModal}>
            {modalComponent}
        </ScrollableModal>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Modals);