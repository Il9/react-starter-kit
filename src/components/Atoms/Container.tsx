import MuiContainer, { ContainerProps as MuiContainerProps } from '@material-ui/core/Container';

// Props Type
export type ContainerProps = {} & MuiContainerProps;

// Component
export default function Container({ children, ...props }: ContainerProps) {
  return <MuiContainer {...props}>{children}</MuiContainer>;
}

// Initial Props
Container.defaultProps = {};
