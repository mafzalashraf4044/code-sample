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
  List,
  ListItem,
  ListItemLeft,
  ListItemBullet,
  ListItemTitle,
  ListItemRight
} from './styled';

//  icons
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';

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
            <MainItemTitle>Customers</MainItemTitle>
            <MainItemValue>105,266</MainItemValue>
          </MainItemRight>
        </MainItem>

        <MainItem>
          <CalendarIcon />

          <MainItemRight>
            <MainItemTitle>Prospects</MainItemTitle>
            <MainItemValue>10,321</MainItemValue>
          </MainItemRight>
        </MainItem>

        <MainItem>
          <LeadIcon />

          <MainItemRight>
            <MainItemTitle>Leads</MainItemTitle>
            <MainItemValue>5,852</MainItemValue>
          </MainItemRight>
        </MainItem>
      </MainItems>

      <List>
        <ListItem withMarginBottom>
          <ListItemLeft>
            <ListItemBullet icon={faDotCircle} color="#0e8bf9" />
            <ListItemTitle>Open Tasks</ListItemTitle>
          </ListItemLeft>
          <ListItemRight>26</ListItemRight>
        </ListItem>

        <ListItem>
          <ListItemLeft>
            <ListItemBullet icon={faDotCircle} color="#32c632" />
            <ListItemTitle>New Business</ListItemTitle>
          </ListItemLeft>
          <ListItemRight>$123,456</ListItemRight>
        </ListItem>

        <ListItem>
          <ListItemLeft>
            <ListItemBullet icon={faDotCircle} color="#da248c" />
            <ListItemTitle>Renewal</ListItemTitle>
          </ListItemLeft>
          <ListItemRight>$81,456</ListItemRight>
        </ListItem>

        <ListItem>
          <ListItemLeft>
            <ListItemBullet icon={faDotCircle} color="#ff9413" />
            <ListItemTitle>Quoted</ListItemTitle>
          </ListItemLeft>
          <ListItemRight>$57,456</ListItemRight>
        </ListItem>

        <ListItem withMarginBottom>
          <ListItemLeft>
            <ListItemBullet icon={faDotCircle} color="#863fa4" />
            <ListItemTitle>Lost Business</ListItemTitle>
          </ListItemLeft>
          <ListItemRight>$93,456</ListItemRight>
        </ListItem>

        <ListItem>
          <ListItemLeft>
            <ListItemBullet icon={faDotCircle} color="#886cff" />
            <ListItemTitle>Renewal Retention</ListItemTitle>
          </ListItemLeft>
          <ListItemRight>45%</ListItemRight>
        </ListItem>

        <ListItem>
          <ListItemLeft>
            <ListItemBullet icon={faDotCircle} color="#58cc8f" />
            <ListItemTitle>Closing Ratio</ListItemTitle>
          </ListItemLeft>
          <ListItemRight>86%</ListItemRight>
        </ListItem>

        <ListItem>
          <ListItemLeft>
            <ListItemBullet icon={faDotCircle} color="#e96137" />
            <ListItemTitle>Aged Receivables</ListItemTitle>
          </ListItemLeft>
          <ListItemRight>$123,456</ListItemRight>
        </ListItem>
      </List>
    </Content>
  );
};

export default LeftSidebarContent;