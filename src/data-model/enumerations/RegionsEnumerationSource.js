import store from "../../store";
import DynamicEnumerationSource from "./DynamicEnumerationSource";

class RegionsEnumerationSource extends DynamicEnumerationSource {
    getEnumOptions = () => {
        const currentState = store.getState();
        return currentState?.activeConfiguration?.regions || [];
    }
}

export default RegionsEnumerationSource;