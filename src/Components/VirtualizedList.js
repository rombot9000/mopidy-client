import React from "react";

import { FixedSizeList, areEqual } from "react-window";

/**
 * @callback ItemRenderFunction
 * @param {number} index
 * @param {string} style
 * @param {Object[]} data
 */

/**
 * @param {Object} props
 * @param {Object[]} props.itemData
 * @param {number} props.itemHeight
 * @param {JSX.Element} props.item
 */
const VirtualizedList = ({width, height, itemData, itemHeight, item, ...listProps}) => {

    const renderFunction = ({index, style, data}) => (
        <item
            key={index}
            style={style}
            data={data[index]}
            // onClick={() => {onTrackClick(data[index], data, data[index]._uri === playbackTrack._uri)}}
        />
    );

    return (
        <FixedSizeList
            {...listProps}
            height={height ? height : itemHeight*itemData.length}
            width={width}
            itemData={itemData}
            itemCount={itemData.length}
            itemSize={itemHeight}
            overscanCount={10}
        >
            {React.memo(renderFunction, areEqual)}
        </FixedSizeList>
    );   
}

export default VirtualizedList;