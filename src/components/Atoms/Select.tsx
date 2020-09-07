import { useMemo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MuiSelect, { SelectProps as MuiSelectProps } from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { ArrayUtil } from '@util';

export type KEY = React.ReactText;
export type VALUE = React.ReactText;

export type Option = {
  key: KEY;
  value: VALUE;
};

const useStyles = makeStyles(() =>
  createStyles({
    densest: {
      '& > div': {
        padding: '7.5px 10px'
      },
      '& > svg': {
        top: 'calc(50% - 12px)'
      }
    }
  })
);

// Props Type
export type SelectProps = {
  options: Option[];

  margin?: MuiSelectProps['margin'] | 'densest';
  value?: VALUE;
} & Omit<MuiSelectProps, 'margin' | 'value'>;

// Component
export default function Select({ margin, options, className, ...props }: SelectProps) {
  const classes = useStyles();

  const rootClasses = useMemo(() => ArrayUtil.compactJoin([className, margin === 'densest' && classes.densest], ' '), [
    classes,
    className,
    margin
  ]);
  const originMargin = useMemo(() => (margin === 'densest' ? 'dense' : margin), [margin]);

  return (
    <MuiSelect {...props} className={rootClasses} margin={originMargin}>
      {options.map(({ key: optionKey, value: optionValue }, index) => (
        <MuiMenuItem dense value={optionValue} key={index}>
          {optionKey}
        </MuiMenuItem>
      ))}
    </MuiSelect>
  );
}

// Initial Props
Select.defaultProps = {
  displayEmpty: true
};
