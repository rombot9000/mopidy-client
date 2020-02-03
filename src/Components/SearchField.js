import React from 'react';

import {Input, Grow, Grid} from "@material-ui/core";
import {Search} from "@material-ui/icons";

import MopidyHandler from "MopidyHandler/MopidyHandler";


function SearchField(props) {

    const [inputXs, setXs] = React.useState(1);
    const inputRef = React.useRef(null);
    
    return (
        <Grid
            container
            spacing={1}
            wrap="nowrap"
            justify="flex-end"
            alignItems="center"
        >
            <Grid item>
                <Search 
                    onClick={() => inputRef.current.focus()}
                />
            </Grid>
            <Grid item xs={inputXs}>
                <Input
                    inputRef={inputRef}
                    disableUnderline={true}
                    onInput={e => MopidyHandler.filterAlbums(e.target.value)}
                    onFocus={() => setXs(12)}
                    onBlur={() => setXs(1)}
                />
            </Grid>
        </Grid>
    );
}

export default SearchField;