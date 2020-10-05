import styled from 'styled-components';

//  constants
import {
  spacerLg,
  tableRowHeight,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles';

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

export const THead = styled.thead`

`;

export const Tr = styled.tr`
  height: ${tableRowHeight};
  box-shadow: ${props => props.expanded ? 'inset 0 0 0 1px #e1e5e9' : 'inset 0 1px 0 0 #e1e5e9'};

  &:hover {
    background-color: #eee;
  }
`;

export const Th = styled.th`
  font-size: ${getSizeWrtWidth(14)};
  color: #0f203f;
  font-weight: 700;
  text-align: left;
  padding-left: ${spacerLg};
`;

export const TBody = styled.tbody`

`;

export const Td = styled.td`
  font-size: ${getSizeWrtWidth(14)};
  color: #0f203f;
  font-weight: 400;
  text-align: left;
  padding-left: ${spacerLg};
`;

export const ExpandableTr = styled.tr`

`;

export const ExpandableTd = styled.td`
  padding: 0;
  box-shadow: inset 1px 0 0 0px #e1e5e9, inset -1px 0 0 0px #e1e5e9;
`;
