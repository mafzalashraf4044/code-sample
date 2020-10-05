import React from 'react';

//  styled components
import {
  Content,
  EditButton,
  EditV2Icon,
  Header,
  UserProfileImage,
  UserFullName,
  UserDetails,
  UserDetail,
  UserDetailIconBg,
  CompanyIcon,
  PhoneIcon,
  EmailIcon,
  UserDetailContent,
  UserDetailTitle,
  UserDetailValue,
  MoreInfoButton,
  MoreInfoButtonText,
  ArrowRightIcon,
  NavItems,
  NavItem,
  CustomerOverviewIcon,
  PoliciesIcon,
  BillingIcon,
  SubmissionIcon,
  DocumentsIcon,
  NavItemTitle
} from './styled';

//  custom components
import Tag from 'components/common/tag';

const LeftSidebarContent = () => {

  const navItems = [
    {title: 'Customers Overview', icon: <CustomerOverviewIcon />},
    {title: 'Policies', icon: <PoliciesIcon />},
    {title: 'Billing', icon: <BillingIcon />},
    {title: 'Submission', icon: <SubmissionIcon />},
    {title: 'Documents', icon: <DocumentsIcon />},
    {title: 'Activies', icon: <PoliciesIcon />},
  ];

  return (
    <Content>
      <EditButton type="button">
        <EditV2Icon />
      </EditButton>
      <Header>
        <UserProfileImage
          src={require('assets/images/profile-image.jpg')}
          alt="user profile image"
        />
        <UserFullName>Donald G Nielsen</UserFullName>
        <Tag bgColor="#00a8d2">Customer</Tag>
      </Header>

      <UserDetails>
        <UserDetail>
          <UserDetailIconBg bgColor="#00d69d32">
            <CompanyIcon />
          </UserDetailIconBg>
          <UserDetailContent>
            <UserDetailTitle>Company name</UserDetailTitle>
            <UserDetailValue>3D Builders LLC</UserDetailValue>
          </UserDetailContent>
        </UserDetail>

        <UserDetail>
          <UserDetailIconBg bgColor="#ffba0032">
            <PhoneIcon />
          </UserDetailIconBg>

          <UserDetailContent>
            <UserDetailTitle>Phone number</UserDetailTitle>
            <UserDetailValue>614-650-5914</UserDetailValue>
          </UserDetailContent>
        </UserDetail>

        <UserDetail>
          <UserDetailIconBg bgColor="#0091ff32">
            <EmailIcon />
          </UserDetailIconBg>

          <UserDetailContent>
            <UserDetailTitle>Email</UserDetailTitle>
            <UserDetailValue>ivory1975@gmail.com</UserDetailValue>
          </UserDetailContent>
        </UserDetail>

        <MoreInfoButton>
          <MoreInfoButtonText>More Info</MoreInfoButtonText>
          <ArrowRightIcon />
        </MoreInfoButton>
      </UserDetails>

      <NavItems>
        {
          navItems.map((navItem, i) => (
            <NavItem key={i}>
              {navItem.icon}
              <NavItemTitle>{navItem.title}</NavItemTitle>
            </NavItem>
          ))
        }
      </NavItems>
    </Content>
  );
};

export default LeftSidebarContent;