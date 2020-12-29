import { Component, FunctionComponent, PropsWithChildren } from "react";

export interface IFactoryEnabledComponentProps extends PropsWithChildren<any> {
    createComponent(objectDefinition: IFactoryEnabledComponentDefinition) : Component | FunctionComponent,
}

export interface IFactoryEnabledComponentDefinition {
    // the component's id in the factory mapping 
    componentId: string,

    // The properties to pass to the created component 
    componentProps: IFactoryEnabledComponentProps,

    // clone the object
    clone() : IFactoryEnabledComponentDefinition
}

export default IFactoryEnabledComponentDefinition;