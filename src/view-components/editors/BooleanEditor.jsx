import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";

const BooleanEditor = (props) => {
    const {
        value,
        onValueChanged,
        attributes: { label, hideLabel, labelLocation }
    } = props;

    const checkbox = (
        <Checkbox checked={value} onChange={e => onValueChanged(value, e.target.checked)} />
    );

    if (hideLabel) {
        return checkbox;
    }
    else {
        return (
            <FormControlLabel control={checkbox} labelPlacement={labelLocation || "end"} label={label} />
        );
    }
}

export default BooleanEditor;