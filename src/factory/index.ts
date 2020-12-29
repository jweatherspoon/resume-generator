import IFactoryEnabledComponentDefinition, { IFactoryEnabledComponentProps } from "./IFactoryEnabledComponent";
import IFactoryMapping from "./IFactoryMapping";

export const createComponentWithMapping = (map: IFactoryMapping, objectData: IFactoryEnabledComponentDefinition) : any => {
    const mappedComponent = map.get(objectData.componentId);

    const componentProps : IFactoryEnabledComponentProps = {
        source: objectData,
        createComponent: (o) => createComponentWithMapping(map, o)
    };

    const clonedComponentDefinition = mappedComponent?.clone(componentProps);
    // clonedComponentDefinition.createComponent = createComponentWithMapping(map, objectData);
    // if (clonedComponentDefinition) {
    //     // try to cast as a function component 
    //     const clonedFunctionComponent: unknown = clonedComponentDefinition as FunctionComponent;
    // }

    return clonedComponentDefinition;
}