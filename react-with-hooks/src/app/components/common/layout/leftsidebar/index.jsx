import React from 'react';

//  styled components
import {
  LeftSidebar,
} from './styled';

//  custom components
import Scrollbar from 'components/common/scrollbar';

//  constants
import {
  scrollThumbBgDark,
} from 'constants/styles';

export default ({children}) => (
  <LeftSidebar>
    <Scrollbar
      thumbColor={scrollThumbBgDark}
      height={window.innerHeight}
    >
      {children}
    </Scrollbar>
  </LeftSidebar>
);