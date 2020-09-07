import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from '@material-ui/lab/Skeleton';

// Props Type
export type SkeletonProps = {} & MuiSkeletonProps;

// Component
export default function Skeleton({ children, ...props }: SkeletonProps) {
  return <MuiSkeleton {...props}>{children}</MuiSkeleton>;
}

// Initial Props
Skeleton.defaultProps = {
  animation: 'wave'
};
