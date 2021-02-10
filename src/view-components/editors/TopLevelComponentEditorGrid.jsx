import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import DATA_TYPES from "../../data-model/DataTypes";
import PROPERTY_TYPES from "../../data-model/PropertyTypes";
import { getRootAndAllChildComponents, sortObjectArrayByKey } from "../../utility/DataUtility";
import PropertyEditorFactory from "./PropertyEditorFactory";

const idColumnWidth = 2;

const useStyles = makeStyles({
    headerRow: {
        borderBottom: "1px solid black",
    },
});

const createColumnDefinition = (property) => ({
    field: property?.propertyType,
    header: property?.propertyType,
    description: property?.propertyType,
    type: property?.dataType,
});

const convertPropertiesToRowDefinition = (component, rowId, columnDefinitions) => {
    const rowDefinition = { id: rowId };
    if (component?.properties) {
        for (let property of component.properties) {
            rowDefinition[property.propertyType] = { componentId: component.componentId, ...property };
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

const DataGridRow = ({rowDefinition, columnDefinitions}) => {
    const cellData = columnDefinitions.map(cd => rowDefinition[cd.header]);
    const cellWidth = (12 - idColumnWidth) / (columnDefinitions.length || 1);
    const cells = [
        <Grid item xs={idColumnWidth}>
            <Typography align="center">{rowDefinition.id}</Typography>
        </Grid>
    ];

    cells.push(...cellData.map((c, i) => (c ? (
        <Grid item xs={cellWidth} key={i}>
            {c && <PropertyEditorFactory {...c} />}
        </Grid>
    ) : createCell(cellWidth, "-", i, false))));

    return (
        <Grid item container xs={12}>
            {cells}
        </Grid>
    )
}

const createCell = (cellWidth, content, key, isHeaderCell) => (
    <Grid item xs={cellWidth} key={key}>
        <Container>
            <Typography variant="body1" align="center" fullWidth>
                {isHeaderCell ? (
                    <strong>
                        {content}
                    </strong>
                ) : content}
            </Typography>
        </Container>
    </Grid>
)

const HeaderRow = ({sortedHeaders}) => {
    const classes = useStyles();

    const cellWidth = (12 - idColumnWidth) / (sortedHeaders.length);
    const idCell = createCell(idColumnWidth, "-", "id-header", true);
    const headerCells = sortedHeaders.map((h, i) => (
        <Grid item xs={cellWidth} key={i}>
            <Typography variant="body1" align="center">
                <strong>
                    {h}
                </strong>
            </Typography>
        </Grid>
    ));

    return (
        <Grid item container xs={12} className={classes.headerRow}>
            {idCell}
            {headerCells}
        </Grid>
    )
}

// TODO: Update this to support more than 12 columns I guess
const TopLevelComponentEditorGrid = ({component, allComponents}) => {
    const { rowDefinitions, columnDefinitions } = constructDataGridInfo(component, allComponents);

    if (columnDefinitions.length > 12) {
        columnDefinitions = columnDefinitions.slice(0, 12);
    }

    const sortedHeaders = columnDefinitions.map(cd => cd.header);
    const rows = rowDefinitions.map((rd, i) => (
        <DataGridRow key={i} rowDefinition={rd} columnDefinitions={columnDefinitions} />
    ));

    return (
        <Grid item container>
            {/* header row */}
            <HeaderRow sortedHeaders={sortedHeaders} />

            {rows}
        </Grid>
    );
}

export default TopLevelComponentEditorGrid;