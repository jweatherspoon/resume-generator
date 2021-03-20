import store from "../../store";
import customMetadata from "../custom-metadata.json";
import DynamicEnumerationSource from "./DynamicEnumerationSource";

class ColorsEnumerationSource extends DynamicEnumerationSource {
    getEnumOptions = () => {
        const state = store.getState();

        // get the currently active theme 
        const currentTheme = state?.activeConfiguration?.theme;
        const palette = customMetadata?.themes?.[currentTheme]?.palette;
        if (palette) {
            // TODO: Determine if you really want to re-use the MUI theme stuff...
            return Object.values(palette?.text)
        }

        return [];
    }
}

export default ColorsEnumerationSource;