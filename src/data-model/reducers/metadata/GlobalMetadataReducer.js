import { combineReducers } from "redux";

import propertyTypesReducer from "./PropertyTypesReducer";
import componentTypesReducer from "./ComponentTypesReducer";
import componentTemplatesReducer from "./ComponentTemplatesReducer";

const globalMetadataReducer = combineReducers({
    propertyTypes: propertyTypesReducer,
    componentTypes: componentTypesReducer,
    componentTemplates: componentTemplatesReducer,
})
export default globalMetadataReducer;
