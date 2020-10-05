import React from 'react';

//  styled components
import {
  Header,
  HeaderLeft,
  Title,
  SearchBox,
  SearchIcon,
  SearchInput,
  FilterButton,
  FilterIcon,
  HeaderRight,
} from './styled';

import Button from 'components/common/button';

export default ({toggleSidebar}) => {

  return (
    <Header>
      <HeaderLeft>
        <Title>Customers List</Title>

        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search Customers"
          />
        </SearchBox>

        <FilterButton>
          <FilterIcon />
          <span>Filter</span>
        </FilterButton>
      </HeaderLeft>

      <HeaderRight>
        <Button
          text="New Customer"
          bgColor="#dc248d"
          borderColor="#dc248d"
          textColor="#FFF"
          onClick={toggleSidebar}
        />
      </HeaderRight>

    </Header>
  );
};