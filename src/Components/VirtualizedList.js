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
 * @param {ItemRenderFunction} props.itemRenderFunction
 */
export default ({width, height, itemData, itemHeight, itemRenderFunction, ...listProps}) => {

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
            {React.memo(itemRenderFunction, areEqual)}
        </FixedSizeList>
    );
    
}