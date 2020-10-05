import React, { useState, useEffect } from 'react';

//  Custom Components
import Page from 'components/common/layout/page';
import LeftSidebar from 'components/common/layout/leftsidebar';
import PageContent from 'components/common/layout/pagecontent';
import LeftSidebarContent from './common/leftsidebarcontent';
import Header from './common/header';
import Overview from './common/overview';

const OverviewPage = () => {  
  return (
    <Page>
      <LeftSidebar>
        <LeftSidebarContent />
      </LeftSidebar>
      <PageContent bgColor="#e7f0f3">
        <Header />
        <Overview />
      </PageContent>
    </Page>
  );
};

export default OverviewPage;
