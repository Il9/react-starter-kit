import { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import MuiFormHelperText from '@material-ui/core/FormHelperText';

import Label from '@components/Atoms/Label';
import Checkbox, { CheckboxProps } from '@components/Atoms/Checkbox';
import TextInput, { TextInputProps } from '@components/Atoms/TextInput';
import Select, { SelectProps } from '@components/Atoms/Select';
import DatePicker, { DatePickerProps } from '@components/Atoms/DatePicker';
import DateRangePicker, { DateRangePickerProps } from '@components/Molecules/DateRangePicker';

export type CheckboxTypeProps = {
  formType: 'checkbox';

  color?: CheckboxProps['color'];
  onChange?: CheckboxProps['onChange'];
};

export type TextTypeProps = {
  formType: 'text';
  type: 'text' | 'email' | 'password' | 'number';

  placeholder?: string;
  multiline?: boolean;
  variant?: TextInputProps['variant'];
  margin?: Exclude<TextInputProps['margin'], 'none'>;
  onChange?: TextInputProps['onChange'];
};

export type SelectTypeProps = {
  formType: 'select';
  options: SelectProps['options'];

  variant?: SelectProps['variant'];
  margin?: Exclude<SelectProps['margin'], 'none'>;
  value?: SelectProps['value'];
  onChange?: SelectProps['onChange'];
};

export type BasicDatePickerProps = {
  range?: false;
  value: DatePickerProps['value'];
  onChange?: DatePickerProps['onChange'];
};

export type RangeDatePickerProps = {
  range: true;
  value: DateRangePickerProps['value'];
  delimiter: DateRangePickerProps['delimiter'];

  onChange?: DateRangePickerProps['onChange'];
};

export type DateTypeProps = {
  formType: 'date';

  variant?: DatePickerProps['variant'];
  margin?: DatePickerProps['margin'];
} & (BasicDatePickerProps | RangeDatePickerProps);

// Props Type
export type FormControlProps = {
  name: string;
  id: string;

  label?: string;
  fullWidth?: boolean;
  required?: boolean | string;
  className?: string;
  style?: React.CSSProperties;
} & (CheckboxTypeProps | TextTypeProps | SelectTypeProps | DateTypeProps);

// Component
export default function FormControl({ name, required, ...props }: FormControlProps) {
  const { register, errors, control } = useFormContext();

  const error = useMemo(() => errors[name], [name]);
  const validation = useMemo(() => ({ required: required || false }), [required]);

  return (
    <MuiFormControl fullWidth={props.fullWidth} error={!!error} className={props.className} style={props.style}>
      {props.formType === 'checkbox' && (
        <>
          <MuiFormControlLabel
            control={
              <Checkbox
                name={name}
                id={props.id}
                color={props.color}
                inputRef={register(validation)}
                onChange={props.onChange}
              />
            }
            label={props.label}
          />
          {error && <MuiFormHelperText>{error.message}</MuiFormHelperText>}
        </>
      )}

      {props.formType === 'text' && (
        <>
          {props.label && (
            <Label htmlFor={props.id} variant={props.variant} margin={props.margin}>
              {props.label}
            </Label>
          )}
          <TextInput
            name={name}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            multiline={props.multiline}
            variant={props.variant}
            margin={props.margin}
            inputRef={register(validation)}
            onChange={props.onChange}
          />
          {error && <MuiFormHelperText variant={props.variant}>{error.message}</MuiFormHelperText>}
        </>
      )}

      {props.formType === 'select' && (
        <>
          {props.label && (
            <Label htmlFor={props.id} variant={props.variant} margin={props.margin}>
              {props.label}
            </Label>
          )}
          <Controller
            name={name}
            control={control}
            rules={validation}
            defaultValue={props.value}
            render={renderProps => {
              const selectOption = props.options.find(option => option.value === (renderProps.value || ''));

              if (selectOption === undefined) {
                renderProps.onChange(props.value);
              }

              return (
                <Select
                  name={name}
                  id={props.id}
                  variant={props.variant}
                  margin={props.margin}
                  options={props.options}
                  value={selectOption?.value || ''}
                  onChange={(event, child) => {
                    if (props.onChange) {
                      props.onChange(event, child);
                    }

                    renderProps.onChange(event);
                  }}
                />
              );
            }}
          />
          {error && <MuiFormHelperText variant={props.variant}>{error.message}</MuiFormHelperText>}
        </>
      )}

      {props.formType === 'date' && (
        <>
          <Controller
            name={name}
            control={control}
            rules={validation}
            defaultValue={props.value}
            render={renderProps =>
              !props.range ? (
                <DatePicker
                  InputProps={{
                    name,
                    id: props.id
                  }}
                  label={props.label}
                  variant={props.variant}
                  margin={props.margin}
                  value={renderProps.value}
                  onChange={date => {
                    if (props.onChange) {
                      props.onChange(date);
                    }

                    renderProps.onChange(date);
                  }}
                />
              ) : (
                <DateRangePicker
                  name={name}
                  id={props.id}
                  label={props.label}
                  delimiter={props.delimiter}
                  variant={props.variant}
                  margin={props.margin}
                  value={renderProps.value}
                  onChange={dates => {
                    if (props.onChange) {
                      props.onChange(dates);
                    }

                    renderProps.onChange(dates);
                  }}
                />
              )
            }
          />
          {error && <MuiFormHelperText variant={props.variant}>{error.message}</MuiFormHelperText>}
        </>
      )}
    </MuiFormControl>
  );
}

// Initial Props
FormControl.defaultProps = {
  fullWidth: false,
  required: false
};
