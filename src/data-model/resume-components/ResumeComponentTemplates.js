import createComponent from "./template-generators";
import { createPropertyFromTypeDefinition, createPropertyOfType } from "../Property";
import PROPERTY_TYPES from "../code-gen/PropertyTypes";

const createProperty = (property, propertyTypes) => {
    if (typeof(property) === "object") {
        const createdProperty = createPropertyFromTypeDefinition(property);
        createdProperty.value = property.value;
        return createdProperty;
    } else {
        return createPropertyOfType(property, propertyTypes);
    }
}

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
        const componentProperties = templateDefinition.properties?.map(propertyInfo => createProperty(propertyInfo, propertyTypes));
        const componentChildren = templateDefinition.children?.map(childType => createComponentFromTemplate(childType, propertyTypes, componentTypes, componentTemplates));
        const childIds = componentChildren.map(childTemplateItems => childTemplateItems[0]?.componentId).filter(id => id);
        const rootComponent = createComponent(typeDefinition.name, componentType, componentProperties, childIds, templateDefinition.isTopLevel);
        return [rootComponent, componentChildren].flat(Infinity).filter(item => item);
    }
    
    return null;
}

export const createComponentFromCustomTemplate = (templateId, propertyTypes = {}, componentTypes = {}, customTemplates = {}) => {
    const template = customTemplates[templateId];
    const typeDefinition = componentTypes[template?.componentType];
    if (template && typeDefinition) {
        const templateProperties = template.properties?.map(propertyInfo => createProperty(propertyInfo, propertyTypes)).filter(propertyInfo => propertyInfo.propertyType !== PROPERTY_TYPES.TemplateName);
        const templateChildren = template.children?.map(childTemplateId => createComponentFromCustomTemplate(childTemplateId, propertyTypes, componentTypes, customTemplates));
        const childIds = templateChildren.map(childTemplateItems => childTemplateItems[0]?.componentId).filter(id => id);
        const rootComponent = createComponent(typeDefinition.name, template.componentType, templateProperties, childIds, template.isTopLevel);
        return [rootComponent, templateChildren].flat(Infinity).filter(item => item);
    }

    return null;
}