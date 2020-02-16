import React from 'react';

import {makeStyles, Paper, IconButton, Input} from "@material-ui/core";
import {Search, Menu, Clear} from "@material-ui/icons";

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
const SearchBar = React.forwardRef((props, ref) => {

    const classes = useStyles();
    const inputRef = React.useRef(null);
    const [inputValue, setInputValue] = React.useState("")

    /**
     * Special key press handling
     * @param {KeyboardEvent} event 
     */
    function handleKeyDown(event) {
        if(event.key === "Escape") {
           clear(event);
        } else if(event.key === "Backspace") {
            // Is faster than onInput-Callback!
            // Problem: it does not handle selected text deletion...
            event.preventDefault();
            setInputValue(inputValue.slice(0,-1));
            MopidyHandler.filterAlbums(inputValue.slice(0,-1));
        }
    }

    /**
     * 
     * @param {MouseEvent|KeyboardEvent} event 
     */
    function clear(event) {
        event.preventDefault();
        setInputValue("");
        MopidyHandler.filterAlbums("");
    }

    /**
     * Is slower than onKeyDown :-/
     * @param {InputEvent} event 
     */
    function handleInput(event) {
        event.preventDefault();
        setInputValue(event.target.value);
        MopidyHandler.filterAlbums(event.target.value);
    }

    function rightHandButton() {
        if(inputValue === "") return (
            <IconButton onClick={() => inputRef.current.focus()}>
                <Search fontSize="inherit"/>
            </IconButton>
        )
        return (
            <IconButton onClick={clear}>
                <Clear fontSize="inherit"/>
            </IconButton>   
        )
    }
    
    return (
        <div className={props.className} ref={ref}>
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
                    disableUnderline
                    value={inputValue}
                    placeholder="Search for Albums or Artists..."
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                />
                {rightHandButton()}
            </Paper>
        </div>
    );
});

export default SearchBar;