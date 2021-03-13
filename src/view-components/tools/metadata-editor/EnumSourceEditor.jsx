import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { createAddEnumSourceOptionAction, createRemoveEnumSourceOptionAction, createUpdateEnumSourceOptionAction, createUpdateEnumSourceTopLevelPropertyAction } from "../../../data-model/actions/metadata/GlobalMetadataActions";
import DATA_TYPES from "../../../data-model/DataTypes";
import BooleanEditor from "../../editors/BooleanEditor";
import ListEditor from "../../editors/ListEditor";
import StringEditor from "../../editors/StringEditor";

const EnumSourceEditor = (props) => {
    const {
        id,
        addEnumOption,
        selectedObject,
        updateName,
        updateIsStatic,
        updateImportName,
        removeEnumOption,
        updateEnumOption,
        ...other
    } = props;
    
        if (!selectedObject) {
            return null;
        }

    return (
        <Grid container>
            {/* top level properties */}
            <Grid item xs={12}>
                <StringEditor value={selectedObject.name} onValueChanged={(oldValue, newValue) => updateName(newValue)} attributes={{ label: "Name" }} />
            </Grid>
            <Grid item xs={12}>
                <BooleanEditor value={selectedObject.isStatic || false} onValueChanged={(oldValue, newValue) => updateIsStatic(newValue)}
                    attributes={{
                        label: "Is Static",
                    }} />
            </Grid>

            <Grid item xs={12}>
                {selectedObject.isStatic ? (
                    <ListEditor dataType={DATA_TYPES.String} values={selectedObject.options} addAction={() => addEnumOption("_newEnumOption")}
                    onValueChanged={(oldValue, newValue, index) => updateEnumOption(index, newValue)}
                    attributes={{
                        isDense: true
                    }} />
                ) : (
                        <StringEditor value={selectedObject.importName} onValueChanged={(oldValue, newValue) => updateImportName(newValue)} attributes={{ label: "Import Name" }} />
                )}
            </Grid>
        </Grid>
    );
}

const mapDispatchToProps = (dispatch, { id }) => ({
    updateName: (name) => dispatch(createUpdateEnumSourceTopLevelPropertyAction(id, "name", name)),
    updateImportName: (name) => dispatch(createUpdateEnumSourceTopLevelPropertyAction(id, "importName", name)),
    updateIsStatic: (isStatic) => dispatch(createUpdateEnumSourceTopLevelPropertyAction(id, "isStatic", isStatic)),
    addEnumOption: (option) => dispatch(createAddEnumSourceOptionAction(id, option)),
    removeEnumOption: (option) => dispatch(createRemoveEnumSourceOptionAction(id, option)),
    updateEnumOption: (index, newValue) => dispatch(createUpdateEnumSourceOptionAction(id, index, newValue)),
})

export default connect(null, mapDispatchToProps)(EnumSourceEditor);