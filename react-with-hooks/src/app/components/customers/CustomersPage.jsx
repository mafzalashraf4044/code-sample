import React from 'react';

// dummy data
import {customers} from 'services/dummy-data';

//  Custom Components
import Page from 'components/common/layout/page';
import LeftSidebar from 'components/common/layout/leftsidebar';
import PageContent from 'components/common/layout/pagecontent';
import LeftSidebarContent from './common/leftsidebarcontent';
import Header from './common/header';
import CustomersListTable from 'components/common/customerslisttable';

//  constants
import {
  customersTableHeight,
} from 'constants/styles';

const CustomersPage = () => {

  const columns = [
    {title: 'Customer', isCustomer: true},
    {title: 'Company', key: 'company'},
    {title: 'Date Added', key: 'date'},
    {title: 'Expiry Date', key: 'expiry'},
    {title: 'Premium', key: 'premium'},
    {title: 'Policy Status', isPolicyStatus: true},
    {isActions: true},
  ];

  return (
    <Page>
      <LeftSidebar>
        <LeftSidebarContent />
      </LeftSidebar>
      <PageContent>
        <Header />
        <CustomersListTable
          showCustomerRole
          columns={columns}
          customers={customers}
          tableHeight={customersTableHeight}
        />
      </PageContent>
    </Page>
  );
};

export default CustomersPage;
