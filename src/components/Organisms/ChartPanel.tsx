import { CommonUtil, ArrayUtil } from '@util';
import Grid from '@components/Atoms/Grid';
import Skeleton from '@components/Atoms/Skeleton';
import LineChart, { LineChartProps } from '@components/Molecules/LineChart';
import PieChart, { PieChartProps } from '@components/Molecules/PieChart';
import TitlePaper, { TitlePaperProps } from '@components/Molecules/TitlePaper';

export type ChartProps =
  | ({
      type: 'Line';
    } & LineChartProps)
  | ({
      type: 'Pie';
    } & PieChartProps);

// Props Type
export type ChartPanelProps = {
  title: string;

  action?: TitlePaperProps['action'];
  loading?: boolean;
} & ChartProps;

// Component
export default function ChartPanel({ ...props }: ChartPanelProps) {
  return (
    <TitlePaper title={props.title} action={props.action}>
      {props.type === 'Line' &&
        CommonUtil.loadTimeRenderer(
          {
            loading: (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
                style={{ height: props.height }}
              >
                <Grid container item spacing={3}>
                  <Grid container item direction="column" justify="space-between" alignItems="flex-end" xs={1}>
                    {ArrayUtil.range(10).map(value => (
                      <Grid item key={value}>
                        <Skeleton width={30} />
                      </Grid>
                    ))}
                  </Grid>
                  <Grid item xs>
                    <Skeleton variant="rect" height={300} />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                <Grid container item justify="center" spacing={3}>
                  {ArrayUtil.range(2).map(value => (
                    <Grid item key={value}>
                      <Skeleton width={60} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ),
            data: <LineChart height={props.height} groups={props.groups} />
          },
          props.loading
        )}
      {props.type === 'Pie' &&
        CommonUtil.loadTimeRenderer(
          {
            loading: (
              <Grid container justify="center" alignItems="center" spacing={3} style={{ height: props.height }}>
                <Grid container item justify="flex-end" xs={8}>
                  <Skeleton variant="circle" width={300} height={300} />
                </Grid>
                <Grid item xs={4}>
                  {ArrayUtil.range(3).map(value => (
                    <Skeleton width={100} key={value} />
                  ))}
                </Grid>
              </Grid>
            ),
            data: <PieChart height={props.height} datas={props.datas} label={props.label} />
          },
          props.loading
        )}
    </TitlePaper>
  );
}

// Initial Props
ChartPanel.defaultProps = {};
