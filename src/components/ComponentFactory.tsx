import { FunctionComponent } from 'react'
import IFactoryMapping from '../factory/IFactoryMapping';
import IFactoryEnabledComponentDefinition from '../factory/IFactoryEnabledComponent';
import { createComponentWithMapping } from '../factory';

export interface IComponentFactoryProps {
    map: IFactoryMapping,
    objectData: IFactoryEnabledComponentDefinition
}

const ComponentFactory : FunctionComponent<IComponentFactoryProps> = ({map, objectData}) => {
    if (!map.has(objectData.componentId)) {
        return null;
    }

    // const createComponent = (objectData : IFactoryEnabledComponentDefinition) => createComponentWithMapping(map, objectData);
    const component = createComponentWithMapping(map, objectData);
}

export default ComponentFactory;