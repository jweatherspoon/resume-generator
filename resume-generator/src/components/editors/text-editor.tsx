import { TextField, TextFieldProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const { value, setValue, inputProps, readonly } = props;

  return (
    <TextField
      {...inputProps}
      value={value ?? '-'}
      onChange={(e) => setValue?.(e.target.value)}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      disabled={readonly}
    />
  );
};

export default TextEditor;

export interface TextEditorProps {
  inputProps?: TextFieldProps;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  readonly?: boolean;
}
