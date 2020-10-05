import styled from 'styled-components';

//  constants
import {
  leftSidebarBg,
  leftSidebarWidth,
} from 'constants/styles';

export const LeftSidebar = styled.div`
  width: ${leftSidebarWidth};
  height: 100%;
  background-color: ${leftSidebarBg};
`;