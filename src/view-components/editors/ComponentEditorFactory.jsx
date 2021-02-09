import { Container } from "@material-ui/core";
import PropertyEditorFactory from "./PropertyEditorFactory";

const ComponentEditorFactory = ({component}) => {
    const propertyEditors = component?.properties.map((p, i) => (<PropertyEditorFactory key={i} componentId={component.componentId} {...p} />));
    return (
        <Container>
            {propertyEditors}
        </Container>
    )
}

export default ComponentEditorFactory;