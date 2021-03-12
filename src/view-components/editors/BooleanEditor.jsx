import { Checkbox, TextField } from "@material-ui/core";

const BooleanEditor = (props) => {
    const {
        value,
        onValueChanged,
        attributes: { }
    } = props;

    return (
        <Checkbox checked={value} onChange={e => onValueChanged(value, e.target.checked)} />
    );
}

export default BooleanEditor;