import React from 'react';

//  styled components
import {
  Content,
  Header,
  Title,
  MainItems,
  MainItem,
  CustomersIcon,
  CalendarIcon,
  LeadIcon,
  MainItemRight,
  MainItemTitle,
  MainItemValue,
} from './styled';

const LeftSidebarContent = () => {
  return (
    <Content>
      <Header>
        <Title>Overview</Title>
      </Header>

      <MainItems>
        <MainItem>
          <CustomersIcon />

          <MainItemRight>
            <MainItemTitle>Total Customers</MainItemTitle>
            <MainItemValue>125,266</MainItemValue>
          </MainItemRight>
        </MainItem>

        <MainItem>
          <CalendarIcon />

          <MainItemRight>
            <MainItemTitle>New Today</MainItemTitle>
            <MainItemValue>+8</MainItemValue>
          </MainItemRight>
        </MainItem>

        <MainItem>
          <LeadIcon />

          <MainItemRight>
            <MainItemTitle>Online</MainItemTitle>
            <MainItemValue>10</MainItemValue>
          </MainItemRight>
        </MainItem>
      </MainItems>

    </Content>
  );
};

export default LeftSidebarContent;