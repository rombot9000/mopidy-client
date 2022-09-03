import React from "react";

const getReadableString = (s) => {
    const formatedString = s.replace("_", " ").split(/(?=[A-Z0-9])/).join(" ");
    return formatedString.charAt(0).toUpperCase() + formatedString.slice(1).toLocaleLowerCase()
}

/**
 * inserts whitespaces into camel and snake case strings and capitalizes only first letter
 * @param {string|string[]} caseString
 * @returns {string|string[]} A readable string with whitespaces separating words
 */
const useReadableString = (caseString) => {

    const [rdblString, setRdblString] = React.useState(caseString);

    React.useEffect(() => {
        if(caseString == null) {
            setRdblString(caseString);
        } else if(Array.isArray(caseString)) {
            setRdblString(caseString.map(s => getReadableString(s)));
        } else {
            setRdblString(getReadableString(caseString));
        }
        return () => {};
    }, [caseString]);

    return rdblString;
};

export default useReadableString;