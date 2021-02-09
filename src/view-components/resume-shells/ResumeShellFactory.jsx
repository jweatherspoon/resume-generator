import RESUME_SHELL_TYPES from "../../data-model/ResumeShellTypes";
import FlashyResumeShell from "./FlashyResumeShell";

const ResumeShellMap = {
    [RESUME_SHELL_TYPES.Flashy]: (regionMappedComponents) => (<FlashyResumeShell regionMappedComponents={regionMappedComponents} />),
}

const ResumeShellFactory = ({template, regionMappedComponents}) => {
    const shellGenerator = ResumeShellMap[template];
    if (shellGenerator) {
        return shellGenerator(regionMappedComponents);
    }

    return null;
}

export default ResumeShellFactory;