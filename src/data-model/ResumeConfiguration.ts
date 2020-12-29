import IResumeTheme from "../themes/IResumeTheme";
import IProperty from "./IProperty";

export interface IResumeConfiguration {
    name: string,
    templateId: string,
    theme: IResumeTheme,
    regions: any
}

export interface IResumeRegion {
    id: string,
    components: IResumeComponent[],
    width: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" | undefined
}

export interface IResumeComponent {
    id: string,
    properties: IProperty[],

    clone() : IResumeComponent
}

export default IResumeConfiguration;