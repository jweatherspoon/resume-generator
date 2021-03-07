import { combineReducers } from "redux";

import globalMetadataReducer from "./GlobalMetadataReducer";

const metadataReducer = combineReducers({
    global: globalMetadataReducer
});

export default metadataReducer;