import Dispatcher from "Dispatcher";

import { Tracklist } from "MopidyAPI";

export const TRACKLIST_ACTIONS = {
    INIT: "tracklistActions.Init",
    UPDATE: "tracklistActions.Update",
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
    Dispatcher.dispatch({
        type: TRACKLIST_ACTIONS.INIT,
        tracks: await Tracklist.fetch()
    });
};

export async function update() {
    Dispatcher.dispatch({
        type: TRACKLIST_ACTIONS.UPDATE,
        tracks: await Tracklist.fetch()
    });
};