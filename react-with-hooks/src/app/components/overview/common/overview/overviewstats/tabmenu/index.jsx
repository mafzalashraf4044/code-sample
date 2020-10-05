import React from 'react';

//  styled components
import {
  TabMenu,
  DropdownButton,
  Menu,
  MenuItem,
  DropdownCaretIcon,
  AllPoliciesIcon,
  PropertyIcon,
  GeneralLiabilityIcon,
  FloodIcon,
  BuildersRiskIcon,
} from './styled';

export default () => {

  const menuItems = [
    {title: "All Policies", icon: <AllPoliciesIcon />},
    {title: "Property", icon: <PropertyIcon />},
    {title: "General Liability", icon: <GeneralLiabilityIcon />},
    {title: "Flood", icon: <FloodIcon />},
    {title: "Builders Risk", icon: <BuildersRiskIcon />},
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  }

  return (
    <TabMenu>
      <DropdownButton
        aria-haspopup="true"
        aria-controls="tab-dropdwon"
        onClick={handleClick}
      >
        <DropdownCaretIcon />
      </DropdownButton>

      <Menu
        id="tab-dropdwon"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {
          menuItems.map((menuItem, i) => (
            <MenuItem onClick={handleClose}>
              {menuItem.icon}
              <p>{menuItem.title}</p>
            </MenuItem>
          ))
        }
      </Menu>
    </TabMenu>
  );
};