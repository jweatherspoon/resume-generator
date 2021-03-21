const fs = require("fs");

const DATA_MODEL_PATH = process.argv[2];
const METADATA_PATH = `${DATA_MODEL_PATH}/metadata.json`;
const CODE_GEN_PATH = `${DATA_MODEL_PATH}/code-gen/`;
const CODE_GEN_STATIC_ENUMS_PATH = `${DATA_MODEL_PATH}/code-gen/enumerations/`;
const VIEW_COMPONENTS_PATH = `${DATA_MODEL_PATH}/../view-components/`;
const RESUME_COMPONENTS_PATH = `${VIEW_COMPONENTS_PATH}/resume-components/`;

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

const getSpacing = (spacing) => {
    const spaces = [];
    for (let i = 0; i < spacing; i++) spaces.push(" ");
    return spaces;
}

const convertEnumSourcesToCodeFile = (fileName, enumSources) => {
    const mainExportValues = mapTypesByName(enumSources);
    const dynamicEnumTypes = Object.entries(enumSources).filter(([enumSourceId, enumDefinition]) => !enumDefinition.isStatic);

    // create an import for each 
    const imports = dynamicEnumTypes.map(([enumSourceId, enumDefinition]) => `import ${enumDefinition.importName} from "../enumerations/${enumDefinition.importName}"`);
    const dynamicExportValues = mapTypesByKey(enumSources, (typeId, typeDef) => `"${typeId}"`, (typeId, typeDef) => typeDef.importName, (typeDef) => !typeDef.isStatic);

    const getJSObjectAsLines = (obj, spacing) => {
        const spaces = getSpacing(spacing);
        
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

    // write out all the static sources to the enumerations folder
    convertStaticEnumSourcesToCodeFiles(enumSources, 4);
}

const convertStaticEnumSourcesToCodeFiles = (enumSources, spacing) => {
    const spaces = getSpacing(spacing);
    const staticSources = Object.entries(enumSources).filter(([enumSourceId, enumSourceDefinition]) => enumSourceDefinition.isStatic && enumSourceDefinition.exportName);
    for (let [enumSourceId, staticSourceDefinition] of staticSources) {
        const filePath = `${CODE_GEN_STATIC_ENUMS_PATH}/${staticSourceDefinition.name}.js`;
        
        // { name: string, options: string[], isStatic: bool, importName: string, exportName: string }
        const fileLines = [
            `const ${staticSourceDefinition.exportName} = {`,
            ...staticSourceDefinition.options.map(option => `${spaces.join("")}${option.replace(nameKeyRegex)}: "${option}",`),
            "};",
            "",
            `export default ${staticSourceDefinition.exportName};`
        ]

        const fileContents = fileLines.join("\n");
        fs.writeFile(filePath, fileContents, (err) => err && console.log(err));
    }
}

const generateComponentFactoryFromTemplates = (fileName, componentTemplates, componentTypes, componentTypesExportName) => {
    const spacing = getSpacing(4);
    const spaces = spacing.join("");

    const typesWithTemplates = Object.entries(componentTemplates)
                                     .filter(([componentType, templateDef]) => templateDef.isExported)
                                     .map(([componentType, templateDef]) => componentTypes[componentType]);

    const componentNames = typesWithTemplates.map(typeDef => typeDef.name.replace(nameKeyRegex, ""));
    const importLines = componentNames.map(name => `import ${name} from "./${name}";`);
    const mappingLines = componentNames.map(name => `${spaces}[COMPONENT_TYPES.${name}]: (props) => (<${name} {...props} />),`);
    const fileLines = [
        `import ${componentTypesExportName} from "../../data-model/code-gen/ComponentTypes";`,
        ...importLines,
        "",
        "const RESUME_COMPONENT_MAP = {",
        ...mappingLines,
        "};",
        "",
        "const ResumeComponentFactory = (props) => {",
        `${spaces}const componentGenerator = RESUME_COMPONENT_MAP[props.componentType];`,
        `${spaces}return componentGenerator && componentGenerator(props);`,
        "}",
        "",
        "export default ResumeComponentFactory;"
    ];

    const filePath = `${RESUME_COMPONENTS_PATH}/${fileName}`;
    fs.writeFile(filePath, fileLines.join("\n"), (err) => err && console.log(err));
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
    const componentTypesExportName = "COMPONENT_TYPES";
    convertToCodeFile("ComponentTypes.js", componentTypesExportName, componentTypes);

    // convert enumSources to EnumSources.js
    convertEnumSourcesToCodeFile("EnumSources.js", metadata.enumSources);

    // code-gen the ResumeComponentFactory.js in view-components 
    generateComponentFactoryFromTemplates("ResumeComponentFactory.jsx", metadata.componentTemplates, metadata.componentTypes, componentTypesExportName);
});