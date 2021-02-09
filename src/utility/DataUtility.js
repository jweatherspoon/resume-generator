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
        const stack = [root];
        console.log(stack);
        while (stack.length > 0) {
            const node = stack.pop();
            allChildren.push(node);

            // push any children onto the stack to be processed
            if (node.children) {
                for (let childId of node.children) {
                    if (allComponents[childId]) {
                        stack.push(allComponents[childId]);
                    }
                }
            }
        }
    }

    return allChildren;
}