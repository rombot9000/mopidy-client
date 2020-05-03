import React from "react";

import { Paper, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from "@material-ui/core";

/**
 * @param {Object} props
 * @param {{text: string, input: JSX.Element}[]} props.options
 * @param {{text: string, value: string|number}[]} props.states
 */
export default ({options, states}) =>  (
    <Paper>
        <List>
            {options.map((option,key) => (
                <ListItem key={key}>
                    <ListItemText>{option.text}</ListItemText>
                    <ListItemSecondaryAction>{option.input}</ListItemSecondaryAction>
                </ListItem>
            ))}
            <Divider/>
            {states.map((state,key) => (
                <ListItem key={key}>
                    <ListItemText>{state.text}: {state.value}</ListItemText>
                </ListItem>
            ))}
        </List>
    </Paper>
);