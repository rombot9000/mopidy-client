import React from "react";

import { FixedSizeList, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { makeStyles } from "@material-ui/core/styles";

import TracklistItem from "./TracklistItem";

import { PlaybackActions } from "Actions";
import { PlaybackStore } from "Stores";

const useStyles = makeStyles(theme => ({
    list: {
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
            display: "none"
        },
        "-msOverflowStyle": "none",
    }
}));

/**
 * @param {Object} props
 * @param {import("ViewModel/Track").Track[]} props.tracks 
 * @param {"full"|"auto"} props.height 
 */
function Tracklist(props) {
    //const [tracks, ...containerProps] = props

    const classes = useStyles();

    const [playbackInfo, setPlaybackInfo] = React.useState({
        state: PlaybackStore.state,
        track: PlaybackStore.track
    });
    React.useEffect(() => {

        const handlePlaybackUpdate = () => {
            setPlaybackInfo({
                state: PlaybackStore.state,
                track: PlaybackStore.track
            });
        };
        PlaybackStore.on("update", handlePlaybackUpdate);

        // return clean up method
        return () => {
            PlaybackStore.removeListener("update", handlePlaybackUpdate);
        }
        
    }, []); // prevents call on each render

    /**
     * @param {import("ViewModel/Track").Track} track 
     */
    function handleClick(track) {
        if(track._uri === playbackInfo.track._uri) {
            PlaybackActions.toggle();
        } else {
            PlaybackActions.play(track, props.tracks);
        }
    }

    /**
     * 
     * @param {number} index 
     * @param {string} style 
     */
    const renderListItem = React.memo((props) => {
        return (
            <TracklistItem
                key={props.index}
                style={props.style}
                track={props.data[props.index]}
                playbackState={props.data[props.index]._uri === playbackInfo.track._uri ? playbackInfo.state : "stopped"}
                onClick={() => {handleClick(props.data[props.index])}}
            />
        );
    }, areEqual);

    const itemHeight = 35;
    const itemCount = props.tracks.length

    return (
        <AutoSizer
            disableHeight={props.height !== "auto"}
            defaultHeight={itemCount ? itemHeight*itemCount : 0}
        >{({height,width}) => (
            <FixedSizeList
                className={classes.list}
                height={height ? height : itemHeight*itemCount}
                width={width}
                itemData={props.tracks}
                itemCount={itemCount}
                itemSize={itemHeight}
                overscanCount={10}
                >
                    {renderListItem}
            </FixedSizeList>
        )}</AutoSizer>
    );
}

export default Tracklist;