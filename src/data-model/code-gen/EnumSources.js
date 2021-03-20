import RegionsEnumerationSource from "../enumerations/RegionsEnumerationSource"
import ColorsEnumerationSource from "../enumerations/ColorsEnumerationSource"
import ResumeShellsEnumerationSource from "../enumerations/ResumeShellsEnumerationSource"

const ENUM_SOURCES = {
    "Icons": "9298908a-df0f-4931-8e31-8f73097780af",
    "DataTypes": "e1220ef7-bff3-4d3d-828c-6752343241f2",
    "Regions": "e7c4e9fa-5d4d-4e6a-953b-5f6a7d1ae555",
    "Logos": "b3c0e4f0-e97c-44d2-9851-62baab179c94",
    "Colors": "9dbaacf2-f91e-4d06-a633-7a851e8e62f6",
    "ResumeShells": "14b8248f-3bab-49c9-a0c9-7867ffa230f6"
};

export const DYNAMIC_ENUM_SOURCE_MAP = {
    "e7c4e9fa-5d4d-4e6a-953b-5f6a7d1ae555": new RegionsEnumerationSource(),
    "9dbaacf2-f91e-4d06-a633-7a851e8e62f6": new ColorsEnumerationSource(),
    "14b8248f-3bab-49c9-a0c9-7867ffa230f6": new ResumeShellsEnumerationSource(),
};

export const getEnumOptions = (enumSourceId, enumSources) => {
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
            const dynamicEnumSource = DYNAMIC_ENUM_SOURCE_MAP[enumSourceId];
            if (dynamicEnumSource?.getEnumOptions) {
                return dynamicEnumSource.getEnumOptions();
            }
        }
    }

    // unknown enum source
    return [];
}

export default ENUM_SOURCES;