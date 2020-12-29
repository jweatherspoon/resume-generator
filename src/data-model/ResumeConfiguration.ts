import IResumeTheme from "../themes/IResumeTheme";
import IProperty from "./IProperty";

export interface IResumeConfiguration {
    name: string,
    templateId: string,
    theme: IResumeTheme,
    regions: IResumeRegion[]
}

export interface IResumeRegion {
    id: string,
    components: IResumeComponent[]
}

export interface IResumeComponent {
    id: string,
    properties: IProperty[],

    clone() : IResumeComponent
}

export default IResumeConfiguration;