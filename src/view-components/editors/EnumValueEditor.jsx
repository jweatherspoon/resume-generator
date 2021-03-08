import { MenuItem, TextField } from "@material-ui/core";

const EnumValueEditor = (props) => {
    const {
        value,
        onValueChanged,
        attributes: { variant, hideLabel, label, isDense, options }
    } = props;

    const menuItems = options?.map((o, i) => (
        <MenuItem key={i} value={o}>
            {o || "-"}
        </MenuItem>
    ));

    return (
        <TextField select fullWidth value={value} label={!hideLabel && label} variant={variant} margin={isDense && "dense"}
            onChange={(e) => onValueChanged(value, e.target.value)} SelectProps={{autoWidth: true}}>
            {menuItems}
        </TextField>
    );
}

export default EnumValueEditor;