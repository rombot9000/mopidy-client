import React from "react";

import { Paper, MenuList, MenuItem, FormControl, InputLabel, NativeSelect } from "@material-ui/core";

import { Album } from "ViewModel";

import { LibraryActions } from "Actions";
import { LibraryStore } from "Stores";

export default function SettingsMenu() {

    const [albumSortKey, setAlbumSortKey] = React.useState(LibraryStore.albumSortKey);

    return (
        <Paper>
            <MenuList>
                <MenuItem button={false}>
                    <FormControl>
                        <InputLabel>Sort albums by</InputLabel>
                        <NativeSelect
                            value={albumSortKey}
                            onInput={(event) => {
                                event.preventDefault();
                                LibraryActions.sortAlbums(event.target.value);
                                setAlbumSortKey(event.target.value);
                            }}
                        >
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