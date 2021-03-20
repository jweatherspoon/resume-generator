import { MenuItem, TextField } from "@material-ui/core";

const EnumValueEditor = (props) => {
    const {
        value,
        onValueChanged,
        attributes: { variant, hideLabel, label, isDense, options, isColorDisplay }
    } = props;

    const menuItems = options?.map((o, i) => {
        const value = o.id || o;
        const displayText = o.name || o;
        const style = {};
        if (isColorDisplay) {
            style.backgroundColor = o;
        }

        return (
            <MenuItem key={i} value={value} style={style}>
                {displayText || "-"}
            </MenuItem>
        );
    });

    return (
        <TextField select fullWidth value={value || ""} label={!hideLabel && label} variant={variant} margin={isDense && "dense"}
            onChange={(e) => onValueChanged(value, e.target.value)} SelectProps={{autoWidth: true}}>
            {menuItems}
        </TextField>
    );
}

export default EnumValueEditor;