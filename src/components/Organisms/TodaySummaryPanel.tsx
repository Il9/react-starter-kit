import { Fragment, useMemo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { CommonUtil, DateUtil, ArrayUtil } from '@util';
import Grid from '@components/Atoms/Grid';
import Paper from '@components/Atoms/Paper';
import Typography from '@components/Atoms/Typography';
import Skeleton from '@components/Atoms/Skeleton';

type SummaryData = {
  group: string;
  count: number;
};

const useStyles = makeStyles(theme =>
  createStyles({
    date: {
      backgroundColor: theme.palette.secondary.main
    }
  })
);

// Props Type
export type TodaySummaryPanelProps = {
  datas: SummaryData[];

  loading?: boolean;
};

// Component
export default function TodaySummaryPanel({ ...props }: TodaySummaryPanelProps) {
  const classes = useStyles();

  const date = useMemo(
    () => ({
      year: DateUtil.getYear(),
      month: DateUtil.getMonth(),
      day: DateUtil.getDay(),
      dayOfWeek: DateUtil.getDayOfWeek()
    }),
    []
  );

  return (
    <Paper className="overflow-hidden">
      <Grid container>
        <Grid item className={`p-5 ${classes.date}`} xs={1}>
          <Typography variant="caption" className="text-white">
            {date.year}
          </Typography>
          <Typography variant="body1" className="text-white">
            {date.month}/{date.day}
          </Typography>
          <Typography variant="body2" className="text-white">
            {date.dayOfWeek}
          </Typography>
        </Grid>
        <Grid container item className="p-5 text-center divide-x divide-white divide-opacity-25" xs={11}>
          {CommonUtil.loadTimeRenderer(
            {
              loading: ArrayUtil.range(3).map(value => (
                <Fragment key={value}>
                  <Grid container item xs direction="column" justify="center" alignItems="center">
                    <Skeleton width={150} />
                    <Typography variant="h6">
                      <Skeleton width={50} />
                    </Typography>
                  </Grid>
                </Fragment>
              )),
              data: props.datas.map((data, index) => (
                <Fragment key={index}>
                  <Grid container item xs direction="column" justify="center" alignItems="center">
                    {data.group}
                    <Typography variant="h6">{data.count}</Typography>
                  </Grid>
                </Fragment>
              ))
            },
            props.loading
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

// Initial Props
TodaySummaryPanel.defaultProps = {};
