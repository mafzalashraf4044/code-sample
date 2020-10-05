import styled from 'styled-components';
import { Link } from 'react-router-dom';

//  icons
import Dashboard from 'components/common/icons/Dashboard';
import Lead from 'components/common/icons/Lead';
import Customers from 'components/common/icons/Customers';
import Info from 'components/common/icons/Info';
import Notification from 'components/common/icons/Notification';
import Settings from 'components/common/icons/Settings';
import Personal from 'components/common/icons/Personal';

//  constants
import {
  navWidth,
  navBg,
  spacerXs,
  spacerSm,
  spacerMd,
  spacerXl,
  flexCC,
  flexColumnSbC,
  flexColumnFsC,
} from 'constants/styles';

//  utils
import { getSizeWrtWidth } from '../../../../utils/styles';

export const Nav = styled.div`
  ${flexColumnSbC}
  width: ${navWidth};
  height: 100%;
  background-color: ${navBg};
  box-shadow: 0px 20px 52px rgba(0,0,0,0.25);
`;

export const HomeIcon = styled(Personal)`
  width: ${getSizeWrtWidth(40)};
  height: ${getSizeWrtWidth(40)};

  path {
    fill: #FFF;
  }
`;

export const NavItems = styled.div`
  ${flexColumnFsC}
`;

export const NavItem = styled(Link)`
  ${flexCC}
  width: ${navWidth};
  margin: ${spacerMd} 0;
`;

export const DashboardIcon = styled(Dashboard)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #8492a8;
  }
`;

export const LeadIcon = styled(Lead)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #8492a8;
  }
`;

export const CustomersIcon = styled(Customers)`
  width: ${getSizeWrtWidth(25)};
  height: ${getSizeWrtWidth(25)};

  path {
    fill: #8492a8;
  }
`;

export const InfoIcon = styled(Info)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #8492a8;
  }
`;

export const HomeLink = styled(Link)`
  ${flexCC}  
  width: ${navWidth};
  height: ${navWidth};
  background-color: #00a8d2;
  margin-bottom: ${spacerXl};
`;

export const NavBottom = styled.div`
  ${flexColumnFsC}
  margin-bottom: ${spacerXl};
`;

export const ActionButton = styled.button`
  ${flexCC}  
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: ${spacerXs} 0;

  &:focus {
    outline: none;
  }
`;

export const NotificationIcon = styled(Notification)`
  width: ${getSizeWrtWidth(22)};
  height: ${getSizeWrtWidth(22)};
`;

export const SettingsIcon = styled(Settings)`
  width: ${getSizeWrtWidth(22)};
  height: ${getSizeWrtWidth(22)};
`;

export const NotificationLabel = styled.div`
  ${flexCC}
  position: absolute;
  right: -${getSizeWrtWidth(10)};
  top: -${getSizeWrtWidth(10)};
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};
  border-radius: 50%;
  background-color: #ed5454;
  border: 2px solid #101f77;

  span {
    color: #FFF;
    font-size: ${getSizeWrtWidth(10)};
  }
`;

export const ProfileImageButton = styled.button`
  ${flexCC}
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: ${spacerSm} 0;

  &:focus {
    outline: none;
  }
`;

export const ProfileImage = styled.img`
  width: ${getSizeWrtWidth(43)};
  height: ${getSizeWrtWidth(43)};
  border-radius: 50%;
`;
