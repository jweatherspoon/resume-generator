import { TextField } from "@material-ui/core";

const StringEditor = (props) => {
    const { 
        value, 
        onValueChanged, 
        attributes: { variant, hideLabel, label, placeholder }
    } = props;

    return (
        <TextField variant={variant} label={!hideLabel && label} value={value}
            placeholder={placeholder} onChange={e => onValueChanged(value, e.target.value)} fullWidth />
    );
}
    
export default StringEditor;