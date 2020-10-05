import React, {useState} from 'react';

//  styled components
import {
  Header,
  HeaderLeft,
  Title,
  HeaderRight,
  DropdownButton,
  Menu,
  MenuItem,
  DropdownCaretIcon,
} from './styled';

import Button from 'components/common/button';

export default () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  }

  return (
    <Header>
      <HeaderLeft>
        <Title>Overview</Title>
      </HeaderLeft>

      <HeaderRight>
        <Button
          text="Add New"
          bgColor="#dc248d"
          borderColor="#dc248d"
          textColor="#FFF"
        >
          <DropdownButton
            aria-haspopup="true"
            aria-controls="add-new-menu"
            onClick={handleClick}
          >
            <DropdownCaretIcon />
          </DropdownButton>
        </Button>
        <Menu
          id="add-new-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem onClick={handleClose}>Quick Quote</MenuItem>
          <MenuItem onClick={handleClose}>New Submission</MenuItem>
          <MenuItem onClick={handleClose}>New Property</MenuItem>
          <MenuItem onClick={handleClose}>New Document</MenuItem>
        </Menu>
      </HeaderRight>

    </Header>
  );
};