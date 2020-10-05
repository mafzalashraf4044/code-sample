import styled from 'styled-components';

//  icon
import Add from 'components/common/icons/Add';
import Close from 'components/common/icons/Close';
import Commercial from 'components/common/icons/Commercial';
import Reo from 'components/common/icons/Reo';
import Personal from 'components/common/icons/Personal';
import AccordionPopupOpen from 'components/common/icons/AccordionPopupOpen';
import AccordionPopupClose from 'components/common/icons/AccordionPopupClose';
import Edit from 'components/common/icons/Edit';
import Delete from 'components/common/icons/Delete';

//  constants
import {
  headerHeight,
  spacerXs,
  spacerSm,
  spacerMd,
  spacerLg,
  spacerXl,
  flexSbC,
  flexCC,
  flexFeC,
  flexFsC,
  flexColumnCC,
  flexColumnFsFs,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles';

export const AddNewCustomer = styled.div`
  ${flexColumnFsFs}
  position: relative;
  padding: 0 ${spacerLg} ${spacerXl} ${spacerLg};
`;

export const CloseButton = styled.button`
  border: none;
  background-color: #FFF;
  position: absolute;
  right: ${spacerLg};
  top: ${spacerLg};
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const CloseIcon = styled(Close)`
  width: ${getSizeWrtWidth(14)};
  height: ${getSizeWrtWidth(14)};
`;

export const Header = styled.div`
  ${flexFsC}
  height: ${headerHeight};
`;

export const Title = styled.h1`
  font-size: ${getSizeWrtWidth(22)};
  color: #03105c;
  font-weight: 800;
  margin: 0;
`;

export const Section = styled.div`
  width: 100%;
  margin-bottom: ${spacerLg};
`;

export const SectionTitle = styled.h2`
  font-size: ${getSizeWrtWidth(18)};
  color: #0f203f;
  font-weight: 700;
  margin: 0 0 ${spacerMd} 0;
`;

export const SectionContent = styled.div`
  width: 100%;
`;

export const Departments = styled.div`
  ${flexFsC}
`;

export const Department = styled.div`
  ${flexColumnCC}
  width: ${getSizeWrtWidth(133)};
  height: ${getSizeWrtWidth(133)};
  border-radius: 10px;
  background-color: rgba(213,213,213,0.1);
  border: 1px solid #00a8d2;
  cursor: pointer;
  margin-right: ${spacerMd};

  &:hover {
    background-color: #00a8d2;
    
    p {
      color: #FFF;
    }

    path {
      fill: #FFF;
    }
  }
`;

export const CommercialIcon = styled(Commercial)`
  width: ${getSizeWrtWidth(50)};
  height: ${getSizeWrtWidth(50)};
`;

export const ReoIcon = styled(Reo)`
  width: ${getSizeWrtWidth(50)};
  height: ${getSizeWrtWidth(50)};
`;

export const PersonalIcon = styled(Personal)`
  width: ${getSizeWrtWidth(50)};
  height: ${getSizeWrtWidth(50)};
`;

export const DepartmentTitle = styled.p`
  font-size: ${getSizeWrtWidth(14)};
  color: #00a8d2;
  font-weight: 400;
  margin: ${spacerSm} 0 0 0;
`;

export const SectionExpandable = styled.div`
  width: 100%;
`;

export const SectionExpandableHeader = styled.div`
  ${flexSbC}
  background-color: ${props => props.expanded ? '#FFF' : '#f7f7f7'};
  margin: 0 -${spacerLg};
  padding: ${spacerMd} ${spacerLg};
`;

export const SectionExpandableHeaderLeft = styled.div`
  ${flexFsC}
`;

export const SectionExpandableHeaderRight = styled.div``;

export const SectionExpandableTitle = styled.h2`
  font-size: ${getSizeWrtWidth(18)};
  color: #0f203f;
  font-weight: 700;
  margin: 0;
`;

export const AddPolicyButton = styled.div`
  ${flexFsC}  
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0 0 0 ${spacerSm};

  &:focus {
    outline: none;
  }
`;

export const AddIcon = styled(Add)`
  width: ${getSizeWrtWidth(16)};
  height: ${getSizeWrtWidth(30)};

  path {
    fill: #1bcab1;
  }
`;

export const AddPolicyButtonText = styled.p`
  font-size: ${getSizeWrtWidth(14)};
  line-height: ${getSizeWrtWidth(30)};
  color: #1a92db;
  font-weight: 600;
  margin: 0 0 0 ${spacerXs};
`;

export const SectionContentToggleButton = styled.button`
  ${flexCC}  
  border: none;
  cursor: pointer;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const AccordionPopupOpenIcon = styled(AccordionPopupOpen)`
  width: ${getSizeWrtWidth(22)};
  height: ${getSizeWrtWidth(22)};
`;

export const AccordionPopupCloseIcon = styled(AccordionPopupClose)`
  width: ${getSizeWrtWidth(22)};
  height: ${getSizeWrtWidth(22)};
`;

export const PolicyInfoItemHeader = styled.div`
  ${flexColumnFsFs}
`;

export const PolicyInfoItemHeaderTop = styled.div`;
  ${flexFsC};
`;

export const PolicyInfoItemValue = styled.p`;
  font-size: ${getSizeWrtWidth(24)};
  color: #03105c;
  font-weight: 700;
  margin: 0 ${spacerSm} 0 0;
`;

export const PolicyInfoItemType = styled.div`
  font-size: ${getSizeWrtWidth(14)};
  color: #525c6e;
  font-weight: 700;
  margin: ${spacerSm} 0;
`;

export const PolicyInfoItemHeaderBottom = styled.div`
  ${flexFsC}
`;

export const PolicyInfoItemActionButton = styled.button`;
  ${flexCC}  
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 ${spacerSm} 0 0;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const EditIcon = styled(Edit)`;
  width: ${getSizeWrtWidth(16)};
  height: ${getSizeWrtWidth(16)};

  path {
    fill: #525c6e;
  }
`;

export const DeleteIcon = styled(Delete)`;
  width: ${getSizeWrtWidth(16)};
  height: ${getSizeWrtWidth(16)};

  path {
    fill: #525c6e;
  }
`;

export const ActionButtons = styled.div`
  ${flexFeC}
  width: 100%;
  margin: ${spacerMd} 0;
`;