import { useMemo } from 'react';
import MuiAlert, { AlertProps as MuiAlertProps } from '@material-ui/lab/Alert';
import MuiAlertTitle from '@material-ui/lab/AlertTitle';

import { ArrayUtil } from '@util';

// Props Type
export type AlertProps = {
  title?: string;
  size?: 'normal' | 'small';
  fullWidth?: boolean;
} & MuiAlertProps;

// Component
export default function Alert({ title, size, fullWidth, className, children, ...props }: AlertProps) {
  const titleComponenet = useMemo(() => (title ? <MuiAlertTitle>{title}</MuiAlertTitle> : ''), [title]);
  const sizeClass = useMemo(() => size === 'small' && 'py-0 px-2', [size]);
  const fullWidthClass = useMemo(() => fullWidth && 'w-full', [fullWidth]);
  const rootClass = useMemo(() => ArrayUtil.compactJoin([className, sizeClass, fullWidthClass], ' '), [
    className,
    sizeClass,
    fullWidthClass
  ]);

  return (
    <MuiAlert {...props} className={rootClass}>
      {titleComponenet}
      {children}
    </MuiAlert>
  );
}

// Initial Props
Alert.defaultProps = {
  title: '',
  size: 'normal',
  fullWidth: false
};
