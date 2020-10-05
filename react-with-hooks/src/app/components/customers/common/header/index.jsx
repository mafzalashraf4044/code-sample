import React from 'react';

//  styled components
import {
  Header,
  HeaderLeft,
  Title,
  HeaderRight,
} from './styled';

import Button from 'components/common/button';

export default () => {

  return (
    <Header>
      <HeaderLeft>
        <Title>Customers</Title>
      </HeaderLeft>

      <HeaderRight>
        <Button
          text="New Quote"
          bgColor="#dc248d"
          borderColor="#dc248d"
          textColor="#FFF"
        />
      </HeaderRight>

    </Header>
  );
};