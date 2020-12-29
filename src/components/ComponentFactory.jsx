import { createComponentWithMapping } from '../factory';

const ComponentFactory = ({map, objectData}) => {
    if (!map.has(objectData.componentId)) {
        return null;
    }

    const component = createComponentWithMapping(map, objectData);
    return component.render();
}

export default ComponentFactory;