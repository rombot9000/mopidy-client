import React from "react";

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import { AlbumGrid, AlbumDetails, ScrollableModal, PlaybackCtrlBar, SearchBar, MenuDrawer, SettingsMenu, MsgSnackBar } from "Components"; 
import { ViewStore } from "Stores";

/** 
 * @typedef {Object.<string, JSX.Element>} ViewComponents
 */

const useStyles = makeStyles(theme => ({
    viewBox: {
        position: "absolute",
        top: 0,
        width: "100%",
    },
    scrollBox: {
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        overflowX: "hidden"
    },
    searchBar: {
        zIndex: 1100,
        position: "fixed",
        width: "100%",
        maxWidth: theme.spacing(64),
        padding: theme.spacing(1,1,0,1),//top-right-bottom-left
        left: "50%",
        transform: "translate(-50%,0)",
    },
    snackBar: {
        position: "absolute",
        bottom: theme.spacing(1),
    },
}));


export default function MainView() {
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
            ViewStore.removeListener("openAlbumDetailsModal", openAlbumDetailsModal);
            ViewStore.removeListener("openSettingsModal", openSettingsModal);
        };
    }, [])

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
            <Box className={classes.viewBox} bottom={`${view.height}px`}>
                <Box className={classes.scrollBox} paddingTop={`${view.paddingTop}px`}>
                    <AlbumGrid/>
                </Box>
                <MsgSnackBar className={classes.snackBar}/>
            </Box>
            <PlaybackCtrlBar ref={ctrlBarRef} />
            {Object.values(components)}
        </React.Fragment>
    );
};