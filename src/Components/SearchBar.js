import React from 'react';

import {makeStyles, Paper, IconButton, Input} from "@material-ui/core";
import {Search, Menu, Clear} from "@material-ui/icons";

import { ViewActions }  from 'Actions';

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
 *  * @param {function} onInput
 */
const SearchBar = ({onInput}) => {

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
        }
    }

    /**
     * 
     * @param {MouseEvent|KeyboardEvent} event 
     */
    function clear(event) {
        event.preventDefault();
        setInputValue("");
        onInput("");
    }

    /**
     * Is slower than onKeyDown :-/
     * @param {InputEvent} event 
     */
    function handleInput(event) {
        event.preventDefault();
        setInputValue(event.target.value);
        onInput(event.target.value);
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
        <Paper
            className={classes.paper}
            elevation={4}
        >
            <IconButton onClick={ViewActions.toggleMenuDrawer}>
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
    );
};

export default SearchBar;