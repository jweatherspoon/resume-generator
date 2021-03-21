import COMPONENT_TYPES from "../../data-model/code-gen/ComponentTypes";
import ContactDetails from "./ContactDetails";
import PositionHeader from "./PositionHeader";
import Logo from "./Logo";
import SimpleHeader from "./SimpleHeader";
import FAIcon from "./FAIcon";

const RESUME_COMPONENT_MAP = {
    [COMPONENT_TYPES.ContactDetails]: (props) => (<ContactDetails {...props} />),
    [COMPONENT_TYPES.PositionHeader]: (props) => (<PositionHeader {...props} />),
    [COMPONENT_TYPES.Logo]: (props) => (<Logo {...props} />),
    [COMPONENT_TYPES.SimpleHeader]: (props) => (<SimpleHeader {...props} />),
    [COMPONENT_TYPES.FAIcon]: (props) => (<FAIcon {...props} />),
};

const ResumeComponentFactory = (props) => {
    const componentGenerator = RESUME_COMPONENT_MAP[props.componentType];
    return componentGenerator && componentGenerator(props);
}

export default ResumeComponentFactory;