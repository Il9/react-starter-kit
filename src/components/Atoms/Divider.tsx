import React from 'react';
import MuiDivider, { DividerProps as MuiDividerProps } from '@material-ui/core/Divider';

// Props Type
export type Divider = {} & MuiDividerProps;

// Component
export default function Divider({ ...props }: Divider) {
  return <MuiDivider {...props} />;
}

// Initial Props
Divider.defaultProps = {};
