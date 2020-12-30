import { Component, ReactNode } from "react";
import { FactoryMapBase } from "./factory-maps";
import IFactoryEnabledComponentDefinition, { IFactoryEnabledComponentProps } from "./IFactoryEnabledComponent";
import IFactoryMapping from "./IFactoryMapping";

export class TestComponentOne extends Component<IFactoryEnabledComponentProps | {}> implements IFactoryEnabledComponentDefinition {
    componentId: string;

    constructor(props: IFactoryEnabledComponentProps | any) {
        super(props)

        this.componentId = "test-one";
    }

    clone(sourceProps: IFactoryEnabledComponentProps): IFactoryEnabledComponentDefinition | ReactNode {
        const clonedComponent = new TestComponentOne(sourceProps);
        return clonedComponent;
    }

    render() {
        const typedProps: IFactoryEnabledComponentProps = this.props as IFactoryEnabledComponentProps;
        const displayText : any = typedProps?.source.componentProps?.find(x => x.name === "displayText")?.value;
        console.log(typedProps);
        return (
            <p>{displayText || "Hello world!"}</p>
        )
    }
}

// class TestFactory extends FactoryMapBase { //extends Map<string, IFactoryEnabledComponentDefinition> implements IFactoryMapping {
//     constructor() {
//         const components: IFactoryEnabledComponentDefinition[] = [
//             new TestComponentOne(null)
//         ];
        
//         super(components);
//     }
// }

// export default TestFactory;