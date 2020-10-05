import styled from 'styled-components';

//  icons
import Add from 'components/common/icons/Add';
import Flood from 'components/common/icons/Flood';
import GeneralLiability from 'components/common/icons/GeneralLiability';
import Property from 'components/common/icons/Property';
import Policies from 'components/common/icons/Policies';
import Accordion from 'components/common/icons/Accordion';

//  constants
import {
  spacerXs,
  spacerSm,
  spacerMd,
  flexSbC,
  flexCC,
  flexFsC,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles';

export const PortfolioSummary = styled.div`
  width: calc(70% - ${spacerSm});
  border-radius: 4px;
  background-color: #FFF;
  padding: ${spacerMd};
`;

export const Header = styled.div`
  ${flexSbC}
  width: 100%;
  margin-bottom: ${spacerMd};
`;

export const Title = styled.div`
  font-size: ${getSizeWrtWidth(20)};
  line-height: ${getSizeWrtWidth(20)};
  color: #03105c;
  font-weight: 700;
`;

export const AddPropertyButton = styled.div`
  ${flexFsC}  
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const AddIcon = styled(Add)`
  width: ${getSizeWrtWidth(16)};
  height: ${getSizeWrtWidth(30)};

  path {
    fill: #00a8d2;
  }
`;

export const AddPropertyButtonText = styled.p`
  font-size: ${getSizeWrtWidth(14)};
  line-height: ${getSizeWrtWidth(30)};
  color: #191f2a;
  font-weight: 600;
  margin: 0 0 0 ${spacerXs};
`;

export const PortfolioContent = styled.div`
  margin-right: -${getSizeWrtWidth(12)};
`;

export const PortfolioList = styled.div`
  padding-right: ${getSizeWrtWidth(12)};
`;

export const CoveragePremiums = styled.div`
  ${flexFsC}
  margin-right: ${spacerMd};
`;

export const CoveragePremium = styled.div`
  ${flexFsC}
  margin: 0 ${spacerMd} 0 0;
`;

export const FloodIcon = styled(Flood)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #00a8d2;
  }
`;

export const GeneralLiabilityIcon = styled(GeneralLiability)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #00a8d2;
  }
`;

export const PropertyIcon = styled(Property)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #00a8d2;
  }
`;

export const PoliciesIcon = styled(Policies)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #00a8d2;
  }
`;

export const CoveragePremiumValue = styled.p`
  font-size: ${getSizeWrtWidth(14)};
  color: #525c6e;
  font-weight: 700;
  margin: 0 0 0 ${spacerXs};
`;

export const ExpandButton = styled.button`
  ${flexCC}
  align-self: center;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const AccordionIcon = styled(Accordion)`
  width: ${getSizeWrtWidth(20)};
  height: ${getSizeWrtWidth(20)};

  path {
    fill: #00a8d2;
  }
`;
