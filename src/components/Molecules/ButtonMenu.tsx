import { useState, useMemo, useCallback } from 'react';
import MuiPopover, { PopoverOrigin } from '@material-ui/core/Popover';

import { ArrayUtil, TypeUtil } from '@util';
import Button from '@components/Atoms/Button';
import List, { ListProps } from '@components/Molecules/List';

// Props Type
export type ButtonMenuProps = {
  id: string;

  datas?: ListProps['datas'];
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  buttonClasses?: string;
  menuClasses?: string;
  fullWidth?: boolean;
  bold?: boolean;
  disablePadding?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

// Component
export default function ButtonMenu({ datas, onClick, children, ...props }: ButtonMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(event => {
    setAnchorEl(event.currentTarget);

    if (onClick) onClick();
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const datasWithClosing = useMemo(
    () =>
      datas &&
      ArrayUtil.deepMap<TypeUtil.Unit<ListProps['datas'][0]>, TypeUtil.Unit<ListProps['datas'][0]>>(datas, item => ({
        ...item,
        onClick() {
          if (item.onClick) {
            item.onClick();
          }

          handleClose();
        }
      })),
    [datas]
  );

  return (
    <>
      <Button
        className={`${props.buttonClasses}`}
        aria-describedby={props.id}
        onClick={handleClick}
        fullWidth={props.fullWidth}
      >
        {children}
      </Button>

      {datasWithClosing && (
        <MuiPopover
          id={props.id}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={props.anchorOrigin}
          transformOrigin={props.transformOrigin}
          PaperProps={{
            className: `${props.menuClasses}`
          }}
          transitionDuration={{
            enter: 300,
            exit: 100
          }}
          marginThreshold={0}
        >
          <List datas={datasWithClosing} disablePadding={props.disablePadding} dense />
        </MuiPopover>
      )}
    </>
  );
}

// Initial Props
ButtonMenu.defaultProps = {
  data: undefined,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  buttonClasses: '',
  menuClasses: '',
  fullWidth: false,
  bold: false
};
