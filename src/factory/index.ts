import { FunctionComponent } from "react";
import IFactoryEnabledComponentDefinition from "./IFactoryEnabledComponent";
import IFactoryMapping from "./IFactoryMapping";

export const createComponentWithMapping = (map: IFactoryMapping, objectData: IFactoryEnabledComponentDefinition) : any => {
    const mappedComponent = map.get(objectData.componentId);
    const clonedComponentDefinition = mappedComponent?.clone();
    // if (clonedComponentDefinition) {
    //     // try to cast as a function component 
    //     const clonedFunctionComponent: unknown = clonedComponentDefinition as FunctionComponent;
    // }

    return clonedComponentDefinition;
}