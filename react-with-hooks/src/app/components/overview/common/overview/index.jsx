import React, {useState} from 'react';

//  styled components
import {
  Overview,
  OverviewTop,
  OverviewBottom,
} from './styled';

//  custom components
import OverviewStats from './overviewstats';
import PortfolioSummary from './portfoliosummary';
import DashboardDetails from './dashboarddetails';
import Scrollbar from 'components/common/scrollbar';

//  constants
import {
  overviewHeight,
  scrollThumbBgDark,
} from 'constants/styles';

export default () => {

  const [tabIndex, setTabIndex] = useState(-1);

  return (
    <Overview>
      <Scrollbar
        key={tabIndex}
        height={overviewHeight}
        thumbColor={tabIndex !== -1 ? scrollThumbBgDark : "transparent"}
      >
        <OverviewTop>
          <OverviewStats tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </OverviewTop>
        <OverviewBottom>
          <PortfolioSummary />
          <DashboardDetails />
        </OverviewBottom>
      </Scrollbar>
    </Overview>
  );
};