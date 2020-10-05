import styled from 'styled-components';

//  constants
import {
  spacerSm2x,
  spacerMd,
  flexCC,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles';
  
export const Button = styled.div`
  ${flexCC}
  height: ${getSizeWrtWidth(46)};
  border-radius: 4px;
  background-color: ${props => props.bgColor};
  border: ${props => props.borderColor ? `1px solid ${props.borderColor}` : 'none'};
  cursor: pointer;
  padding: 0 ${spacerSm2x};
  margin-left: ${props => props.mL ? spacerMd : 0};
  margin-right: ${props => props.mR ? spacerMd : 0};

  &:focus {
    outline: none;
  }
`;

export const ButtonText = styled.span`
  font-size: ${getSizeWrtWidth(14)};
  color: ${props => props.textColor};
  font-weight: 600;
`;
