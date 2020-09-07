import React from 'react';
import MuiPaper, { PaperProps as MuiPaperProps } from '@material-ui/core/Paper';

// Props Type
export type PaperProps = {} & MuiPaperProps;

// Component
export default function Paper({ children, ...props }: PaperProps) {
  return <MuiPaper {...props}>{children}</MuiPaper>;
}

// Initial Props
Paper.defaultProps = {};
