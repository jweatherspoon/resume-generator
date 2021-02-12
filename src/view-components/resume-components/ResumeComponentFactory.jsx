import RESUME_COMPONENT_TYPES from "../../data-model/resume-components/ResumeComponentTypes";
import ContactDetails from "./ContactDetails"
import IconImage from "./IconImage";
import PositionHeader from "./PositionHeader";

const ResumeComponentMap = {
    [RESUME_COMPONENT_TYPES.ContactDetails]: (props) => (<ContactDetails {...props} />),
    [RESUME_COMPONENT_TYPES.PositionHeader]: (props) => (<PositionHeader {...props} />),
    [RESUME_COMPONENT_TYPES.IconImage]: (props) => (<IconImage {...props} />),
}

const ResumeComponentFactory = props => {
    const componentGenerator = ResumeComponentMap[props.componentType];
    if (componentGenerator) {
        return componentGenerator(props);
    }

    return null;
}

export default ResumeComponentFactory;