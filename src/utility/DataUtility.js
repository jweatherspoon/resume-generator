export const mapObjectArrayByKey = (arr, keySelector, valueSelector) => {
    if (!arr) {
        return null;
    }

    // if keySelector wasn't specified, make it select whatever is passed in
    keySelector = keySelector || (k => k);

    // if valueSelector wasn't specified, make it select whatever is passed in
    valueSelector = valueSelector || (v => v);

    return Object.assign({}, ...arr.map(o => ({ [keySelector(o)]: valueSelector(o) })));
}