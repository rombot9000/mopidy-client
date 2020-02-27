import React from "react";

import { Paper, MenuList, MenuItem, FormControl, InputLabel, NativeSelect } from "@material-ui/core";

import { Album } from "ViewModel";

import { LibraryActions } from "Actions";

export default function SettingsMenu() {

    
    return (
        <Paper>
            <MenuList>
                <MenuItem button={false}>
                    <FormControl>
                        <InputLabel>Sort albums by</InputLabel>
                        <NativeSelect onInput={(event) => { LibraryActions.sortAlbums(event.target.value) }}>
                            {Object.keys(Album(null)).map(key => (
                                <option value={key}>{key}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}