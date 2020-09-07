import { useMemo } from 'react';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@material-ui/core/Typography';

import { ArrayUtil } from '@util';

// Props Type
export type TypographyProps = {
  bold?: boolean;
} & MuiTypographyProps;

// Component
export default function Typography({ bold, className, children, ...props }: TypographyProps) {
  const boldClass = useMemo(() => bold && 'font-bold', [bold]);
  const rootClass = ArrayUtil.compactJoin([className, boldClass], ' ');

  return (
    <MuiTypography {...props} className={rootClass}>
      {children}
    </MuiTypography>
  );
}

// Initial Props
Typography.defaultProps = {};
