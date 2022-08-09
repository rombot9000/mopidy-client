import React from "react";

import { Paper} from "@mui/material";
import { makeStyles } from "@mui/material";
import SquareImage from "./SquareImage";


const useStyles = makeStyles({
    cover: {
        position: "relative"
    },
    iconBox: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        opacity: "0.3"
    },
    icon: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        color: "white"
    }
});

/**
 * @param {Object} props
 * @param {string} props.src
 * @param {boolean} props.showButton
 * @param {JSX.Element} props.children
 */
const CoverButton = ({src, showButton, children}) => {
    const classes = useStyles();

    return (
        <SquareImage src={src} className={classes.cover} elevation={1}>
            { !showButton ? undefined :
                <React.Fragment>
                    <Paper className={classes.iconBox} elevation={0}/>
                    {React.cloneElement(children, {
                        className: classes.icon,
                        fontSize: "large" 
                    })}
                </React.Fragment>
            }
        </SquareImage>
    );
};

export default CoverButton;