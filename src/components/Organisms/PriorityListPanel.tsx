import { CommonUtil, ArrayUtil } from '@util';
import Grid from '@components/Atoms/Grid';
import Typography from '@components/Atoms/Typography';
import Skeleton from '@components/Atoms/Skeleton';
import List from '@components/Molecules/List';
import TitlePaper, { TitlePaperProps } from '@components/Molecules/TitlePaper';

type ListData = {
  category: string;
  text: string;
  date: string;
  highPriority?: boolean;
};

// Props Type
export type PriorityListPanelProps = {
  title: string;
  datas: ListData[];

  action?: TitlePaperProps['action'];
  loading?: boolean;
};

// Component
export default function PriorityListPanel({ ...props }: PriorityListPanelProps) {
  return (
    <TitlePaper title={props.title} action={props.action}>
      {CommonUtil.loadTimeRenderer(
        {
          loading: ArrayUtil.range(4).map(value => <Skeleton height={30} key={value} />),
          data: (
            <List
              dense
              disablePadding
              datas={props.datas.map(({ category, text, date, highPriority }) => ({
                text: (
                  <Grid container>
                    <Grid item xs={1}>
                      <Typography variant="caption" color="textSecondary">
                        {category}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      {text}
                    </Grid>
                    <Grid container item justify="flex-end" xs={2}>
                      <Typography variant="caption" color="textSecondary">
                        {date}
                      </Typography>
                    </Grid>
                  </Grid>
                ),
                highlight: highPriority,
                halfGutters: true
              }))}
            />
          )
        },
        props.loading
      )}
    </TitlePaper>
  );
}

// Initial Props
PriorityListPanel.defaultProps = {};
