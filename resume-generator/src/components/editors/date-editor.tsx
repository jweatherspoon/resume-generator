import { Input, InputProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const DateEditor: React.FC<DateEditorProps> = (props) => {
  const { value, setValue, inputProps, format } = props;

  const date = value ?? new Date();
  return (
    <Input
      {...inputProps}
      type='date'
      value={date.toISOString().substring(0, 10)}
      onChange={(e) => setValue?.(new Date(e.target.value))}
    />
  );
};

export default DateEditor;

export interface DateEditorProps {
  inputProps?: InputProps;
  format?: string;
  value?: Date;
  setValue?: Dispatch<SetStateAction<Date>>;
}
