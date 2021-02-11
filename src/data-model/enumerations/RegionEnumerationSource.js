import store from "../../store";
import EnumerationSource from "./EnumerationSource";

class RegionEnumerationSource extends EnumerationSource {
    getEnumOptions = () => {
        const currentState = store.getState();
        return currentState?.activeConfiguration?.regions || [];
    }
}

const RegionEnumSource = new RegionEnumerationSource();
export default RegionEnumSource;