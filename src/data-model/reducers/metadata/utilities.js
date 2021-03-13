import { v4 as uuidv4 } from "uuid";

export const getUniqueTypeId = (existingTypes) => {
    let typeId = uuidv4();
    while (existingTypes.some(eType => eType === typeId)) {
        typeId = uuidv4();
    }

    return typeId;
}