import styled from 'styled-components';

//  constants
import {
  spacerLg,
  spacerXl,
  pageContentBg,
  pageContentWidth,
} from 'constants/styles';

export const PageContent = styled.div`
  padding: 0 ${spacerLg} ${spacerXl} ${spacerLg};
  height: 100%;
  width: ${pageContentWidth};
  background-color: ${props => props.bgColor || pageContentBg};
`;
