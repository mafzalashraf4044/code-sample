import styled from 'styled-components';

//  icons
import EditV2 from 'components/common/icons/EditV2';
import Company from 'components/common/icons/Company';
import Phone from 'components/common/icons/Phone';
import Email from 'components/common/icons/Email';
import ArrowRight from 'components/common/icons/ArrowRight';
import CustomerOverview from 'components/common/icons/CustomerOverview';
import Policies from 'components/common/icons/Policies';
import Billing from 'components/common/icons/Billing';
import Submission from 'components/common/icons/Submission';
import Documents from 'components/common/icons/Documents';

//  constants
import {
  spacerXs,
  spacerSm2x,
  spacerMd,
  spacerLg,
  spacerXl,
  flexColumnCC,
  flexFsFs,
  flexFsC,
  flexCC,
  flexColumnFsC,
  flexColumnCFs,
  flexColumnFsFs,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles'

export const Content = styled.div`
  padding: 0 ${spacerLg} ${spacerXl} ${spacerLg};
`;

export const Header = styled.div`
  ${flexColumnCC}
  width: 100%;
  margin-top: ${spacerXl};
  position: relative;
`;

export const EditButton = styled.button`
  position: absolute;
  right: ${getSizeWrtWidth(15)};
  top: ${getSizeWrtWidth(15)};
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const EditV2Icon = styled(EditV2)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #00a8d2;
  }
`;

export const UserProfileImage = styled.img`
  width: ${getSizeWrtWidth(104)};
  height: ${getSizeWrtWidth(104)};
  border-radius: 50%;
`;

export const UserFullName = styled.h1`
  font-size: ${getSizeWrtWidth(20)};
  color: #FFF;
  font-weight: 700;
  text-align: center;
`;

export const UserDetails = styled.div`
  ${flexColumnFsFs}
  width: 100%;
  margin: ${spacerLg} 0;
`;

export const UserDetail = styled.div`
  ${flexFsC}
  width: 100%;
  margin-bottom: ${spacerSm2x};
`;

export const UserDetailIconBg = styled.div`
  ${flexCC}
  width: ${getSizeWrtWidth(42)};
  height: ${getSizeWrtWidth(42)};
  border-radius: 50%;
  background-color: ${props => props.bgColor};
`;

export const CompanyIcon = styled(Company)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #00d69d;
  }
`;

export const PhoneIcon = styled(Phone)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #ffba00;
  }
`;

export const EmailIcon = styled(Email)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #0091ff;
  }
`;

export const UserDetailContent = styled.div`
  ${flexColumnCFs}
  margin-left: ${spacerMd};
`;

export const UserDetailTitle = styled.div`
  font-size: ${getSizeWrtWidth(12)};
  color: #00a8d2;
  font-weight: 400;
  margin-bottom: ${spacerXs};
`;

export const UserDetailValue = styled.div`
  font-size: ${getSizeWrtWidth(14)};
  color: #FFF;
  font-weight: 400;
`;

export const MoreInfoButton = styled.button`
  ${flexFsC}  
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: ${getSizeWrtWidth(42)};

  &:focus {
    outline: none;
  }
`;

export const MoreInfoButtonText = styled.div`
  font-size: ${getSizeWrtWidth(12)};
  line-height: ${getSizeWrtWidth(16)};
  color: #00a8d2;
  font-weight: 400;
  margin-right: ${spacerXs};
`;

export const ArrowRightIcon = styled(ArrowRight)`
  width: ${getSizeWrtWidth(16)};
  height: ${getSizeWrtWidth(16)};

  path {
    fill: #00a8d2;
  }
`;

export const NavItems = styled.div`
  ${flexColumnFsC}
  border-top: 1px solid #293373;
  margin-bottom: ${spacerXl};
  margin: 0 -${spacerLg};
`;
  
export const NavItem = styled.div`
  ${flexFsFs}
  width: 100%;
  cursor: pointer;
  border-bottom: 1px solid #293373;
  padding: ${spacerMd} ${spacerLg};

  &:hover {
    background-color: #dc248d32;
    box-shadow: inset -${getSizeWrtWidth(15)} 0 #dc248d;
  }
`;

export const CustomerOverviewIcon = styled(CustomerOverview)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};
  margin: 0 ${getSizeWrtWidth(10.5)};
`;

export const PoliciesIcon = styled(Policies)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};
  margin: 0 ${getSizeWrtWidth(10.5)};
`;

export const BillingIcon = styled(Billing)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};
  margin: 0 ${getSizeWrtWidth(10.5)};
`;

export const SubmissionIcon = styled(Submission)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};
  margin: 0 ${getSizeWrtWidth(10.5)};
`;

export const DocumentsIcon = styled(Documents)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};
  margin: 0 ${getSizeWrtWidth(10.5)};
`;

export const NavItemTitle = styled.p`
  font-size: ${getSizeWrtWidth(14)};
  color: #FFF;
  font-weight: 700;
  margin: 0 0 0 ${getSizeWrtWidth(15)};
`;