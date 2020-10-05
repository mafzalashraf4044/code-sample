import styled from 'styled-components';

//  constants
import {
  spacerSm2x,
  spacerMd,
  flexSbFs,
  flexColumnFsFs,
} from 'constants/styles';

export const Overview = styled.div`
  ${flexColumnFsFs}
  margin-right: -${spacerMd};
`;

export const OverviewTop = styled.div`
  width: 100%;
  margin-bottom: ${spacerSm2x};
  padding-right: ${spacerMd};
`;

export const OverviewBottom = styled.div`
  ${flexSbFs}
  width: 100%;
  padding-right: ${spacerMd};
`;