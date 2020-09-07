import { useMemo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MuiInput, { InputProps as MuiInputProps } from '@material-ui/core/Input';
import MuiFilledInput, { FilledInputProps as MuiFilledInputProps } from '@material-ui/core/FilledInput';
import MuiOutlinedInput, { OutlinedInputProps as MuiOutlinedInputProps } from '@material-ui/core/OutlinedInput';

import { ArrayUtil } from '@util';

const useStyles = makeStyles(() =>
  createStyles({
    densest: {
      '& > input': {
        padding: '7.5px 10px'
      }
    }
  })
);

// Props Type
export type TextInputProps = {
  margin?: MuiInputProps['margin'] | MuiFilledInputProps['margin'] | MuiOutlinedInputProps['margin'] | 'densest';
} & (
  | ({ variant?: 'standard' } & Omit<MuiInputProps, 'margin'>)
  | ({ variant: 'filled' } & Omit<MuiFilledInputProps, 'margin'>)
  | ({ variant: 'outlined' } & Omit<MuiOutlinedInputProps, 'margin'>)
);

// Component
export default function TextInput({ variant, margin, className, ...props }: TextInputProps) {
  const classes = useStyles();

  const rootClasses = useMemo(() => ArrayUtil.compactJoin([className, margin === 'densest' && classes.densest], ' '), [
    classes,
    className,
    margin
  ]);
  const originMargin = useMemo(() => (margin === 'densest' ? 'dense' : margin), [margin]);
  const TextInputComponent = useMemo(
    () =>
      ({
        standard: MuiInput,
        filled: MuiFilledInput,
        outlined: MuiOutlinedInput
      }[variant || 'standard']),
    [variant]
  );

  return <TextInputComponent {...props} className={rootClasses} margin={originMargin} />;
}

// Initial Props
TextInput.defaultProps = {
  variant: 'standard' as const
};
