import { PropsWithChildren, ReactNode } from "react";
import IProperty from "../data-model/IProperty";

export interface IFactoryEnabledComponentProps extends PropsWithChildren<any> {
    source: IFactoryEnabledComponentDefinition,
    createComponent(objectDefinition: IFactoryEnabledComponentDefinition) : ReactNode,
}

export interface IFactoryEnabledComponentDefinition {
    // the component's id in the factory mapping 
    componentId: string,

    // The properties to pass to the created component 
    componentProps?: IProperty[],

    // the component's child data 
    childrenData?: any,

    // clone the object
    clone(objectData: IFactoryEnabledComponentProps) : IFactoryEnabledComponentDefinition | ReactNode
}

export default IFactoryEnabledComponentDefinition;