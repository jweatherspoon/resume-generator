import { Checkbox } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

const BooleanEditor: React.FC<BooleanEditorProps> = (props) => {
  const { value, setValue } = props;

  return (
    <Checkbox checked={value ?? false} onChange={(e) => setValue?.(!value)} />
  );
};

export default BooleanEditor;

export interface BooleanEditorProps {
  value?: boolean;
  setValue?: Dispatch<SetStateAction<boolean>>;
}
