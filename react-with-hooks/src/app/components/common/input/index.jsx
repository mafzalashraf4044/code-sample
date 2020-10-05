import React from 'react';

//  styled components
import {
  Input,
} from './styled';

export default ({
  label,
  key,
  value,
  handleChange
}) => {
  return (
    <Input
      value={value}
      label={label}
      onChange={e => handleChange(key, e.target.value)}
    />
  );
};