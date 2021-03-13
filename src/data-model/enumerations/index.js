const getEnumOptions = (enumSourceId, enumSources) => {
    // return enum source options 
    if (enumSourceId === null) {
        return Object.entries(enumSources).map((([enumSourceId, enumSourceDefinition]) => ({
            id: enumSourceId,
            ...enumSourceDefinition,
        })));
    }

    const sourceDefinition = enumSources[enumSourceId];
    if (sourceDefinition) {
        if (sourceDefinition.isStatic) {
            return sourceDefinition.options || [];
        }
        else {
            // TODO: Implement code-genned dynamic map and implement here 
        }
    }

    // unknown enum source
    return [];
}

export default getEnumOptions;