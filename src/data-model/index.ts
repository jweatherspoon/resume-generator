import DataTypes from "./DataTypes"
import IProperty from "./IProperty"
import PropertyTypes from "./PropertyTypes"

export const createProperty = (name: string, type: DataTypes, value: any): IProperty => ({ name, type, value });

export const createString = (name: string, value: any): IProperty => ({ name, type: DataTypes.String, value });

export const createNumber = (name: string, value: any): IProperty => ({ name, type: DataTypes.Number, value });

export const createBoolean = (name: string, value: any): IProperty => ({ name, type: DataTypes.Boolean, value });

export const createDate = (name: string, value: Date) : IProperty => ({ name, type: DataTypes.Date, value });

export const createThemeProperty = (value: any): IProperty => ({ name: PropertyTypes.Theme , type: DataTypes.ResumeTheme, value });

export const getProperty = (properties: IProperty[] | undefined, name: string) : IProperty | undefined => properties?.find(x => x.name === name);

export const getPropertyValue = (properties: IProperty[] | undefined, name: string) : any => getProperty(properties, name)?.value;

export const getPropertyMap = (properties: IProperty[] | undefined) : any => {
    const keyValuePairs = properties?.map(x => [ x.name, x ]);
    return Object.fromEntries(keyValuePairs || []);
}