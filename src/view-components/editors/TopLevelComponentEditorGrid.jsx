import { DataGrid } from "@material-ui/data-grid";
import DATA_TYPES from "../../data-model/DataTypes";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import { getRootAndAllChildComponents, sortObjectArrayByKey } from "../../utility/DataUtility";

const dataTypeToColumnTypeMap = {
    [DATA_TYPES.String]: "string",
}

const createColumnDefinition = (property) => ({
    field: property?.propertyType,
    header: property?.propertyType,
    description: property?.propertyType,
    type: dataTypeToColumnTypeMap[property?.dataType],
    flex: 1,
});

const convertPropertiesToRowDefinition = (component, rowId, columnDefinitions) => {
    const rowDefinition = { id: rowId };
    if (component?.properties) {
        for (let property of component.properties) {
            rowDefinition[property.propertyType] = property.value;
            if (!columnDefinitions[property.propertyType]) {
                columnDefinitions[property.propertyType] = createColumnDefinition(property);
            }
        }
    }

    return rowDefinition;
}

const constructDataGridInfo = (topLevelComponent, allComponents) => {
    let rowId = 0;
    const topLevelComponentAndChildren = getRootAndAllChildComponents(topLevelComponent, allComponents);
    
    // determine all possible property types in that array and create column definitions for them 
    const columnDefinitionMap = {};
    const rowDefinitions = [];
    for (let component of topLevelComponentAndChildren) {
        const rowDefinition = convertPropertiesToRowDefinition(component, rowId++, columnDefinitionMap);
        if (Object.keys(rowDefinitions).length > 1) {
            rowDefinitions.push(rowDefinition);
        }
    }

    // sort alphabetically by header 
    const columnDefinitions = sortObjectArrayByKey(Object.values(columnDefinitionMap), x => x.header);

    return {
        rowDefinitions,
        columnDefinitions
    }
}

const TopLevelComponentEditorGrid = ({component, allComponents}) => {
    const { rowDefinitions, columnDefinitions } = constructDataGridInfo(component, allComponents);
    console.log(rowDefinitions, columnDefinitions);
    return (
        <DataGrid cols={columnDefinitions} rows={rowDefinitions} />
    )
}

export default TopLevelComponentEditorGrid;