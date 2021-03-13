import store from "../../store";
import EnumerationSource from "./EnumerationSource";

class RegionsEnumerationSource extends EnumerationSource {
    getEnumOptions = () => {
        const currentState = store.getState();
        return currentState?.activeConfiguration?.regions || [];
    }
}

export default RegionsEnumerationSource;