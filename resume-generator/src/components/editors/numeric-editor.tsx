import { TextField, TextFieldProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const NumericEditor: React.FC<NumericEditorProps> = (props) => {
  const { value, setValue, inputProps } = props;

  return (
    <TextField
      {...inputProps}
      value={value ?? '-'}
      onChange={(e) => {
        let newValue = parseInt(e.target.value);
        newValue = isFinite(newValue) ? newValue : 0;
        setValue?.(newValue);
      }}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      disabled={isNaN(value as number)}
    />
  );
};

export default NumericEditor;

export interface NumericEditorProps {
  inputProps?: TextFieldProps;
  value?: number;
  setValue?: Dispatch<SetStateAction<number>>;
}
