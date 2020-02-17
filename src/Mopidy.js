import Mopidy from "mopidy";

const MPD_ARGS = {
    autoConnect: false
};
if(process.env.NODE_ENV !== "production") {
    MPD_ARGS.webSocketUrl = "ws://raspberrypi.fritz.box:8080/mopidy/ws/";
}

export default new Mopidy(MPD_ARGS);