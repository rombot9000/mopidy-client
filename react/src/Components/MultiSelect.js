import React from "react";

import { Select, Input, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useReadableString } from "Hooks";

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
    
    const classes = useStyles();

    // For the rare case that the selection holds values not included in the options array
    const filteredSelection = selection.filter(s => options.includes(s));
    //console.log(filteredSelection);
    
    // sort options
    const rSelection = [...filteredSelection].reverse()
    options.sort((a,b) => rSelection.indexOf(b)-rSelection.indexOf(a));

    // get readable options
    const readableOptions = useReadableString(options);
    //const readableValues = useReadableString(selection);

    //console.log(readableOptions, readableValues);

    return (
        <Select
            className={classes.select}
            multiple
            value={selection}
            onChange={event => onSelect(event.target.value)}
            input={<Input placeholder="Select sort keys..."/>}
        >
            {options.map( (key,i) =>
                <MenuItem key={key} value={key}>{readableOptions[i]}</MenuItem>
            )}
        </Select>
    );
};

export default Multiselect;