import styled from 'styled-components';

//  icons
import Accordion from 'components/common/icons/Accordion';
import More from 'components/common/icons/More';
import Pencil from 'components/common/icons/Pencil';
import Eye from 'components/common/icons/Eye';
import Delete from 'components/common/icons/Delete';

//  constants
import {
  spacerXs,
  spacerSm,
  spacerMd,
  spacerLg,
  flexCC,
  flexSbC,
  flexFsC,
  flexFsFsWrap,
  flexColumnFsFs,
} from 'constants/styles';

//  utils
import {getSizeWrtWidth} from 'utils/styles'

export const CustomersListTable = styled.div`
  margin-right: -${spacerMd};
`;

export const TableContainer = styled.div`
  position: relative;
  padding-right: ${spacerMd};

  &::after {
    content: "";
    width: calc(100% - ${spacerMd});
    position: absolute;
    bottom: 0;
    height: 1px;
    background: #e1e5e9;
  }
`;

export const Customer = styled.div`
  ${flexFsC}
`;

export const CustomerCheckbox = styled.div`
  ${flexCC}
  width: ${getSizeWrtWidth(44)};
  height: ${getSizeWrtWidth(44)};

  input {
    width: ${getSizeWrtWidth(16)};
    height: ${getSizeWrtWidth(16)};
    border-radius: 3px;
    background-color: #FFF;
    border: 1px solid #a9b2b8;
  }
`;

export const CustomerImage = styled.img`
  width: ${getSizeWrtWidth(44)};
  height: ${getSizeWrtWidth(44)};
  border-radius: 50%;
`;

export const CustomerText = styled.div`
  ${flexColumnFsFs}
  margin-left: 15px;
`;

export const CustomerName = styled.span`
  font-size: ${getSizeWrtWidth(14)};
  color: #0f203f;
  font-weight: 400;
  text-align: left;
  margin: ${spacerXs} 0;
`;

export const CustomerSubText = styled.span`
  font-size: ${getSizeWrtWidth(14)};
  color: ${props => props.color};
  font-weight: 400;
`;

export const PolicyStatus = styled.div`
  ${flexColumnFsFs}
`;

export const Actions = styled.div`
  ${flexSbC}
  z-index: 1;
  position: relative;
  padding-right: ${spacerSm};
`;

export const ActionsLeft = styled.div`
  ${flexSbC}
  z-index: 1;
  position: absolute;
  top: 0;
  right: ${getSizeWrtWidth(100)};
  background-color: #eeeeee;
`;

export const ActionsRight = styled.div`
  ${flexSbC}
`;

export const Action = styled.div`
  ${flexCC}
  margin: 0 ${getSizeWrtWidth(4)};
  cursor: pointer;
  width: ${getSizeWrtWidth(28)};
  height: ${getSizeWrtWidth(28)};
  border-radius: 50%;
  background-color: ${props => props.bg ? props.bg : 'transparent'};
`;

export const AccordionIcon = styled(Accordion)`
  width: ${getSizeWrtWidth(24)};
  height: ${getSizeWrtWidth(24)};
`;

export const MoreIcon = styled(More)`
  width: ${getSizeWrtWidth(24)};
  height: ${getSizeWrtWidth(24)};
`;

export const PencilIcon = styled(Pencil)`
  width: ${getSizeWrtWidth(14)};
  height: ${getSizeWrtWidth(14)};
`;

export const EyeIcon = styled(Eye)`
  width: ${getSizeWrtWidth(14)};
  height: ${getSizeWrtWidth(14)};

  path {
    fill: ${props => props.fill ? props.fill : '#FFF'};
  }
`;

export const DeleteIcon = styled(Delete)`
  width: ${getSizeWrtWidth(14)};
  height: ${getSizeWrtWidth(14)};
`;

export const RowDetails = styled.div`
  ${flexColumnFsFs}
  padding: ${spacerMd} ${spacerLg} 0 ${spacerLg};
  margin-right: ${spacerSm};
`;

export const RowDetailItems = styled.div`
  ${flexFsFsWrap}
  width: 100%;
  margin-bottom: ${spacerMd}
`;

export const RowDetailItem = styled.div`
  ${flexColumnFsFs}
  width: 20%;
`;

export const RowDetailItemTitle = styled.p`
  font-size: ${getSizeWrtWidth(12)};
  color: #868b96;
  font-weight: 700;
  margin: 0 0 ${spacerSm} 0;
`;

export const RowDetailItemValue = styled.p`
  font-size: ${getSizeWrtWidth(14)};
  color: #525c6e;
  font-weight: 700;
  margin: 0;
`;

export const SubmissionItemHeader = styled.div``;

export const SubmissionItemHeaderTop = styled.div``;

export const SubmissionItemId = styled.div`
  font-size: ${getSizeWrtWidth(18)};
  color: #525c6e;
  font-weight: 700;
  margin: 0 0 ${spacerXs} 0;
`;

export const SubmissionItemHeaderBottom = styled.div`
  ${flexFsC}
`;
