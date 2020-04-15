import React from 'react';

import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';

// Props Type
type TextFieldProps = {} & MuiTextFieldProps;

// Component
function TextField(props: TextFieldProps) {
  return <MuiTextField {...props}>{props.children}</MuiTextField>;
}

// Initial Props
TextField.defaultProps = {};

// Export
export default TextField;
