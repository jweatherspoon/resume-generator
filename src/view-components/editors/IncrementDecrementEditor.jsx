import { Button, Typography } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const IncrementDecrementEditor = ({value, onValueChanged, attributes}) => {
    const { variant, label, hideLabel } = attributes;
    return (
        <div style={{display: "flex"}}>
            <Button onClick={() => onValueChanged(value, value - 1)}>
                <ExpandLess />
            </Button>
            {!hideLabel && (
                <div style={{alignSelf: "center"}}>
                    <Typography variant={variant}>{label}</Typography>
                </div>
            )}
            <Button onClick={() => onValueChanged(value, value + 1)}>
                <ExpandMore />
            </Button>
        </div>
    );
}

export default IncrementDecrementEditor;