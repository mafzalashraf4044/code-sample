import React from 'react';

//  styled components
import {
  Button,
  ButtonText,
} from './styled';

export default ({
  children,
  text,
  bgColor,
  borderColor,
  textColor,
  mL,
  mR,
  onClick
}) => {
  return (
    <Button
      mL={mL}
      mR={mR}
      bgColor={bgColor}
      borderColor={borderColor}
      onClick={onClick}
    >
      <ButtonText textColor={textColor}>{text}</ButtonText>
      {children}
    </Button>
  );
};