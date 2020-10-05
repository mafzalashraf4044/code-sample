import styled from 'styled-components';

//  icons
import Search from 'components/common/icons/Search';
import Filter from 'components/common/icons/Filter';

//  constants
import {
  headerHeight,
  spacerSm,
  spacerMd,
  spacerLg,
  flexSbC,
  flexCC,
  flexFsC,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles';

export const Header = styled.div`
  ${flexSbC}
  width: 100%;
`;

export const HeaderLeft = styled.div`
  ${flexFsC}
  height: ${headerHeight};
`;

export const Title = styled.h1`
  font-size: ${getSizeWrtWidth(28)};
  line-height: ${getSizeWrtWidth(28)};
  color: #03105c;
  font-weight: 800;
  margin: 0 ${spacerLg} 0 0;
`;

export const HeaderRight = styled.div``;