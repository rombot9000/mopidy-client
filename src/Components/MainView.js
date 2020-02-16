import React from "react";

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import AlbumGrid from "Components/AlbumGrid";
import AlbumDetails from "Components/AlbumDetails";
import ScollableModal from "Components/ScrollableModal";
import PlaybackCtrlBar from "Components/PlaybackCtrlBar";
import SearchBar from "Components/SearchBar";
import MenuDrawer from "Components/MenuDrawer";

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


function MainView(props) {
    const classes = useStyles();

    /** 
     * State var for holding additional view components
     * @type {[ViewComponents, React.Dispatch<React.SetStateAction<ViewComponents>>]} 
     */
    const [components, setComponents] = React.useState({});
    
    /**
     * Add components to view
     * @param {ViewComponents} component 
     */
    function addComponent(component) {
        setComponents({...components, ...component});
    }

    /**
     * Remove componentes from view
     * @param {string} key 
     */
    function delComponent(key) {
        delete components[key];
        setComponents(components);
    }


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


    /**
     * @param {import('ViewModel/Album').Album} album 
     */
    function openDetailsModal(album) {
        function closeDetailsModal() {
            delComponent("detailsModal");
        }
        addComponent({
            "detailsModal": (
                <ScollableModal key="detailsModal" open onClose={closeDetailsModal}>
                    <AlbumDetails album={album}/>
                </ScollableModal>
            )
        });
    }


    const[showMenuDrawer, setShowMenuDrawer] = React.useState(false);
    /** Toggle menu drawer */
    function toggleSideMenu() {
        setShowMenuDrawer(!showMenuDrawer);
    }

    return (
        <React.Fragment>
            <SearchBar className={classes.searchBar} onMenuIconClick={toggleSideMenu} ref={srchBarRef}/>
            <MenuDrawer open={showMenuDrawer} onClose={toggleSideMenu}/>
            <Box 
                className={classes.rootBox}
                marginBottom={`${view.height}px`}
                paddingTop={`${view.paddingTop}px`}
            >
                <AlbumGrid
                    albums={props.albums}
                    onTileClick={openDetailsModal}
                />
            </Box>
            <PlaybackCtrlBar ref={ctrlBarRef}/>
            {Object.values(components)}
        </React.Fragment>
    );
};

export default MainView;
