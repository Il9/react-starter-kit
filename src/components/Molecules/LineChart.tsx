import { useMemo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { ResponsiveLine } from '@nivo/line';

import { DateUtil } from '@util';
import Grid from '@components/Atoms/Grid';
import Box from '@components/Atoms/Box';

type LineChartData = {
  key: Date;
  value: number;
};

type LineChartDataGroup = {
  group: string;
  datas: LineChartData[];
};

// Props Type
export type LineChartProps = {
  height: number;
  groups: LineChartDataGroup[];
};

// Component
export default function LineChart({ groups, ...props }: LineChartProps) {
  const theme = useTheme();

  const chartDataGroups = useMemo(
    () =>
      groups.map(({ group, datas }) => ({
        id: group,
        data: datas.map(({ key, value }) => ({
          x: key,
          y: value
        }))
      })),
    [groups]
  );

  return (
    <Box style={{ height: props.height, position: 'relative' }}>
      <ResponsiveLine
        data={chartDataGroups}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          tickValues: 3,
          format: '%m-%d'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0
        }}
        colors={{ scheme: 'set3' }}
        enableGridX={false}
        enableGridY={false}
        useMesh={true}
        animate={false}
        markers={[
          {
            axis: 'x',
            value: chartDataGroups[0].data[0].x,
            lineStyle: { stroke: theme.palette.text.primary }
          },
          {
            axis: 'y',
            value: 0,
            lineStyle: { stroke: theme.palette.text.primary }
          }
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: 60,
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.85,
            symbolSize: 10,
            itemTextColor: theme.palette.text.primary,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        tooltip={({ point }) => (
          <Grid
            container
            className="divide-y divide-white divide-opacity-25"
            style={{ backgroundColor: theme.palette.background.default, boxShadow: theme.shadows[1] }}
          >
            <Grid container item justify="center" alignItems="center" xs={12} style={{ padding: '5px' }}>
              {point.data.x instanceof Date && DateUtil.formater(point.data.x)}
            </Grid>
            <Grid container item className="divide-x divide-white divide-opacity-25">
              <Grid container item xs justify="center" alignItems="center" style={{ padding: '5px' }}>
                <Box>
                  <Box display="inline-block" width={10} height={10} marginRight={1} bgcolor={point.color} />
                  {point.serieId}
                </Box>
              </Grid>
              <Grid container item xs justify="center" alignItems="center" style={{ padding: '5px' }}>
                {point.data.y}
              </Grid>
            </Grid>
          </Grid>
        )}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: theme.palette.text.primary
              }
            }
          }
        }}
      />
    </Box>
  );
}

// Initial Props
LineChart.defaultProps = {};
