import React from 'react';

import MuiGrid, { GridProps as MuiGridProps } from '@material-ui/core/Grid';

// Props Type
type GridProps = {} & MuiGridProps;

// Component
function Grid(props: GridProps) {
  return <MuiGrid {...props}>{props.children}</MuiGrid>;
}

// Initial Props
Grid.defaultProps = {};

// Export
export default Grid;
