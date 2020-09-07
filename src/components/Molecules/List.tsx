import { useMemo, useCallback } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MuiList, { ListProps as MuiListProps } from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MuiDivider from '@material-ui/core/Divider';

import { ArrayUtil } from '@util';

type ListItemData = {
  text: React.ReactNode;

  icon?: React.ReactElement;
  secondaryAction?: React.ReactNode;
  highlight?: boolean;
  disableGutters?: boolean;
  halfGutters?: boolean;
  onClick?: () => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    highlight: {
      backgroundColor: 'rgba(0, 0, 0, 0.1);'
    }
  })
);

// Props Type
export type ListProps = {
  datas: (ListItemData | ListItemData[])[];
} & MuiListProps;

// Component
export default function List({ dense, datas, ...props }: ListProps) {
  const classes = useStyles();

  const listIconClass = useMemo(() => (dense ? 'min-w-0 mr-2' : undefined), [dense]);

  const createListItemClass = useCallback(
    ({ halfGutters, secondaryAction, highlight }: ListItemData) => {
      return ArrayUtil.compactJoin(
        [halfGutters && (secondaryAction ? 'pl-2' : 'px-2'), highlight && classes.highlight],
        ' '
      );
    },
    [classes]
  );

  return (
    <MuiList dense={dense} {...props}>
      {ArrayUtil.deepMap<ListItemData>(datas, (data, index) => {
        return (
          <MuiListItem
            button
            key={`${index}button`}
            onClick={data.onClick}
            disableGutters={data.disableGutters}
            className={createListItemClass(data)}
          >
            {data.icon && <MuiListItemIcon className={listIconClass}>{data.icon}</MuiListItemIcon>}
            <MuiListItemText primary={data.text} />
            {data.secondaryAction && <MuiListItemSecondaryAction>{data.secondaryAction}</MuiListItemSecondaryAction>}
          </MuiListItem>
        );
      }).map((item, index) =>
        Array.isArray(item) && !ArrayUtil.isLast(datas, index)
          ? item.concat(<MuiDivider key={datas.length + index} />)
          : item
      )}
    </MuiList>
  );
}

// Initial Props
List.defaultProps = {};
