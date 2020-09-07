import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@material-ui/core/Tooltip';

// Props Type
export type TooltipProps = {
  children: React.ReactNode;
} & Omit<MuiTooltipProps, 'children'>;

// Component
export default function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <MuiTooltip
      {...props}
      classes={{
        tooltip: 'bg-black p-2',
        arrow: 'text-black'
      }}
    >
      <span>{children}</span>
    </MuiTooltip>
  );
}

// Initial Props
Tooltip.defaultProps = {};
