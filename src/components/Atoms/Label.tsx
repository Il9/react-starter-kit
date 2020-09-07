import { useMemo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MuiInputLabel, { InputLabelProps as MuiInputLabelProps } from '@material-ui/core/InputLabel';

import { ArrayUtil } from '@util';

const useStyles = makeStyles(() =>
  createStyles({
    densest: {
      transform: 'translate(10px, 10px) scale(1) !important'
    }
  })
);

// Props Type
export type LabelProps = {
  margin?: MuiInputLabelProps['margin'] | 'densest';
} & Omit<MuiInputLabelProps, 'margin'>;

// Component
export default function Label({ margin, className, ...props }: LabelProps) {
  const classes = useStyles();

  const rootClasses = useMemo(() => ArrayUtil.compactJoin([className, margin === 'densest' && classes.densest], ' '), [
    classes,
    className,
    margin
  ]);
  const originMargin = useMemo(() => (margin === 'densest' ? 'dense' : margin), [margin]);

  return <MuiInputLabel {...props} className={rootClasses} margin={originMargin} />;
}

// Initial Props
Label.defaultProps = {};
