import React from 'react';

//  styled components
import {
  FormControl,
} from './styled'

//  third party components
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

export default ({
  label,
  key,
  value,
  handleChange,
  data
}) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={e => handleChange(key, value)}
      >
        {
          data.map((item, i) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};