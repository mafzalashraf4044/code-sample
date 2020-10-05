import styled from 'styled-components';

//  constants
import {
  spacerXs,
  flexCC,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles';
  
export const Tag = styled.div`
  ${flexCC}
  border-radius: 2px;
  margin-right: ${spacerXs};
  background-color: ${props => props.bgColor};
  padding: ${getSizeWrtWidth(2)} ${spacerXs};
`;

export const TagText = styled.span`
  font-size: ${getSizeWrtWidth(12)};
  color: #FFF;
  font-weight: 700;
`;
