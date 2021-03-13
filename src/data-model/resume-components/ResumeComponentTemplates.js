import createComponent from "./template-generators";
import { createPropertyOfType } from "../Property";

export const createComponentFromTemplate = (componentType, propertyTypes = {}, componentTypes = {}, componentTemplates = {}) => {
    const typeDefinition = componentTypes[componentType];
    const templateDefinition = componentTemplates[componentType];
    if (typeDefinition && templateDefinition) {
        const componentProperties = templateDefinition.properties?.map(propertyType => createPropertyOfType(propertyType, propertyTypes));
        const componentChildren = templateDefinition.children?.map(childType => createComponentFromTemplate(childType, propertyTypes, componentTypes, componentTemplates));
        return createComponent(typeDefinition.name, componentType, componentProperties, componentChildren, templateDefinition.isTopLevel);
    }

    return null;
}