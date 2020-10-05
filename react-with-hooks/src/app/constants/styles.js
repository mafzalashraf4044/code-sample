//  utils
import {getSizeWrtWidth} from 'utils/styles';

export const navBg = '#101f77';
export const navWidth = '5vw';

export const scrollThumbBgDark = '#DD238E';
export const scrollThumbBgLight = '#CFD2E4';

export const leftSidebarBg = '#03105C';
export const pageContentBg = '#FFFFFF';
export const leftSidebarWidth = '25%'; // 25% of (100% - navWidth)
export const pageContentWidth = '75%'; // 75% of (100% - navWidth)

export const spacerXs = getSizeWrtWidth(5);
export const spacerSm = getSizeWrtWidth(10);
export const spacerSm2x = getSizeWrtWidth(20);
export const spacerMd = getSizeWrtWidth(15);
export const spacerLg = getSizeWrtWidth(30);
export const spacerXl = getSizeWrtWidth(50);

export const headerHeight = getSizeWrtWidth(128); //string with px suffix
export const headerHeightInPixels = getSizeWrtWidth(128, false);
export const overviewHeight = window.innerHeight - headerHeightInPixels - getSizeWrtWidth(50, false);;
export const overviewStatsHeight = getSizeWrtWidth(140);
export const overviewStatsHeightInPixels = getSizeWrtWidth(140, false);
export const portfolioSummaryHeight = window.innerHeight - headerHeightInPixels - overviewStatsHeightInPixels - getSizeWrtWidth(145, false); //145 = heading and padding
export const dashboardDetailsHeight = window.innerHeight - headerHeightInPixels - overviewStatsHeightInPixels - getSizeWrtWidth(145, false); //145 = heading and padding

export const tableRowHeight = getSizeWrtWidth(68);
export const tableRowHeightInPixels = getSizeWrtWidth(68, false);
export const customersTableHeight = window.innerHeight - headerHeightInPixels - getSizeWrtWidth(50, false); // 50 = bottom margin
export const customersListTableHeight = window.innerHeight - headerHeightInPixels - tableRowHeightInPixels - getSizeWrtWidth(50, false); // 50 = bottom margin

export const textOverflowEllipsis = `
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const flex = `
  display: flex;
`;

export const flexColumn = `
  display: flex;
  flex-direction: column;
`;

export const flexCC = `
  ${flex}
  justify-content: center;
  align-items: center;
`;

export const flexColumnCC = `
  ${flexColumn}
  justify-content: center;
  align-items: center;
`;

export const flexSbC = `
  ${flex}
  justify-content: space-between;
  align-items: center;
`;

export const flexColumnSbC = `
  ${flexColumn}
  justify-content: space-between;
  align-items: center;
`;

export const flexFsC = `
  ${flex}
  justify-content: flex-start;
  align-items: center;
`;

export const flexFsCWrap = `
  ${flex}
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

export const flexColumnFsC = `
  ${flexColumn}
  justify-content: flex-start;
  align-items: center;
`;

export const flexFsFs = `
  ${flex}
  justify-content: flex-start;
  align-items: flex-start;
`;

export const flexColumnFsFs = `
  ${flexColumn}
  justify-content: flex-start;
  align-items: flex-start;
`;

export const flexFsFsWrap = `
  ${flex}
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const flexColumnFsFsWrap = `
  ${flexColumn}
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const flexSbFs = `
  ${flex}
  justify-content: space-between;
  align-items: flex-start;
`;

export const flexColumnSbFs = `
  ${flexColumn}
  justify-content: space-between;
  align-items: flex-start;
`;

export const flexCFs = `
  ${flex}
  justify-content: center;
  align-items: flex-start;
`;

export const flexColumnCFs = `
  ${flexColumn}
  justify-content: center;
  align-items: flex-start;
`;

export const flexFeC = `
  ${flex}
  justify-content: flex-end;
  align-items: center;
`;

export const flexColumnFeC = `
  ${flexColumn}
  justify-content: flex-end;
  align-items: center;
`;

