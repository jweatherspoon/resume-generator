import DataTypes from "./DataTypes"
import IProperty from "./IProperty"
import PropertyTypes from "./PropertyTypes"

export const createProperty = (name: string, type: DataTypes, value: any): IProperty => ({ name, type, value });

export const createThemeProperty = (value: any): IProperty => ({ name: PropertyTypes.Theme , type: DataTypes.ResumeTheme, value });

export const getProperty = (properties: IProperty[] | undefined, name: string) : IProperty | undefined => properties?.find(x => x.name === name);

export const getPropertyValue = (properties: IProperty[] | undefined, name: string) : any => getProperty(properties, name)?.value;