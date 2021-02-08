import ComponentFactory from "./ComponentFactory";
import RESUME_COMPONENT_TYPES from "../../data-model/resume-components/ResumeComponentTypes";

const ResumeComponentMap = {
}

const ResumeComponentFactory = props => <ComponentFactory  {...props} map={ResumeComponentTemplates} />

export default ResumeComponentFactory;