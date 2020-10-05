import styled from 'styled-components';

//  constants
import {
  spacerMd,
  flexCC,
  flexFsC,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles';
  
export const CustomersList = styled.div`

`;

export const CustomersListTabs = styled.div`
  ${flexFsC}
  width: 100%
`;

export const CustomersListTab = styled.div`
  width: 20%;
  cursor: pointer;
`;

export const CustomersListTabActiveBorder = styled.div`
  ${flexFsC}
  display: inline-flex;
  padding-right: ${spacerMd};
  border-bottom: 4px solid ${props => props.active ? '#03105c' : 'transparent'};
`;

export const CustomersListTabTitle = styled.h2`
  font-size: ${getSizeWrtWidth(20)};
  line-height: ${getSizeWrtWidth(68)};
  color: #03105c;
  font-weight: 400;
  margin: 0 ${spacerMd} 0 0;
`;