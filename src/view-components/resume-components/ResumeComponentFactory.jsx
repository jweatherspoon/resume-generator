import RESUME_COMPONENT_TYPES from "../../data-model/resume-components/ResumeComponentTypes";
import ContactDetails from "./ContactDetails"

const ResumeComponentMap = {
    [RESUME_COMPONENT_TYPES.ContactDetails]: (props) => <ContactDetails {...props} />
}

const ResumeComponentFactory = props => {
    const componentGenerator = ResumeComponentMap[props.componentType];
    if (componentGenerator) {
        return componentGenerator(props);
    }

    return null;
}

export default ResumeComponentFactory;