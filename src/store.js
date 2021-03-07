import { createStore, combineReducers } from 'redux';
import componentReducer from './data-model/reducers/ComponentReducer';
import activeConfigurationReducer from './data-model/reducers/ActiveConfigurationReducer';
import metadataReducer from './data-model/reducers/metadata';

const IS_DEBUG = true;

const rootReducer = combineReducers({
    components: componentReducer,
    activeConfiguration: activeConfigurationReducer,
    metadata: metadataReducer,
});

const enhancer = IS_DEBUG ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null;
const store = createStore(rootReducer, {}, enhancer);

export default store;