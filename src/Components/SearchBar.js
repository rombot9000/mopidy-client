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
        flexGrow: 1,
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
    const [inputValue, setInputValue] = React.useState("")

    /**
     * Special key press handling
     * @param {KeyboardEvent} event 
     */
    function handleKeyDown(event) {
        if(event.key === "Escape") {
            event.preventDefault();
            setInputValue("");
            MopidyHandler.filterAlbums("");
        } else if(event.key === "Backspace") {
            // Is faster than onInput-Callback!
            event.preventDefault();
            setInputValue(inputValue.slice(0,-1));
            MopidyHandler.filterAlbums(inputValue.slice(0,-1));
        }
    }

    /**
     * Is slower than onKeyDown :-/
     * @param {InputEvent} event 
     */
    function handleInput(event) {
        event.preventDefault();
        MopidyHandler.filterAlbums(event.target.value);
        setInputValue(event.target.value);
    }
    
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
                    value={inputValue}
                    placeholder="Search for Albums or Artists..."
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                />
                <IconButton onClick={() => inputRef.current.focus()}>
                    <Search fontSize="inherit"/>
                </IconButton>
            </Paper>
        </Container>
    );
}

export default SearchBar;