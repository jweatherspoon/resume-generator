import ComponentFactory from "./ComponentFactory";
import RESUME_COMPONENT_TYPES from "../../data-model/ResumeComponentTypes";

const ResumeComponentMap = {
}

const ResumeComponentFactory = props => <ComponentFactory  {...props} map={ResumeComponentMap} />

export default ResumeComponentFactory;