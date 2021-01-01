import { createComponentWithMapping } from '../factory';

export const ComponentFactory = ({map, objectData}) => {
    if (!map.has(objectData.componentId)) {
        return null;
    }

    const component = createComponentWithMapping(map, objectData);
    return component.render();
}

export const ListComponentFactory = ({map, objectDatas}) => {
    const componentFactories = objectDatas?.map((x, i) => (
        <ComponentFactory map={map} key={i}
            objectData={x} />
    ))

    return (
        <div>
            {componentFactories}
        </div>
    )
}

export default ComponentFactory;