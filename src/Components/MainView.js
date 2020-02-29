import React from "react";

import { Box, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import { AlbumGrid, AlbumDetails, ScrollableModal, PlaybackCtrlBar, SearchBar, MenuDrawer, SettingsMenu } from "Components"; 
import { LibraryStore, ViewStore, NetworkStore } from "Stores";

/** 
 * @typedef {Object.<string, JSX.Element>} ViewComponents
 */

const useStyles = makeStyles(theme => ({
    rootBox: {
        width: '100%',
        height: '100%',
    },
    searchBar: {
        zIndex: 1100,
        position: "fixed",
        width: "100%",
        maxWidth: theme.spacing(64),
        padding: theme.spacing(1,1,0,1),//top-right-bottom-left
        left: "50%",
        transform: "translate(-50%,0)",
    }
}));


function MainView() {
    const classes = useStyles();

    /** 
     * State var for holding additional view components
     * @type {[ViewComponents, React.Dispatch<React.SetStateAction<ViewComponents>>]} 
     */
    const [components, setComponents] = React.useState({});
    React.useEffect(() => {
       /**
        * Add components to view
        * @param {ViewComponents} newComp 
        */
        const addComponent = (newComp) => { setComponents(comps => {return {...comps, ...newComp}} ) };

        /**
         * Remove componentes from view
         * @param {string} key 
         */
        const delComponent = (key) => {
            setComponents(comps => {
                delete comps[key];
                return {...comps};
            });
        }

        const openAlbumDetailsModal = () => {
            addComponent({
                "detailsModal": (
                    <ScrollableModal key="detailsModal" open onClose={() => delComponent("detailsModal")}>
                        <AlbumDetails album={ViewStore.detailsModalAlbum}/>
                    </ScrollableModal>
                )
            });
        }
        ViewStore.on("openAlbumDetailsModal", openAlbumDetailsModal);

        const openSettingsModal = () => {
            addComponent({
                "settingsModal": (
                    <ScrollableModal key="settingsModal" open onClose={() => delComponent("settingsModal")}>
                        <SettingsMenu/>
                    </ScrollableModal>
                )
            });
        }
        ViewStore.on("openSettingsModal", openSettingsModal);

        return () => {
            LibraryStore.removeListener("openAlbumDetailsModal", openAlbumDetailsModal);
            LibraryStore.removeListener("openSettingsModal", openSettingsModal);
        };
    }, [])

    // Setup states and listeners
    const [albums, setAlbums] = React.useState(LibraryStore.albums);
    React.useEffect(() => {

        const handleLibraryUpdate = () => {setAlbums(LibraryStore.albums)};
        LibraryStore.on("update", handleLibraryUpdate);
        
        return () => {
            LibraryStore.removeListener("update", handleLibraryUpdate);
        };
    }, []);

    /*
     * Listen for view changes
     */
    const [view, setView] = React.useState({
        height: 0,
        paddingTop: 0
    });
    // adjust offset of view depending on ctrl bar height
    const ctrlBarRef = React.useRef(null);
    const srchBarRef = React.useRef(null);
    React.useEffect(() => {
        const height = ctrlBarRef.current ? ctrlBarRef.current.offsetHeight : 0;
        const paddingTop = srchBarRef.current ? srchBarRef.current.offsetHeight : 0;
        setView({
            height: height,
            paddingTop: paddingTop
        });
    }, [ctrlBarRef, srchBarRef]); // listen for ctrl bar changes

    return (
        <React.Fragment>
            <SearchBar className={classes.searchBar} ref={srchBarRef} />
            <MenuDrawer/>
            <Box className={classes.rootBox} marginBottom={`${view.height}px`} paddingTop={`${view.paddingTop}px`} >
                <AlbumGrid albums={albums} />
            </Box>
            <PlaybackCtrlBar ref={ctrlBarRef} />
            {/* <Snackbar
                open={true}
                message={NetworkStore._serverState}
                autoHideDuration={5000}
            /> */}
            {Object.values(components)}
        </React.Fragment>
    );
};

export default MainView;
