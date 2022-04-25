import { MenuItem, Select, SelectProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const EnumEditor: React.FC<EnumEditorProps> = (props) => {
  const { value, setValue, options, selectProps } = props;

  const possibleSelections = options?.map((x) => (
    <MenuItem value={x} key={x}>
      {x}
    </MenuItem>
  ));

  return (
    <Select
      {...selectProps}
      value={value}
      onChange={(e) => setValue?.(e.target.value as string)}
    >
      {possibleSelections}
    </Select>
  );
};

export default EnumEditor;

export interface EnumEditorProps {
  value?: string;
  options?: string[];
  setValue?: Dispatch<SetStateAction<string>>;
  selectProps?: SelectProps;
}
