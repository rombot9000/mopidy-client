import { createSelector } from "reselect";

export default createSelector(
    [
        (state) => state.library.tracks,
        (_, album) => album
    ],
    /**
     * @param {import("Reducers/LibraryReducer").StoredTrack[]} storedTracks
     * @param {import("Reducers/LibraryReducer").StoredAlbum} album
     */
    (storedTracks, album) => {
        return album.track_uris.map(uri => storedTracks.find(t => t.uri === uri)).sort((a,b) => {
            if(a.disc_no === b.disc_no) return a.track_no > b.track_no ? 1 : -1;
            return a.disc_no > b.disc_no ? 1 : -1;
        })
    }
);