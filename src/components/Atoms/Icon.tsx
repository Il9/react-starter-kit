import { useMemo } from 'react';
import MuiSvgIcon, { SvgIconProps as MuiSvgIconProps } from '@material-ui/core/SvgIcon';
import * as MuiIcons from '@material-ui/icons';

import { UiConfig } from '@config';

export type ICON_TYPE = keyof typeof MuiIcons;
export type CUSTOM_ICON_TYPE = keyof typeof UiConfig.customIcons;

// Props Type
export type IconProps = (
  | {
      type: ICON_TYPE;

      custom?: false;
    }
  | {
      custom: true;
      type: CUSTOM_ICON_TYPE;
    }
) &
  MuiSvgIconProps;

// Component
export default function Icon({ ...props }: IconProps) {
  if (props.custom) {
    const { viewBox, paths } = useMemo(() => UiConfig.customIcons[props.type], [props.type]);

    delete props.custom;
    delete props.type;

    return (
      <MuiSvgIcon {...props} viewBox={viewBox}>
        {paths.map(path => (
          <path key={path} d={path} />
        ))}
      </MuiSvgIcon>
    );
  }

  const MuiIconComponent = useMemo(() => MuiIcons[props.type], [props.type]);

  return <MuiSvgIcon {...props} component={MuiIconComponent} />;
}

// Initial Props
Icon.defaultProps = {};
