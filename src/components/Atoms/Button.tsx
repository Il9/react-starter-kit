import MuiButton, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@material-ui/core/IconButton';

// Props Type
export type ButtonProps = ({ icon?: false } & MuiButtonProps) | ({ icon: true } & MuiIconButtonProps);

// Component
export default function Button({ children, ...props }: ButtonProps) {
  if (props.icon) {
    delete props.icon;

    return <MuiIconButton {...props}>{children}</MuiIconButton>;
  }

  return <MuiButton {...props}>{children}</MuiButton>;
}

// Initial Props
Button.defaultProps = {};
