import React from 'react';

import {makeStyles, Container, Paper, IconButton, Input} from "@material-ui/core";
import {Search, Menu} from "@material-ui/icons";

import MopidyHandler from "MopidyHandler/MopidyHandler";

const useStyles = makeStyles(theme => ({
    paper: {
        display: "flex",
        alignItems: "center"
    },
    input: {
        flex: 1,
        width: "80vw"
    }
}));

/**
 * 
 * @param {Object} props
 * @param {function} props.onMenuIconClick
 * @param {string} props.className 
 */
function SearchBar(props) {

    const classes = useStyles();
    const inputRef = React.useRef(null);
    
    return (
        <Container
            disableGutters={true}
            className={props.className}
        >
            <Paper
                className={classes.paper}
                elevation={4}
            >
                <IconButton onClick={props.onMenuIconClick}>
                    <Menu fontSize="inherit"/>
                </IconButton>
                <Input 
                    className={classes.input}
                    inputRef={inputRef}
                    disableUnderline={true}
                    onInput={e => MopidyHandler.filterAlbums(e.target.value)}
                    placeholder="Search for Albums or Artists..."
                />
                <IconButton onClick={() => inputRef.current.focus()}>
                    <Search fontSize="inherit"/>
                </IconButton>
            </Paper>
        </Container>
    );
}

export default SearchBar;