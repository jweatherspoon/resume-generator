import store from "../../store";
import customMetadata from "../custom-metadata.json";
import DynamicEnumerationSource from "./DynamicEnumerationSource";

class RegionsEnumerationSource extends DynamicEnumerationSource {
    getEnumOptions = () => {
        const currentState = store.getState();
        const currentShell = currentState?.activeConfiguration?.activeTemplate;
        const shellInfo = customMetadata?.shells?.[currentShell];
        
        return Object.keys(shellInfo?.regions || {});
    }
}

export default RegionsEnumerationSource;