import React from "react";

import { Select, Input, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    select: {
        maxWidth: "100%"
    }
}));

/**
 * @callback SelectCallback
 * @param {string[]} Selection
 * @returns {void} 
 */

/**
 * @param {Object} props
 * @param {string[]} props.options
 * @param {string[]} props.selection
 * @param {SelectCallback} props.onSelect
 */
const Multiselect = ({options, selection, onSelect}) => {
    const rSelection = [...selection].reverse();
    const classes = useStyles();

    return (
        <Select
            className={classes.select}
            multiple
            value={selection}
            onChange={event => onSelect(event.target.value)}
            input={<Input placeholder="Select sort keys..."/>}
        >
            {options.sort((a,b) => rSelection.indexOf(b)-rSelection.indexOf(a)).map(key => (
                <MenuItem key={key} value={key}>
                    {selection.includes(key) ? `${selection.indexOf(key) + 1}. ${key}` : key}
                </MenuItem>
            ))}
        </Select>
    );
};

export default Multiselect;