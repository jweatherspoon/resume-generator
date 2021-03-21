import { createComponentFromCustomTemplate } from "../../../data-model/resume-components/ResumeComponentTemplates";
import AddComponentsDialog from "./AddComponentsDialog";

const AddComponentsFromCustomTemplatesDialog = (props) => {
    return (
        <AddComponentsDialog {...props} createFromTemplateOverride={createComponentFromCustomTemplate} />
    )
}

export default AddComponentsFromCustomTemplatesDialog;