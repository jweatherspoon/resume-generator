import customMetadata from "../../data-model/custom-metadata.json";

const getRegionInfo = (shellId) => customMetadata?.shells?.[shellId]?.regions || [];

export default getRegionInfo;