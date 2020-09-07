import { useMemo, useCallback } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MuiTextField, { TextFieldProps as MuiTextFiledProps } from '@material-ui/core/TextField';
import {
  DateRangePicker as MuiDateRangePicker,
  DateRangePickerProps as MuiDateRangePickerProps,
  DateRangeDelimiter as MuiDateRangeDelimiter
} from '@material-ui/pickers';

import { TypeUtil, ArrayUtil, DateUtil } from '@util';

type Dates = [string, string];

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
    },
    delimiter: {
      margin: '0 8px'
    }
  })
);

// Props Type
export type DateRangePickerProps = {
  delimiter: React.ReactNode;
  onChange: TypeUtil.Handler<Dates>;

  id?: MuiTextFiledProps['id'];
  name?: MuiTextFiledProps['name'];
  margin?: MuiTextFiledProps['margin'] | 'densest';
  variant?: MuiTextFiledProps['variant'];
  inputRef?: MuiTextFiledProps['inputRef'];
} & Omit<MuiDateRangePickerProps, 'mask' | 'inputFormat' | 'startText' | 'endText' | 'onChange' | 'renderInput'>;

// Component
export default function DateRangePicker({
  id,
  name,
  margin,
  variant,
  className,
  onChange,
  ...props
}: DateRangePickerProps) {
  const classes = useStyles();

  const rootClass = useMemo(
    () => ArrayUtil.compactJoin([classes.root, margin === 'densest' && classes.densest, className], ' '),
    [classes, className, margin]
  );
  const originMargin = useMemo(() => (margin === 'densest' ? 'dense' : margin), [margin]);

  const [startData, endData] = useMemo(
    () => [
      {
        id: id && `${id}Start`,
        name: name && `${name}Start`
      },
      {
        id: id && `${id}End`,
        name: name && `${name}End`
      }
    ],
    [id, name]
  );

  const handleChange: MuiDateRangePickerProps['onChange'] = useCallback(
    dates => {
      onChange(dates.map(date => DateUtil.formater(date as Date, 'YYYY-MM-DD')) as [string, string]);
    },
    [onChange]
  );

  return (
    <MuiDateRangePicker
      {...props}
      autoOk
      startText=""
      endText=""
      mask="____-__-__"
      inputFormat="yyyy-MM-dd"
      renderInput={(startProps, endProps) => (
        <>
          <MuiTextField
            {...startProps}
            helperText=""
            error={false}
            id={startData.id}
            name={startData.name}
            variant={variant}
            className={rootClass}
            margin={originMargin}
          />
          <MuiDateRangeDelimiter className={classes.delimiter}>{props.delimiter}</MuiDateRangeDelimiter>
          <MuiTextField
            {...endProps}
            helperText=""
            error={false}
            id={endData.id}
            name={endData.name}
            variant={variant}
            className={rootClass}
            margin={originMargin}
          />
        </>
      )}
      onChange={handleChange}
    />
  );
}

// Initial Props
DateRangePicker.defaultProps = {};
