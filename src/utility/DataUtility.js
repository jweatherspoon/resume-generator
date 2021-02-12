export const mapObjectArrayByKey = (arr, keySelector, valueSelector) => {
    if (!arr) {
        return {};
    }

    // if keySelector wasn't specified, make it select whatever is passed in
    keySelector = keySelector || (k => k);

    // if valueSelector wasn't specified, make it select whatever is passed in
    valueSelector = valueSelector || (v => v);

    return Object.assign({}, ...arr.map(o => ({ [keySelector(o)]: valueSelector(o) })));
}

export const getRootAndAllChildComponents = (root, allComponents) => {
    const allChildren = [];

    if (root) {
        const queue = [root];
        while (queue.length > 0) {
            const node = queue.shift();
            allChildren.push(node);

            // push any children onto the queue to be processed
            if (node.children) {
                for (let childId of node.children) {
                    if (allComponents[childId]) {
                        queue.push(allComponents[childId]);
                    }
                }
            }
        }
    }

    return allChildren;
}

export const sortObjectArrayByKey = (arr, propertySelector) => arr?.sort((a, b) => {
    const aUpper = propertySelector(a)?.toUpperCase();
    const bUpper = propertySelector(b)?.toUpperCase();
    if (aUpper && bUpper) {
        if (aUpper < bUpper) {
            return -1;
        }
        else if (aUpper > bUpper) {
            return 1;
        }
    }

    // not totally accurate sort, but good enough for now lol rip
    return 0;
})