import DataTypesEnumSource from "./DataTypesEnumerationSource";
import ENUM_SOURCES from "./EnumSources";
import IconEnumSource from "./IconEnumerationSource";
import RegionEnumSource from "./RegionEnumerationSource";

const EnumSourceMap = {
    [ENUM_SOURCES.Icons]: IconEnumSource,
    [ENUM_SOURCES.Regions]: RegionEnumSource,
    [ENUM_SOURCES.DataTypes]: DataTypesEnumSource,
}

const getEnumOptions = (enumSourceName) => {
    const enumSource = EnumSourceMap[enumSourceName];
    const options = enumSource?.getEnumOptions() || [];
    return ["", ...options];
}

export default getEnumOptions;