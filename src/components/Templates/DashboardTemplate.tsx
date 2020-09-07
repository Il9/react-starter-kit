import Grid from '@components/Atoms/Grid';
import Box from '@components/Atoms/Box';
import Icon from '@components/Atoms/Icon';
import { LineChartProps } from '@components/Molecules/LineChart';
import { PieChartProps } from '@components/Molecules/PieChart';
import TodaySummaryPanel, { TodaySummaryPanelProps } from '@components/Organisms/TodaySummaryPanel';
import GroupFlowPanel, { GroupFlowPanelProps } from '@components/Organisms/GroupFlowPanel';
import CountListPanel, { CountListPanelProps } from '@components/Organisms/CountListPanel';
import PriorityListPanel, { PriorityListPanelProps } from '@components/Organisms/PriorityListPanel';
import ChartPanel, { ChartPanelProps } from '@components/Organisms/ChartPanel';

// Props Type
export type DashboardTemplateProps = {
  summaryData: TodaySummaryPanelProps;
  statusData: Omit<GroupFlowPanelProps, 'action'> & { onActionClick: () => void };
  overallStatusDatas: (Omit<CountListPanelProps, 'action'> & { onActionClick: () => void })[];
  noticeDatas: (Omit<PriorityListPanelProps, 'action'> & { onActionClick: () => void })[];
  chartDatas: [
    Omit<ChartPanelProps, 'action'> & LineChartProps & { type: 'Line'; onActionClick: () => void },
    Omit<ChartPanelProps, 'action'> & PieChartProps & { type: 'Pie'; onActionClick: () => void }
  ];
};

// Component
export default function DashboardTemplate({ ...props }: DashboardTemplateProps) {
  return (
    <Grid container direction="column" spacing={3}>
      <Grid container item spacing={3}>
        <Grid item xs>
          <TodaySummaryPanel {...props.summaryData} />
        </Grid>
      </Grid>
      <Grid container item spacing={3}>
        <Grid item xs>
          <GroupFlowPanel
            {...props.statusData}
            action={
              <Icon
                className="cursor-pointer"
                type="Sync"
                style={{ fontSize: '1rem' }}
                onClick={props.statusData.onActionClick}
              />
            }
          />
        </Grid>
      </Grid>
      <Grid container item spacing={3}>
        {props.overallStatusDatas.map(({ onActionClick, ...overallStatusData }, index) => (
          <Grid item xs key={index}>
            <CountListPanel
              {...overallStatusData}
              action={
                <Icon className="cursor-pointer" type="Sync" style={{ fontSize: '1rem' }} onClick={onActionClick} />
              }
            />
          </Grid>
        ))}
      </Grid>
      <Grid container item spacing={3}>
        {props.noticeDatas.map(({ onActionClick, ...noticeData }, index) => (
          <Grid item xs key={index}>
            <PriorityListPanel
              {...noticeData}
              action={
                <Box className="cursor-pointer" onClick={onActionClick}>
                  More
                  <Icon type="NavigateNext" style={{ fontSize: '1rem' }} />
                </Box>
              }
            />
          </Grid>
        ))}
      </Grid>
      <Grid container item spacing={3}>
        {props.chartDatas.map(({ onActionClick, ...chartData }, index) => (
          <Grid item xs={6} key={index}>
            <ChartPanel
              {...chartData}
              action={
                <Icon className="cursor-pointer" type="Sync" style={{ fontSize: '1rem' }} onClick={onActionClick} />
              }
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

// Initial Props
DashboardTemplate.defaultProps = {};
