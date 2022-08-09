import React from "react";

import { Paper, List, ListItem, ListItemText, Divider, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    container:{
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: "100%"
    },
    text: {
        paddingRight: theme.spacing(1),
    }
}));

/**
 * @param {Object} props
 * @param {{text: string, input: JSX.Element}[]} props.options
 * @param {{text: string, value: string|number}[]} props.states
 */
const SettingsMenu = ({options, states}) =>  {
    const classes = useStyles();
    
    return (
        <Paper>
            <List>
                {options.map((option,key) => (
                    <Box display="flex"
                        key={key}
                        className={classes.container}
                        direction="row"
                        justify="space-between"
                        alignItems="baseline"
                    >
                        <Box align="left" flexShrink={0} className={classes.text}>
                            <Typography>{option.text}</Typography>
                        </Box>
                        <Box align="right" flexGrow={1} overflow="hidden">
                            {option.input}
                        </Box>
                    </Box>
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
}

export default SettingsMenu;