import IFactoryEnabledComponentDefinition from "../factory/IFactoryEnabledComponent";
import IResumeTheme from "../themes/IResumeTheme";
import IProperty from "./IProperty";

export interface IResumeConfiguration extends IFactoryEnabledComponentDefinition {
    templateId: string,
    regions: any
}

export interface IResumeRegion extends IFactoryEnabledComponentDefinition {
    width: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" | undefined,
    components: []
}

export interface IResumeComponent extends IFactoryEnabledComponentDefinition {
}

export default IResumeConfiguration;