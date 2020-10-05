import styled from 'styled-components';

//  icons
import Customers from 'components/common/icons/Customers';
import Calendar from 'components/common/icons/Calendar';
import Lead from 'components/common/icons/Lead';

//  constants
import {
  headerHeight,
  spacerMd,
  spacerLg,
  spacerXl,
  flexFsFs,
  flexFsC,
  flexColumnFsC,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles'

export const Content = styled.div`
  padding: 0 ${spacerLg} ${spacerXl} ${spacerLg};
`;

export const Header = styled.div`
  ${flexFsC}
  height: ${headerHeight};
`;

export const Title = styled.h1`
  font-size: ${getSizeWrtWidth(28)};
  line-height: ${getSizeWrtWidth(28)};
  color: #FFF;
  font-weight: 800;
  margin: 0;
`;

export const MainItems = styled.div`
  ${flexColumnFsC}
  margin-bottom: ${spacerXl};
`;
  
export const MainItem = styled.div`
  ${flexFsFs}
  width: 100%;
  border-bottom: 1px solid #293373;
  margin-bottom: ${spacerMd};
  padding-bottom: ${spacerMd};
`;

export const CustomersIcon = styled(Customers)`
  width: ${getSizeWrtWidth(35)};
  height: ${getSizeWrtWidth(35)};

  path {
    fill: #dc248d;
  }
`;

export const CalendarIcon = styled(Calendar)`
  width: ${getSizeWrtWidth(30)};
  height: ${getSizeWrtWidth(30)};

  path {
    fill: #dc248d;
  }
`;

export const LeadIcon = styled(Lead)`
  width: ${getSizeWrtWidth(30)};
  height: ${getSizeWrtWidth(30)};

  path {
    fill: #dc248d;
  }
`;

export const MainItemRight = styled.div`
  margin-left: ${spacerMd};
`;

export const MainItemTitle = styled.p`
  font-size: ${getSizeWrtWidth(14)};
  color: #8187ad;
  font-weight: 700;
  margin: 0 0 10px 0;
`;

export const MainItemValue = styled.p`
  font-size: ${getSizeWrtWidth(25)};
  color: #FFF;
  font-weight: 700;
  margin: 0;
`;
