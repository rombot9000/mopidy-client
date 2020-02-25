import Dispatcher from "Dispatcher";

import { Tracklist } from "MopidyAPI";

export const TRACKLIST_ACTIONS = {
    INIT: "tracklistActions.Init",
    FETCH: "tracklistActions.Fetch",
    SET: "tracklistActions.Set",
}

/**
 * 
 * @param {import("ViewModel/Track").Track[]} tracks 
 */
export async function set(tracks) {
    await Tracklist.set(tracks);
    Dispatcher.dispatch({
        type: TRACKLIST_ACTIONS.SET,
    });
};


export async function init() {
};

export async function fetch() {
    Dispatcher.dispatch({
        type: TRACKLIST_ACTIONS.FETCH,
        tracks: await Tracklist.fetch()
    });
};