import { List, ListItem } from "@material-ui/core";
import PropertyDataTypeEditorMap from "./PropertyDataTypeEditorMap";

const ListEditor = (props) => {
    const {
        values,
        onValueChanged,
        dataType,
        attributes,
        addAction,
        deleteAction,
    } = props;

    const { isDense } = attributes;

    const editorGenerator = PropertyDataTypeEditorMap[dataType];
    if (editorGenerator) {
        const editors = values?.map((value, i) => {
            const editorProps = {
                value,
                onValueChanged: (oldValue, newValue) => onValueChanged(oldValue, newValue, i),
                attributes: attributes
            };

            return (
                <ListItem key={`${dataType}-${i}`} dense={isDense}>
                    {editorGenerator(editorProps)}        
                </ListItem>
            )   
        });
        
        return (
            <List dense={isDense}>
                {addAction && (
                    <ListItem button onClick={() => addAction()}>
                        Add New
                    </ListItem>
                )}
                {editors}
            </List>
        );
    }

    // data type is unknown
    return null;
}

export default ListEditor;