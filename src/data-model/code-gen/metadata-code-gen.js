const fs = require("fs");

const DATA_MODEL_PATH = process.argv[2];
const METADATA_PATH = `${DATA_MODEL_PATH}/metadata.json`;
const CODE_GEN_PATH = `${DATA_MODEL_PATH}/code-gen/`;

const mapTypesByName = (typeDefinitions) => {
    const convertedMap = {};
    for (let [typeId, typeDefinition] of Object.entries(typeDefinitions)) {
        const nameKey = typeDefinition.name.replace(/\s/g, "");
        convertedMap[nameKey] = typeId;
    }

    return convertedMap;
}

const convertToCodeFile = (fileName, exportName, values) => {
    const fileContents = `const ${exportName} = ${JSON.stringify(values, null, 4)};

export default ${exportName};`;

    const filePath = `${CODE_GEN_PATH}/${fileName}`;
    fs.writeFile(filePath, fileContents, (err) => err && console.error(err));
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
});