import React from "react";

import { Select, Input, MenuItem, Chip } from "@material-ui/core";


/**
 * @callback SelectCallback
 * @param {MouseEvent}
 * @returns {void} 
 */

/**
 * @param {Object} props
 * @param {string[]} props.options
 * @param {string[]} props.selection
 * @param {SelectCallback} props.onSelect
 */
export default ({options, selection, onSelect}) => {
    return (
    <Select
        multiple
        value={selection}
        onChange={onSelect}
        input={<Input/>}
        renderValue={selection => (
            <div>
                {selection.map((key, i) => (
                <Chip key={i} label={`${i+1}. ${key}`} />
                ))}
            </div>
        )}
    >
        {options.map(key => (
            <MenuItem key={key} value={key}>{key}</MenuItem>
        ))}
    </Select>
)};