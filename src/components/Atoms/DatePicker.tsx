import { useState, useMemo, useCallback } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MuiTextField, { TextFieldProps as MuiTextFiledProps } from '@material-ui/core/TextField';
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@material-ui/pickers';

import { ArrayUtil } from '@util';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      'margin': 0,
      '& > div > input': {
        cursor: 'pointer'
      }
    },
    densest: {
      '& > div > input': {
        padding: '7.5px 10px'
      }
    }
  })
);

// Props Type
export type DatePickerProps = {
  margin?: MuiTextFiledProps['margin'] | 'densest';
  variant?: MuiTextFiledProps['variant'];
} & Omit<MuiDatePickerProps, 'mask' | 'inputFormat' | 'onChange' | 'renderInput'> &
  Partial<Pick<MuiDatePickerProps, 'onChange'>>;

// Component
export default function DatePicker({ variant, margin, className, onChange, ...props }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  const rootClass = useMemo(
    () => ArrayUtil.compactJoin([classes.root, margin === 'densest' && classes.densest, className], ' '),
    [classes, className, margin]
  );
  const originMargin = useMemo(() => (margin === 'densest' ? 'dense' : margin), [margin]);

  const handleChange: MuiDatePickerProps['onChange'] = useCallback(
    newDate => {
      if (onChange) {
        onChange(newDate);
      }

      setIsOpen(false);
    },
    [onChange]
  );

  const handleClick: MuiTextFiledProps['onClick'] = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <MuiDatePicker
      {...props}
      mask="____-__-__"
      inputFormat="yyyy-MM-dd"
      open={isOpen}
      onChange={handleChange}
      renderInput={renderProps => (
        <MuiTextField
          {...renderProps}
          helperText=""
          InputProps={{
            ...renderProps.InputProps,
            endAdornment: null
          }}
          variant={variant}
          className={rootClass}
          margin={originMargin}
          onClick={handleClick}
        />
      )}
    />
  );
}

// Initial Props
DatePicker.defaultProps = {};
