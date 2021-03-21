import COMPONENT_TYPES from "../../data-model/code-gen/ComponentTypes";
import ContactDetails from "./ContactDetails"
import FAIcon from "./FAIcon";
import Logo from "./Logo";
import PositionHeader from "./PositionHeader";
import SimpleHeader from "./SimpleHeader";

const ResumeComponentMap = {
    [COMPONENT_TYPES.ContactDetails]: (props) => (<ContactDetails {...props} />),
    [COMPONENT_TYPES.PositionHeader]: (props) => (<PositionHeader {...props} />),
    [COMPONENT_TYPES.FAIcon]: (props) => (<FAIcon {...props} />),
    [COMPONENT_TYPES.Logo]: (props) => (<Logo {...props} />),
    [COMPONENT_TYPES.SimpleHeader]: (props) => (<SimpleHeader {...props} />)
}

const ResumeComponentFactory = props => {
    const componentGenerator = ResumeComponentMap[props.componentType];
    if (componentGenerator) {
        return componentGenerator(props);
    }

    return null;
}

export default ResumeComponentFactory;