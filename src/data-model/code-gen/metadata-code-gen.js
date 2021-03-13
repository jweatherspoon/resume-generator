const fs = require("fs");

const DATA_MODEL_PATH = process.argv[2];
const METADATA_PATH = `${DATA_MODEL_PATH}/metadata.json`;
const CODE_GEN_PATH = `${DATA_MODEL_PATH}/code-gen/`;

const nameKeyRegex = /\s/g;

const mapTypesByKey = (typeDefinitions, keySelector, valueSelector, filter) => {
    keySelector = keySelector || ((typeId, typeDef) => typeId);
    valueSelector = valueSelector || ((typeId, typeDef) => typeId);
    filter = filter || ((typeDef) => true);

    const convertedMap = {};
    for (let [typeId, typeDefinition] of Object.entries(typeDefinitions)) {
        if (filter(typeDefinition)) {
            const selectedValue = keySelector(typeId, typeDefinition);
            if (!selectedValue) {
                throw `
============================================================================================================
================ ERROR: Failed key selection for type ${typeId}! ================
============================================================================================================`
            }

            const nameKey = keySelector(typeId, typeDefinition).replace(nameKeyRegex, "");
            convertedMap[nameKey] = valueSelector(typeId, typeDefinition);
        }
    }

    return convertedMap;
}

const mapTypesByName = (typeDefinitions) => {
    return mapTypesByKey(typeDefinitions, (typeId, typeDef) => typeDef.name)
}

const convertToCodeFile = (fileName, exportName, values) => {
    const fileContents = `const ${exportName} = ${JSON.stringify(values, null, 4)};

export default ${exportName};`;

    const filePath = `${CODE_GEN_PATH}/${fileName}`;
    fs.writeFile(filePath, fileContents, (err) => err && console.error(err));
}

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
            /*const dynamicEnumSource = DYNAMIC_ENUM_SOURCE_MAP[enumSourceId];
            if (dynamicEnumSource?.getEnumOptions) {
                return dynamicEnumSource.getEnumOptions();
            }*/
        }
    }

    // unknown enum source
    return [];
}

const convertEnumSourcesToCodeFile = (fileName, enumSources) => {
    const mainExportValues = mapTypesByName(enumSources);
    const dynamicEnumTypes = Object.entries(enumSources).filter(([enumSourceId, enumDefinition]) => !enumDefinition.isStatic);

    // create an import for each 
    const imports = dynamicEnumTypes.map(([enumSourceId, enumDefinition]) => `import ${enumDefinition.importName} from "../enumerations/${enumDefinition.importName}"`);
    const dynamicExportValues = mapTypesByKey(enumSources, (typeId, typeDef) => `"${typeId}"`, (typeId, typeDef) => typeDef.importName, (typeDef) => !typeDef.isStatic);

    const getJSObjectAsLines = (obj, spacing) => {
        const spaces = [];
        for (let i = 0; i < spacing ; i++) spaces.push(" ");
        
        const lines = ["{"];
        for (let [key, value] of Object.entries(obj)) {
            lines.push([
                ...spaces,
                `${key}: new ${value}(),`,
            ].join(""));
        }

        lines.push("}");
        return lines;
    }

    const multilineCommentRegex = /(\/\*|\*\/)/g
    const fileLines = [
        ...imports,
        "",
        `const ENUM_SOURCES = ${JSON.stringify(mainExportValues, null, 4)};`,
        "",
        `export const DYNAMIC_ENUM_SOURCE_MAP = ${getJSObjectAsLines(dynamicExportValues, 4).join("\n")};`,
        "",
        `export const getEnumOptions = ${getEnumOptions.toString().replace(multilineCommentRegex, "")}`,
        "",
        "export default ENUM_SOURCES;"   
    ];

    const filePath = `${CODE_GEN_PATH}/${fileName}`;
    fs.writeFile(filePath, fileLines.join("\n"), (err) => err && console.error(err));
}

fs.readFile(METADATA_PATH, (err, data) => {
    if (err) {
        throw err;
    }

    const metadata = JSON.parse(data);
    
    // convert propertyTypes to PropertyTypes.js
    const propertyTypes = mapTypesByName(metadata.propertyTypes);
    convertToCodeFile("PropertyTypes.js", "PROPERTY_TYPES", propertyTypes);
    
    // convert componentTypes to ComponentTypes.js
    const componentTypes = mapTypesByName(metadata.componentTypes);
    convertToCodeFile("ComponentTypes.js", "COMPONENT_TYPES", componentTypes);

    // convert enumSources to EnumSources.js
    convertEnumSourcesToCodeFile("EnumSources.js", metadata.enumSources);
});