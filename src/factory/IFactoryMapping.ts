import IFactoryEnabledComponentDefinition from "./IFactoryEnabledComponent";

interface IFactoryMapping extends Map<string, IFactoryEnabledComponentDefinition> {};

export default IFactoryMapping;