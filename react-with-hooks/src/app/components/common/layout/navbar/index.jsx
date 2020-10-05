import React from 'react';

//  styled components
import {
  Nav,
  HomeIcon,
  NavItems,
  NavItem,
  DashboardIcon,
  LeadIcon,
  CustomersIcon,
  InfoIcon,
  HomeLink,
  NavBottom,
  ActionButton,
  NotificationIcon,
  SettingsIcon,
  NotificationLabel,
  ProfileImageButton,
  ProfileImage,
} from './styled';

const Navbar = () => {

  const navItems = [
    {title: 'Dashboard', to: '/', icon: <DashboardIcon />},
    {title: 'Lead', to: 'customers', icon: <LeadIcon />},
    {title: 'Customers', to: '/customers-list', icon: <CustomersIcon />},
    {title: 'Info', to: '/info', icon: <InfoIcon />},
  ];

  return (
    <Nav>
      <NavItems>
        <HomeLink to="/">
          <HomeIcon />
        </HomeLink>
        {
          navItems.map((navItem, i) => (
            <NavItem to={navItem.to} key={i}>
              {navItem.icon}
            </NavItem>
          ))
        }
      </NavItems>
      <NavBottom>
        <ActionButton href="#">
          <SettingsIcon />
        </ActionButton>
        <ActionButton href="#">
          <NotificationLabel>
            <span>2</span>
          </NotificationLabel>
          <NotificationIcon />
        </ActionButton>

        <ProfileImageButton>
          <ProfileImage
            src={require('assets/images/profile-image.jpg')}
            alt="profile image"
          />
        </ProfileImageButton>
      </NavBottom>
    </Nav>
  );
};

export default Navbar;