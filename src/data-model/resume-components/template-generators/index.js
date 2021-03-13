import { v4 as uuidv4 } from 'uuid';

const createComponent = (name, type, properties, children, isTopLevel = false) => {
    return {
        componentId: uuidv4(),
        componentType: type,
        name, // TODO: Remove this and pull it from metadata
        isTopLevel,
        properties: properties || [],
        children: children || []
    };
};

export default createComponent;