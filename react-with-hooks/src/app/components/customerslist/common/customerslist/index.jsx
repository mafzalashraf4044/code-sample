import React, {useState}  from 'react';

// dummy data
import {customers} from 'services/dummy-data';

//  styled components
import {
  CustomersList,
  CustomersListTabs,
  CustomersListTab,
  CustomersListTabTitle,
  CustomersListTabActiveBorder,
} from './styled';

//  custom components
import Tag from 'components/common/tag';
import CustomersListTable from 'components/common/customerslisttable';

//  constants
import {
  customersListTableHeight,
} from 'constants/styles';

const customersTabColumns = [
  {title: 'Customer Name', key: 'name', isCustomer: true},
  {title: 'Company Name', key: 'company'},
  {title: 'Customer Number', key: 'phone'},
  {title: 'Department', key: 'department'},
  {title: 'Annual Premium', key: 'annualPremium'},
  {title: 'Policy Status', key: 'policyStatus', isPolicyStatus: true},
  {isActions: true},
];

const prospectsTabColumns = [
  {title: 'Customer Name', key: 'name', isCustomer: true},
  {title: 'Company Name', key: 'company'},
  {title: 'Date Added', key: 'dateAdded'},
  {title: 'Need By Date', key: 'needByDate'},
  {title: 'Refferal Source', key: 'refferalSource'},
  {title: 'Department', key: 'department'},
  {title: 'Target Premium', key: 'targetPremium'},
  {isActions: true},
];

const leadsTabColumns = [
  {title: 'Customer Name', isCustomer: true},
  {title: 'Company Name', key: 'company'},
  {title: 'Industry', key: 'industry'},
  {title: 'Line of Business', key: 'lineOfBusiness'},
  {title: 'Department', key: 'department'},
  {title: 'Customer Add Date', key: 'dateAdded'},
  {isActions: true},
];

const renewalsTabColumns = [
  {title: 'Customer Name', isCustomer: true},
  {title: 'Company Name', key: 'company'},
  {title: 'Effective Date', key: 'effectiveDate'},
  {title: 'Expiry Date', key: 'expiry'},
  {title: 'Expiring Premium', key: 'expiringPremium'},
  {title: 'Renewal Premium', key: 'expiringPremium'},
  {isActions: true},
];

export default () => {

  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    {title: 'Customers', newCount: 6, color: '#00a8d2', columns: customersTabColumns},
    {title: 'Prospects', newCount: 8, color: '#32c532', columns: prospectsTabColumns},
    {title: 'Leads', newCount: 0, color: '#C04363', columns: leadsTabColumns},
    {title: 'Renewals', newCount: 10, color: '#fb9213', columns: renewalsTabColumns},
  ]

  return (
    <CustomersList>
      <CustomersListTabs>
        {
          tabs.map((tab, i) => (
            <CustomersListTab onClick={() => setTabIndex(i)}>
              <CustomersListTabActiveBorder active={i === tabIndex}>
                <CustomersListTabTitle>{tab.title}</CustomersListTabTitle>
                {tab.newCount !== 0 && <Tag bgColor={tab.color}>{tab.newCount} new</Tag>}
              </CustomersListTabActiveBorder>
            </CustomersListTab>
          ))
        }
      </CustomersListTabs>

      <CustomersListTable
        customers={customers}
        columns={tabs[tabIndex].columns}
        tableHeight={customersListTableHeight}
      />
    </CustomersList>
  );
};