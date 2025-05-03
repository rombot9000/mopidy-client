import { createSelector } from "reselect";

export default createSelector(
    [
        (state) => state.library.albums,
        (_, album_uri) => album_uri
    ],
    /**
     * @param {import("Reducers/LibraryReducer").StoredAlbum[]} storedAlbums
     * @param {string} album_uri
     */
    (storedAlbums, album_uri) => {
        const album = storedAlbums.find(a => a.uri === album_uri);
        if(album) return album.cover_uri;
        return "";
    }
);