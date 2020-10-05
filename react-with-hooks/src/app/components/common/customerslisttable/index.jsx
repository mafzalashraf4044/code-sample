import React from 'react';

//  third party libs
import {isUndefined, isArray} from 'lodash';

//  styled components
import {
  CustomersListTable,
  TableContainer,
  Customer,
  CustomerCheckbox,
  CustomerImage,
  CustomerText,
  CustomerName,
  CustomerSubText,
  PolicyStatus,
  Actions,
  ActionsLeft,
  ActionsRight,
  Action,
  AccordionIcon,
  MoreIcon,
  PencilIcon,
  EyeIcon,
  DeleteIcon,
  RowDetails,
  RowDetailItems,
  RowDetailItem,
  RowDetailItemTitle,
  RowDetailItemValue,
  SubmissionItemHeader,
  SubmissionItemHeaderTop,
  SubmissionItemId,
  SubmissionItemHeaderBottom
} from './styled';

import {
  DescriptionListItem,
  DescriptionListHeader,
  DescriptionListFields,
  DescriptionListField, 
  DescriptionTitle,
  DescriptionValue
} from 'components/common/descriptionlist/styled';

//  third party components
import {Animated} from 'react-animated-css';
import Collapsible from 'react-collapsible';

//  custom components
import Tag from 'components/common/tag';
import Table from 'components/common/table';
import Scrollbar from 'components/common/scrollbar';
import DescriptionList from 'components/common/descriptionlist'; 

