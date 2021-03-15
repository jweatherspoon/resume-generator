/**
 * Get a list of collection names from the passed in db 
 * @param {Db} db - The mongo Db instance
 * @returns A list of collection names 
 */
const getCollectionNames = async (db) => {
    const collectionNames = [];
    const collections = await db.collections();
    for (let collection of collections) {
        collectionNames.push(collection.s.namespace.collection);
    }

    return collectionNames;
}

/**
 * Create a database initializer
 * @param {string} key - The collection to initialize
 * @param {string} index - The collection's index
 * @param {object} initialState - The initial state 
 * @returns an initializer object
 */
export const Initializer = (key, index, { id, value}) => ({
    key: key,
    index: index,
    initialState: {
        id: id,
        value: value
    }
});

/**
 * Initialize a database and return the initialized data 
 * @param {MongoClient} client - The MongoClient instance
 * @param {string} dbName - The name of the db to read / initialize
 * @param {array} initializers - An array of Initializer objects
 * @returns The initialized database data
 */
export const readAndInitialize = async (client, dbName, initializers) => {
    try {
        await client.connect();
        const dbInstance = await client.db(dbName);

        const readData = {};
        const collectionNames = await getCollectionNames(dbInstance);
        for (let initializer of initializers) {
            let collection;
            if (!collectionNames.find(c => c === initializer.key)) {
                const initialState = await initializer.getInitialState();
                collection = await dbInstance.createCollection(initializer.key);

                const filter = { [initializer.index]: initialState.id };
                const options = { upsert: true };
                const updateDoc = {
                    $set: { [initialState.id]: initialState }
                };

                await collection.updateOne(filter, updateDoc, options);
            }

            collection = collection || await dbInstance.collection(initializer.key);
            readData[initializer.key] = await collection.find().toArray();
        }

        return readData;
    }
    catch (err) {
        console.error(err);
    }
    finally {
        await client.close();
    }

    return {};
}