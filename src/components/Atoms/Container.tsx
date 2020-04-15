import React from 'react';

import MuiContainer, { ContainerProps as MuiContainerProps } from '@material-ui/core/Container';

// Props Type
type ContainerProps = {} & MuiContainerProps;

// Component
function Container(props: ContainerProps) {
  return <MuiContainer {...props}>{props.children}</MuiContainer>;
}

// Initial Props
Container.defaultProps = {};

// Export
export default Container;
