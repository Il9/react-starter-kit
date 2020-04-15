import React from 'react';

import MuiButton, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';

// Props Type
type ButtonProps = {} & MuiButtonProps;

// Component
function Button(props: ButtonProps) {
  return <MuiButton {...props}>{props.children}</MuiButton>;
}

// Initial Props
Button.defaultProps = {};

// Export
export default Button;
