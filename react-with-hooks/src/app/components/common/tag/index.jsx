import React from 'react';

//  styled components
import {
  Tag,
  TagText,
} from './styled';

export default ({
  children,
  bgColor
}) => {
  return (
    <Tag bgColor={bgColor}>
      <TagText>{children}</TagText>
    </Tag>
  );
};