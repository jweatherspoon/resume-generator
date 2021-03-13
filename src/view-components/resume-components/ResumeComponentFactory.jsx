import COMPONENT_TYPES from "../../data-model/code-gen/ComponentTypes";
import ContactDetails from "./ContactDetails"
import IconImage from "./IconImage";
import PositionHeader from "./PositionHeader";

const ResumeComponentMap = {
    [COMPONENT_TYPES.ContactDetails]: (props) => (<ContactDetails {...props} />),
    [COMPONENT_TYPES.PositionHeader]: (props) => (<PositionHeader {...props} />),
    [COMPONENT_TYPES.IconImage]: (props) => (<IconImage {...props} />),
}

const ResumeComponentFactory = props => {
    const componentGenerator = ResumeComponentMap[props.componentType];
    if (componentGenerator) {
        return componentGenerator(props);
    }

    return null;
}

export default ResumeComponentFactory;