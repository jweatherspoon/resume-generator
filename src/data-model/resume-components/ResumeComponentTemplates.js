import createComponent from "./template-generators";
import { createPropertyOfType } from "../Property";

/**
 * Create a component and its children from its data template
 * @param {COMPONENT_TYPES} componentType - The component type to create
 * @param {object} propertyTypes - property type definitions
 * @param {object} componentTypes - Component type definitions
 * @param {object} componentTemplates - Component template definitions
 * @returns A list of created component objects based on the template or null if no template exists
 */
export const createComponentFromTemplate = (componentType, propertyTypes = {}, componentTypes = {}, componentTemplates = {}) => {
    const typeDefinition = componentTypes[componentType];
    const templateDefinition = componentTemplates[componentType];
    if (typeDefinition && templateDefinition) {
        const componentProperties = templateDefinition.properties?.map(propertyType => createPropertyOfType(propertyType, propertyTypes));
        const componentChildren = templateDefinition.children?.map(childType => createComponentFromTemplate(childType, propertyTypes, componentTypes, componentTemplates));
        const childIds = componentChildren.map(childTemplateItems => childTemplateItems[0]?.componentId).filter(id => id);
        const rootComponent = createComponent(typeDefinition.name, componentType, componentProperties, childIds, templateDefinition.isTopLevel);
        return [rootComponent, componentChildren].flat(Infinity).filter(item => item);
    }

    return null;
}