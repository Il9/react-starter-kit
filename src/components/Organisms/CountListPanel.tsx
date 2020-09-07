import { useCallback } from 'react';

import { CommonUtil, ArrayUtil } from '@util';
import Typography from '@components/Atoms/Typography';
import Skeleton from '@components/Atoms/Skeleton';
import List from '@components/Molecules/List';
import TitlePaper, { TitlePaperProps } from '@components/Molecules/TitlePaper';

type ListData = {
  text: string;
  count: number;

  highlight?: boolean;
};

// Props Type
export type CountListPanelProps = {
  title: string;
  datas: ListData[];

  action?: TitlePaperProps['action'];
  loading?: boolean;
};

// Component
export default function CountListPanel({ ...props }: CountListPanelProps) {
  const createHighlightColor = useCallback(
    (highlight: CountListPanelProps['datas'][0]['highlight']) => (highlight ? 'error' : 'initial'),
    []
  );

  return (
    <TitlePaper title={props.title} action={props.action}>
      {CommonUtil.loadTimeRenderer(
        {
          loading: ArrayUtil.range(2).map(value => <Skeleton height={30} key={value} />),
          data: (
            <List
              dense
              disablePadding
              datas={props.datas.map(({ text, count, highlight }) => ({
                text: (
                  <Typography variant="subtitle2" color={createHighlightColor(highlight)}>
                    {text}
                  </Typography>
                ),
                secondaryAction: (
                  <Typography bold variant="subtitle1" color={createHighlightColor(highlight)}>
                    {count}
                  </Typography>
                ),
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
CountListPanel.defaultProps = {};