export default ({
  columns,
  customers,
  tableHeight,
  showCustomerRole = false,
}) => {

  const renderCustomerColumn = (o, hover) => (
    <Customer>
      {
        hover ?
        <CustomerCheckbox>
          <input type="checkbox" />
        </CustomerCheckbox> :
        <CustomerImage src={require('assets/images/profile-image.jpg')} alt="profile image" />
      }
      
      <CustomerText>
        <CustomerName>{o.name}</CustomerName>
        {showCustomerRole && <Tag bgColor={o.role.bgColor}>{o.role.title}</Tag>}
        
        {!showCustomerRole && o.tasks && <CustomerSubText color="#00a8d2">{o.tasks} Tasks</CustomerSubText>}
        {!showCustomerRole && o.activities && <CustomerSubText color="#fb9213">{o.activities} Activities</CustomerSubText>}
        {!showCustomerRole && o.remarked && <CustomerSubText color="#0aa50a">&#10004; Remarked</CustomerSubText>}
      </CustomerText>
    </Customer>
  );

  const renderPolicyStatusColumn = (o) => (
    <PolicyStatus>
      <Tag bgColor="#26AED4">{o.policyStatus}</Tag>
    </PolicyStatus>
  );
    
  const renderActionsColumn = (o, hover, onAccordionClick) => (
    <Actions>
      <Animated
        isVisible={hover}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDuration={500}
        animationOutDuration={0}
      >
        <ActionsLeft>
          <Action bg="#a5afb5">
            <PencilIcon />
          </Action>
          <Action bg="#a5afb5">
            <EyeIcon />
          </Action>
          <Action bg="#a5afb5">
            <DeleteIcon />
          </Action>
        </ActionsLeft>
      </Animated>

      <ActionsRight>
        <Action onClick={onAccordionClick}>
          <AccordionIcon />
        </Action>
        <Action>
          <MoreIcon />
        </Action>
      </ActionsRight>
    </Actions>
  );

  const renderPolicy = (o, i) => {
    return (
      <DescriptionListItem isArray={!isUndefined(i)} key={i}>
        <DescriptionListHeader>
          <SubmissionItemHeader>
            <SubmissionItemHeaderTop>
              <SubmissionItemId>#{o.id}</SubmissionItemId>
            </SubmissionItemHeaderTop>
            <SubmissionItemHeaderBottom>
              <Tag bgColor="#00a8d2">New</Tag>
              <EyeIcon fill="#525c6e" />
            </SubmissionItemHeaderBottom>
          </SubmissionItemHeader>
        </DescriptionListHeader>
  
        <DescriptionListFields>
          {
            o.details.map((detail, index) => (
              <DescriptionListField key={index}>
                <DescriptionTitle>{detail.title}</DescriptionTitle>
                <DescriptionValue>{detail.value}</DescriptionValue>
              </DescriptionListField>
            ))
          }
        </DescriptionListFields>
      </DescriptionListItem>
    );
  };

  const renderSubmission = (o, i) => {
    return (
      <DescriptionListItem isArray={!isUndefined(i)} key={i}>
        <DescriptionListHeader>
          <SubmissionItemHeader>
            <SubmissionItemHeaderTop>
              <SubmissionItemId>#{o.id}</SubmissionItemId>
            </SubmissionItemHeaderTop>
            <SubmissionItemHeaderBottom>
              <Tag bgColor="#00a8d2">New</Tag>
              <EyeIcon fill="#525c6e" />
            </SubmissionItemHeaderBottom>
          </SubmissionItemHeader>
        </DescriptionListHeader>
  
        <DescriptionListFields>
  
          {
            o.details.map((detail, index) => (
              <DescriptionListField key={index}>
                <DescriptionTitle>{detail.title}</DescriptionTitle>
                <DescriptionValue>
                  {
                    isArray(detail.value) ?
                    detail.value.map((item, i) => (
                      <Tag bgColor="#cbcbcb" key={i}>
                        {item}
                      </Tag>
                    )) : detail.value
                  }
                </DescriptionValue>
              </DescriptionListField>
            ))
          }
  
        </DescriptionListFields>
      </DescriptionListItem>
    );
  };

  const renderRowDetails = (o, open) => (
    <Collapsible open={open}>
      <RowDetails>
        <RowDetailItems>
          <RowDetailItem>
            <RowDetailItemTitle>Referral Source</RowDetailItemTitle>
            <RowDetailItemValue>Internet</RowDetailItemValue>
          </RowDetailItem>

          <RowDetailItem>
            <RowDetailItemTitle>SIC Code</RowDetailItemTitle>
            <RowDetailItemValue>15363647</RowDetailItemValue>
          </RowDetailItem>

          <RowDetailItem>
            <RowDetailItemTitle>Phone Number</RowDetailItemTitle>
            <RowDetailItemValue>+41 2554 5411 533</RowDetailItemValue>
          </RowDetailItem>

          <RowDetailItem>
            <RowDetailItemTitle>Email</RowDetailItemTitle>
            <RowDetailItemValue>albertbennett@dummy.com</RowDetailItemValue>
          </RowDetailItem>

          <RowDetailItem>
            <RowDetailItemTitle>Address</RowDetailItemTitle>
            <RowDetailItemValue>52 Jacolite Street, Western Australia, 6071</RowDetailItemValue>
          </RowDetailItem>
        </RowDetailItems>

        <DescriptionList
          title="Polices"
          data={o.policies}
          renderListItem={renderPolicy}
        />

        <DescriptionList
          title="Submissions"
          data={o.submissions}
          renderListItem={renderSubmission}
        />

      </RowDetails>
    </Collapsible>
  );

  const renderColumn = (i, o, hover, onAccordionClick) => {
    if (columns[i].isCustomer) {
      return renderCustomerColumn(o, hover);
    } else if (columns[i].isPolicyStatus) {
      return renderPolicyStatusColumn(o);
    } else if (columns[i].isActions) {
      return renderActionsColumn(o, hover, onAccordionClick);
    }

    return o[columns[i].key];
  }

  return (
    <CustomersListTable>
      <Scrollbar
        thumbColor="#E7F1F3"
        height={tableHeight}
      >
        <TableContainer>
          <Table
            data={customers}
            columns={columns}
            renderColumn={renderColumn}
            renderRowDetails={renderRowDetails}
          />
        </TableContainer>
      </Scrollbar>
    </CustomersListTable>
  );
};