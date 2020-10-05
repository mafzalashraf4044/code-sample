import React from 'react';

//  styled components
import { PageContent } from './styled';

export default ({
  children,
  bgColor,
}) => (
  <PageContent bgColor={bgColor}>
    {children}
  </PageContent>
);