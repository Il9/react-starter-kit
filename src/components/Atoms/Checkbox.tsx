import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';

// Props Type
export type CheckboxProps = {} & MuiCheckboxProps;

// Component
export default function Checkbox({ ...props }: CheckboxProps) {
  return <MuiCheckbox {...props} />;
}

// Initial Props
Checkbox.defaultProps = {
  color: 'default'
};
