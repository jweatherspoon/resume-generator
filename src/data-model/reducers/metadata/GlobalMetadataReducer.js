import { combineReducers } from "redux";

import propertyTypesReducer from "./PropertyTypesReducer";
import componentTypesReducer from "./ComponentTypesReducer";
import componentTemplatesReducer from "./ComponentTemplatesReducer";
import enumSourcesReducer from "./EnumSourcesReducer";

const globalMetadataReducer = combineReducers({
    propertyTypes: propertyTypesReducer,
    componentTypes: componentTypesReducer,
    componentTemplates: componentTemplatesReducer,
    enumSources: enumSourcesReducer,
})
export default globalMetadataReducer;
