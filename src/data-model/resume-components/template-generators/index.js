import { v4 as uuidv4 } from 'uuid';

const createComponent = (type, properties, children, isTopLevel = false) => ({
        componentId: uuidv4(),
        componentType: type,
        isTopLevel,
        region: null,
        properties: properties || [],
        children: children?.flat(Infinity).map(c => c.componentId) || []
});

export default createComponent;