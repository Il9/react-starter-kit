import MuiBox, { BoxProps as MuiBoxProps } from '@material-ui/core/Box';

// Props Type
export type BoxProps = {} & MuiBoxProps;

// Component
export default function Box({ children, ...props }: BoxProps) {
  return <MuiBox {...props}>{children}</MuiBox>;
}

// Initial Props
Box.defaultProps = {};
