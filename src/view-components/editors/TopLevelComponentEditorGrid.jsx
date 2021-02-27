import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { endianness } from "os";
import DATA_TYPES from "../../data-model/DataTypes";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import { getRootAndAllChildComponents, sortObjectArrayByKey } from "../../utility/DataUtility";
import PropertyEditorFactory from "./PropertyEditorFactory";

// const idColumnWidth = 2;
const propertiesToHide = [
    PROPERTY_TYPES.Region,
    PROPERTY_TYPES.Order
];

const useStyles = makeStyles({
    cell: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: "100%",
        height: 50,
    },
    headerCell: {
        borderBottom: "1px solid black",
        height: 30,
    },
    editorCell: {
        padding: 3,
        justifyContent: "end",
    },
    gridColumn: (props) => ({
        minWidth: props?.columnDefinition?.minWidth,
        maxWidth: props?.columnDefinition?.maxWidth,
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        borderRight: "1px solid black",
    }),
    dataGrid: {
        overflow: "auto",
        display: "flex",
        flexWrap: "nowrap",
    }
});

const createColumnDefinition = (property, { minWidth, maxWidth }) => ({
    field: property?.propertyType,
    header: property?.propertyType,
    description: property?.propertyType,
    type: property?.dataType,
    minWidth, 
    maxWidth
});

const convertPropertiesToRowDefinition = (component, rowId, columnDefinitions) => {
    const rowDefinition = { id: rowId };
    if (component?.properties) {
        for (let property of component.properties) {
            // if this property exists in the propertiesToHide, skip
            if (!propertiesToHide.some(propertyType => property.propertyType === propertyType)) {
                rowDefinition[property.propertyType] = { componentId: component.componentId, ...property };
                if (!columnDefinitions[property.propertyType]) {
                    columnDefinitions[property.propertyType] = createColumnDefinition(property, { minWidth: 100, maxWidth: 250 });
                }
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
        if (Object.keys(rowDefinition).length > 1) {
            rowDefinitions.push(rowDefinition);
        }
    }

    // sort alphabetically by header 
    const columnDefinitions = sortObjectArrayByKey(Object.values(columnDefinitionMap), x => x.header);

    return {
        rowDefinitions,
        columnDefinitions,
    }
}

const createCell = (className, content, key, isHeaderCell) => (
    <div key={key} className={className}>
        <Typography variant="body1" align="center">
            {isHeaderCell ? (
                <strong>
                    {content}
                </strong>
            ) : content}
        </Typography>
    </div>
)

const constructCellsForColumn = (columnDefinition, rowDefinitions, nullValueClassName) => {
    const cells = rowDefinitions.map((rowData, index) => {
        const { field } = columnDefinition;
        const key = `cell-${field}-${index}`
        const cellValue = rowData[field] ? (<PropertyEditorFactory {...rowData[field]} hideLabel />) :
            (createCell(nullValueClassName, "-", undefined, false))
        return (
            <DataGridCell key={key}>
                {cellValue}
            </DataGridCell>
        );
    });

    return cells;
}

const DataGrid = ({ columnDefinitions, rowDefinitions }) => {
    const classes = useStyles();
    const columns = columnDefinitions.map((colDef, index) => {
        const key = `col-${colDef.field}-${index}`;
        return (
            <DataGridColumn key={key} columnDefinition={colDef} rowDefinitions={rowDefinitions} />
        )
    });

    return (
        <div className={classes.dataGrid}>
            {columns}
        </div>
    );
}

const DataGridColumn = ({ columnDefinition, rowDefinitions }) => {
    const classes = useStyles({ columnDefinition });
    const headerCell = createCell([classes.cell, classes.headerCell].join(" "), columnDefinition.header, undefined, true);
    const cells = constructCellsForColumn(columnDefinition, rowDefinitions, classes.cell);
    return (
        <div className={classes.gridColumn}>
            {headerCell}
            {cells}
        </div>
    )
}

const DataGridCell = (props) => {
    const { children, className } = props;
    const classes = useStyles(props);
    const cellClass = [classes.cell, className || classes.editorCell].join(" ");
    return (
        <div className={cellClass}>
            {children}
        </div>
    );
}

const TopLevelComponentEditorGrid = ({ component, allComponents }) => {
    const { rowDefinitions, columnDefinitions } = constructDataGridInfo(component, allComponents);
    return (
        <DataGrid columnDefinitions={columnDefinitions} rowDefinitions={rowDefinitions} />
    )
}

export default TopLevelComponentEditorGrid;