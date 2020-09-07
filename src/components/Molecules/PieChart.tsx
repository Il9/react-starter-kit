import { useMemo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { ResponsivePie } from '@nivo/pie';

import Grid from '@components/Atoms/Grid';
import Box from '@components/Atoms/Box';
import Typography from '@components/Atoms/Typography';

type PieChartData = {
  key: string;
  value: number;
};

// Props Type
export type PieChartProps = {
  height: number;
  datas: PieChartData[];

  label?: React.ReactNode;
};

// Component
export default function PieChart({ datas, ...props }: PieChartProps) {
  const theme = useTheme();

  const chartDatas = useMemo(
    () =>
      datas.map(({ key, value }) => ({
        id: key,
        label: key,
        value
      })),
    [datas]
  );
  const margin = {
    top: 40,
    right: 80,
    bottom: 80,
    left: 80
  };

  return (
    <Box style={{ height: props.height, position: 'relative' }}>
      <ResponsivePie
        data={chartDatas}
        margin={margin}
        sortByValue={true}
        innerRadius={0.6}
        padAngle={1.5}
        colors={{ scheme: 'set3' }}
        enableRadialLabels={false}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333"
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            itemWidth: 100,
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
        tooltip={({ id, value, color }) => (
          <Grid container className="divide-x divide-white divide-opacity-25">
            <Grid container item xs={8} justify="center" alignItems="center" style={{ padding: '5px' }}>
              <Box>
                <Box display="inline-block" width={10} height={10} marginRight={1} bgcolor={color} />
                {id}
              </Box>
            </Grid>
            <Grid container item xs={4} justify="center" alignItems="center" style={{ padding: '5px' }}>
              {value}
            </Grid>
          </Grid>
        )}
        theme={{
          tooltip: {
            container: {
              width: '150%',
              padding: 0,
              backgroundColor: theme.palette.background.default
            }
          }
        }}
      />

      {props.label && (
        <Box
          style={{
            width: 'auto',
            position: 'absolute',
            ...margin,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none'
          }}
        >
          <Typography bold>{props.label}</Typography>
        </Box>
      )}
    </Box>
  );
}

// Initial Props
PieChart.defaultProps = {};
