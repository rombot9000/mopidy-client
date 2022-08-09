import React from "react";

import { VariableSizeList, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { makeStyles } from "@mui/styles";

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
 * @param {"full"|"auto"} props.autoSizerProps
 */
const VirtualizedVarSizedList = ({itemData, itemHeight, itemRenderFunction, ...autoSizerProps}) => {

    const classes = useStyles();

    const getItemSize = index => {
        return itemHeight;
    };

    return (
        <AutoSizer
            {...autoSizerProps}
            defaultHeight={itemData.length ? itemHeight*itemData.length : 0}
        >{({width,height}) => (
            <VariableSizeList
                className={classes.list}
                height={height ? height : itemHeight*itemData.length}
                width={width}
                itemData={itemData}
                itemCount={itemData.length}
                itemSize={getItemSize}
                overscanCount={10}
            >
                {React.memo(itemRenderFunction, areEqual)}
            </VariableSizeList>
        )}</AutoSizer>
    );
}

export default VirtualizedVarSizedList;