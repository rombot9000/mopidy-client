import styled from "@emotion/styled";

/**
 * 
 * @param {import("react").ReactElement} element 
 * @returns 
 */
const styledNoTextSelection = (element) => styled(element)`
    -moz-user-select: none; /* firefox */
    -webkit-user-select:none; /* Safari */
    -ms-user-select: none; /* IE*/
    user-select: none; /* Standard syntax */
`;

export default styledNoTextSelection;