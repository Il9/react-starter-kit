import MuiGrid, { GridProps as MuiGridProps } from '@material-ui/core/Grid';

// Props Type
export type GridProps = {} & MuiGridProps;

// Component
export default function Grid({ children, ...props }: GridProps) {
  return <MuiGrid {...props}>{children}</MuiGrid>;
}

// Initial Props
Grid.defaultProps = {};
