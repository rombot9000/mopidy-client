import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Select, Input, MenuItem, Chip } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    chip: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
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
export default ({options, selection, onSelect}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div>
                {selection.map((item, i) => (
                    <Chip
                        key={i}
                        className={classes.chip}
                        label={`${i+1}. ${item}`}
                        onDelete={(event) => {
                            event.preventDefault();
                            selection.splice(i,1);
                            onSelect([...selection]);
                        }}
                    />
                ))}
            </div>
            <Select
                multiple
                value={selection}
                onChange={event => onSelect(event.target.value)}
                input={<Input placeholder="Select sort keys..."/>}
            >
                {options.filter(o => !selection.includes(o)).map(key => (
                    <MenuItem key={key} value={key}>{key}</MenuItem>
                ))}
            </Select>
        </React.Fragment>
    )
};