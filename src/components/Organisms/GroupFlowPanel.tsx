import { Fragment, useMemo } from 'react';

import { CommonUtil, ArrayUtil } from '@util';
import Grid from '@components/Atoms/Grid';
import Icon, { ICON_TYPE } from '@components/Atoms/Icon';
import Typography from '@components/Atoms/Typography';
import Skeleton from '@components/Atoms/Skeleton';
import TitlePaper, { TitlePaperProps } from '@components/Molecules/TitlePaper';
import CountCard from '@components/Molecules/CountCard';

type GroupData = {
  iconType: ICON_TYPE;
  state: string;
  count: number;
};

type Group = {
  group: string;
  color: 'blue' | 'green' | 'pink' | 'purple';
  datas: GroupData[];

  effect?: string;
};

// Props Type
export type GroupFlowPanelProps = {
  title: string;
  groups: Group[];

  action?: TitlePaperProps['action'];
  loading?: boolean;
};

// Component
export default function GroupFlowPanel({ ...props }: GroupFlowPanelProps) {
  const loadingGroupArray = useMemo(() => ArrayUtil.range(1, 4), []);

  return (
    <TitlePaper title={props.title} action={props.action}>
      <Grid container spacing={3}>
        {CommonUtil.loadTimeRenderer(
          {
            loading: loadingGroupArray.map((groupValue, index) => (
              <Fragment key={groupValue}>
                <Grid container item direction="column" alignItems="center" xs={groupValue as never} spacing={2}>
                  <Grid item>
                    <Typography variant="caption" color="textSecondary">
                      <Skeleton variant="text" width={60} />
                    </Typography>
                  </Grid>
                  <Grid container item spacing={3}>
                    {ArrayUtil.range(groupValue).map(stateValue => (
                      <Grid item xs key={stateValue}>
                        <Skeleton variant="rect" height={130} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                {!ArrayUtil.isLast(loadingGroupArray, index) && (
                  <Grid container item xs justify="center" alignItems="center">
                    <Typography variant="caption" color="textSecondary">
                      <Skeleton variant="text" width={80} />
                    </Typography>
                  </Grid>
                )}
              </Fragment>
            )),
            data: props.groups.map(({ group, color, datas: data, effect }, index) => (
              <Fragment key={index}>
                <Grid container item direction="column" alignItems="center" xs={data.length as never} spacing={2}>
                  <Grid item>
                    <Typography variant="caption" color="textSecondary">
                      {group}
                    </Typography>
                  </Grid>
                  <Grid container item spacing={3}>
                    {data.map(({ iconType, state, count }, indexDeps) => (
                      <Grid item xs key={indexDeps}>
                        <CountCard
                          color={color}
                          icon={<Icon type={iconType} fontSize="large" />}
                          text={state}
                          count={count}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                {effect && (
                  <Grid container item xs justify="center" alignItems="center">
                    <Typography variant="caption" color="textSecondary">
                      <br />
                      {effect}
                      <Icon type="NavigateNext" fontSize="small" />
                    </Typography>
                  </Grid>
                )}
              </Fragment>
            ))
          },
          props.loading
        )}
      </Grid>
    </TitlePaper>
  );
}

// Initial Props
GroupFlowPanel.defaultProps = {};
