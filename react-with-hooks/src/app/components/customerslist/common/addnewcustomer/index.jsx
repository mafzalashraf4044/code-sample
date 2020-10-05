import React, {useState} from 'react';

//  third party libs
import {isUndefined} from 'lodash';

//  styled components
import {
  AddNewCustomer,
  CloseButton,
  CloseIcon,
  Header,
  Title,
  Section,
  SectionTitle,
  SectionContent,
  Departments,
  Department,
  CommercialIcon,
  ReoIcon,
  PersonalIcon,
  DepartmentTitle,
  SectionExpandable,
  SectionExpandableHeader,
  SectionExpandableHeaderLeft,
  SectionExpandableHeaderRight,
  AddPolicyButton,
  AddIcon,
  AddPolicyButtonText,
  SectionExpandableTitle,
  SectionContentToggleButton,
  AccordionPopupCloseIcon,
  AccordionPopupOpenIcon,
  PolicyInfoItemHeader,
  PolicyInfoItemHeaderTop,
  PolicyInfoItemValue,
  PolicyInfoItemActionButton,
  EditIcon,
  DeleteIcon,
  PolicyInfoItemType,
  PolicyInfoItemHeaderBottom,
  ActionButtons,
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
import Sidebar from 'react-sidebar';
import Collapsible from 'react-collapsible';

//  custom components
import AddNewPolicy from './addnewpolicy'
import Tag from 'components/common/tag';
import Button from 'components/common/button';
import Input from 'components/common/input';
import SelectInput from 'components/common/selectinput';
import Scrollbar from 'components/common/scrollbar';
import DescriptionList from 'components/common/descriptionlist'; 

const policiesInfo = [
  {
    type: 'Automobile',
    amount: '$2,500',
    details: [
      {title: 'Effective Date', value: '14 Dec 2018'},
      {title: 'Expiration Date', value: '14 Dec 2019'},
      {title: 'Line of Business', value: 'Automobile'},
      {title: 'Writing Company', value: 'All State'},
      {title: 'Parent Company', value: 'Nationwide'},
      {title: 'Annual Premium', value: '$2,500'},
    ]
  },
  {
    type: 'Automobile',
    amount: '$2,500',
    details: [
      {title: 'Effective Date', value: '14 Dec 2018'},
      {title: 'Expiration Date', value: '14 Dec 2019'},
      {title: 'Line of Business', value: 'Automobile'},
      {title: 'Writing Company', value: 'All State'},
      {title: 'Parent Company', value: 'Nationwide'},
      {title: 'Annual Premium', value: '$2,500'},
    ]
  },
];

export default ({
  open,
  toggle
}) => {

  const [contactInfoExpanded, setContactInfoExpanded] = useState(false);
  const [policyInfoExpanded, setPolicyInfoExpanded] = useState(false);
  const [isAddNewPolicyModalOpen, setIsAddNewPolicyModalOpen] = useState(false);

  const toggleContactInfo = () => setContactInfoExpanded(!contactInfoExpanded);
  const togglePolicyInfo = () => setPolicyInfoExpanded(!policyInfoExpanded);

  const renderPolicyInfo = (o, i) => {
    return (
      <DescriptionListItem isArray={!isUndefined(i)} key={i}>
        <DescriptionListHeader>
          <PolicyInfoItemHeader>
            <PolicyInfoItemHeaderTop>
              <PolicyInfoItemValue>{o.amount}</PolicyInfoItemValue>
              <Tag bgColor="#00a8d2">New</Tag>
            </PolicyInfoItemHeaderTop>
            <PolicyInfoItemType>{o.type}</PolicyInfoItemType>
            <PolicyInfoItemHeaderBottom>
              <PolicyInfoItemActionButton>
                <DeleteIcon />
              </PolicyInfoItemActionButton>
              <PolicyInfoItemActionButton>
                <EditIcon />
              </PolicyInfoItemActionButton>              
            </PolicyInfoItemHeaderBottom>
          </PolicyInfoItemHeader>
        </DescriptionListHeader>
  
        <DescriptionListFields fieldsPerRow={3}>
          {
            o.details.map((detail, index) => (
              <DescriptionListField key={index} minWidth={100/3}>
                <DescriptionTitle>{detail.title}</DescriptionTitle>
                <DescriptionValue>{detail.value}</DescriptionValue>
              </DescriptionListField>
            ))
          }
        </DescriptionListFields>
      </DescriptionListItem>
    );
  }

  const renderAddNewCustomer = () => {
    return (
      <Scrollbar
        thumbColor="#E7F1F3"
        height={window.innerHeight}
      >
        <AddNewCustomer>
          <CloseButton type="button" onClick={toggle}>
            <CloseIcon />
          </CloseButton>
          <Header>
            <Title>Add New Customer</Title>
          </Header>
  
          <Section>
            <SectionTitle>Select a Department</SectionTitle>
            <SectionContent>
              <Departments>
                <Department>
                  <CommercialIcon />
                  <DepartmentTitle>Commercial</DepartmentTitle>
                </Department>
                <Department>
                  <ReoIcon />
                  <DepartmentTitle>REO</DepartmentTitle>
                </Department>
                <Department>
                  <PersonalIcon />
                  <DepartmentTitle>Personal</DepartmentTitle>
                </Department>
              </Departments>
            </SectionContent>
          </Section>
          
          <Section>
            <SectionTitle>Customer Info</SectionTitle>
            <SectionContent>
              <Input
                label="Customer Name"
              />

              <SelectInput
                label="Entity Type"
                data={[
                  { label: "Option 1", value: 1 },
                  { label: "Option 2", value: 2 },
                  { label: "Option 3", value: 3 },
                ]}
              />

              <SelectInput
                label="Industry Type SIC Search"
                data={[
                  { label: "Option 1", value: 1 },
                  { label: "Option 2", value: 2 },
                  { label: "Option 3", value: 3 },
                ]}
              />

              <Input
                label="Industry Sub type or Discretion SIC Search"
              />

              <Input
                label="Phone Number"
              />

              <Input
                label="Email Address"
              />

              <Input
                label="Customer First Name"
              />

              <Input
                label="Customer Last Name"
              />

              <Input
                label="Executive"
              />

              <Input
                label="Representative"
              />

              <Input
                label="Referral Source"
              />
            </SectionContent>
          </Section>
  
          <SectionExpandable>
            <SectionExpandableHeader expanded={contactInfoExpanded}>
              <SectionExpandableTitle>Contact Info</SectionExpandableTitle>
              <SectionContentToggleButton onClick={toggleContactInfo}>
                {contactInfoExpanded ? <AccordionPopupCloseIcon /> : <AccordionPopupOpenIcon />}
              </SectionContentToggleButton>
            </SectionExpandableHeader>
            <Collapsible open={contactInfoExpanded}>
              <SectionContent>
                <p>That the quick brown fox jumps over the lazy dog. That the quick brown fox jumps over the lazy dog. That the quick brown fox jumps over the lazy dog. That the quick brown fox jumps over the lazy dog. That the quick brown fox jumps over the lazy dog.</p>
              </SectionContent>
            </Collapsible>
          </SectionExpandable>
  
          <SectionExpandable>
            <SectionExpandableHeader expanded={policyInfoExpanded}>
              <SectionExpandableHeaderLeft>
                <SectionExpandableTitle>Policy/Quote Info</SectionExpandableTitle>
                <AddPolicyButton onClick={() => setIsAddNewPolicyModalOpen(true)}>
                  <AddIcon />
                  <AddPolicyButtonText>Add Policy</AddPolicyButtonText>
                </AddPolicyButton>
              </SectionExpandableHeaderLeft>
              <SectionExpandableHeaderRight>
                <SectionContentToggleButton onClick={togglePolicyInfo}>
                  {policyInfoExpanded ? <AccordionPopupCloseIcon /> : <AccordionPopupOpenIcon />}
                </SectionContentToggleButton>
              </SectionExpandableHeaderRight>
            </SectionExpandableHeader>
            <Collapsible open={policyInfoExpanded}>
              <SectionContent>
                {
                  policiesInfo.map((policyInfo, i) => (
                    <DescriptionList
                      key={i}
                      data={policyInfo}
                      renderListItem={renderPolicyInfo}
                    />
                  ))
                }

              </SectionContent>
            </Collapsible>
          </SectionExpandable>
          <ActionButtons>
            <Button
              mR
              text="Discard"
              bgColor="#FFF"
              borderColor="#dc248d"
              textColor="#dc248d"
            />
            <Button
              text="Save"
              bgColor="#dc248d"
              borderColor="#dc248d"
              textColor="#FFF"
            />
          </ActionButtons>
        </AddNewCustomer>
      </Scrollbar>
    );
  };

  return (
    <React.Fragment>
      <Sidebar
        open={open}
        pullRight={true}
        onSetOpen={toggle}
        sidebar={renderAddNewCustomer()}
        styles={{ 
          ...(!open && {root: {zIndex: -1}}),
          sidebar: { background: "white", width: "40%" }
         }}
      />
      <AddNewPolicy 
        isOpen={isAddNewPolicyModalOpen}
        close={() => setIsAddNewPolicyModalOpen(false)}
      />
    </React.Fragment>
  );
};