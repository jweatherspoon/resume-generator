import { TextField } from "@material-ui/core";
import IncrementDecrementEditor from "./IncrementDecrementEditor";

const NumberEditor = (props) => {
    const {
        value,
        onValueChanged,
        attributes: { isIncrementDecrement, label, hideLabel }
    } = props;

    if (isIncrementDecrement) {
        return (
            <IncrementDecrementEditor {...props} />
        )
    }

    return (
        <TextField type="number" value={value} onChange={e => onValueChanged(value, e.target.value)} label={!hideLabel && label} />
    )
}

export default NumberEditor;