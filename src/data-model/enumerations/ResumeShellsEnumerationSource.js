import customMetadata from "../custom-metadata.json";
import DynamicEnumerationSource from "./DynamicEnumerationSource";

class ResumeShellsEnumerationSource extends DynamicEnumerationSource {
    getEnumOptions = () => {
        return Object.keys(customMetadata?.shells || {});
    }
}

export default ResumeShellsEnumerationSource;