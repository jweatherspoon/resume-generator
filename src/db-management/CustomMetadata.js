import { MongoClient } from "mongodb";
import { Initializer, readAndInitialize } from "./MongoReader";

const customMetadataDbName = "RESUME_GENERATOR_CUSTOM_METADATA";

const initializers = [
    new Initializer("themes", "themeId", { id: "default", value: {

    }}),
    new Initializer("shells", "shellId", { id: "default", value: {

    }})
];

const getCustomMetadata = async (connectionString) => {
    const client = new MongoClient(connectionString);
    return await readAndInitialize(client, customMetadataDbName, initializers);
}

export default getCustomMetadata;