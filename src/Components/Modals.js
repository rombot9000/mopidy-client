import React from "react";

import { ViewStore } from "Stores";

import ScrollableModal from "./ScrollableModal";
import AlbumDetails from "./AlbumDetails";
import SettingsMenu from "Containers/SettingsMenu"; 

/** 
 * @typedef {Object.<string, JSX.Element>} ViewComponents
 */


export default function Modals() {

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