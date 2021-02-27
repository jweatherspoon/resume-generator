import { v4 as uuidv4 } from 'uuid';

import ENUM_SOURCES from '../../enumerations/EnumSources';
import PROPERTY_TYPES from '../../PropertyTypes';

import { EnumProperty, NumberProperty } from '../../Property';

const createComponent = (name, type, properties, children, isTopLevel = false) => {
    const componentProperties = (properties && [...properties]) || [];
    if (isTopLevel) {
        // all top level components must have the region and order properties
        componentProperties.unshift(new EnumProperty(PROPERTY_TYPES.Region, null, ENUM_SOURCES.Regions));
        componentProperties.unshift(new NumberProperty(PROPERTY_TYPES.Order, 0));
    }

    return {
        componentId: uuidv4(),
        componentType: type,
        name,
        isTopLevel,
        properties: componentProperties,
        children: children?.flat(Infinity).map(c => c.componentId) || []
    };
};

export default createComponent;