import DATA_TYPES from "../DataTypes";
import EnumerationSource from "./EnumerationSource";

class DataTypesEnumerationSource extends EnumerationSource {
    getEnumOptions = () => Object.values(DATA_TYPES);
}

const DataTypesEnumSource = new DataTypesEnumerationSource();
export default DataTypesEnumSource;