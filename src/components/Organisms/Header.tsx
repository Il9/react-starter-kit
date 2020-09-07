import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import MuiAppbar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';

import { UiConfig } from '@config';
import { CommonUtil } from '@util';
import { ApiService, AuthService } from '@service';
import { uiThemeTypeChange } from '@store/modules/ui';
import Box from '@components/Atoms/Box';
import Button from '@components/Atoms/Button';
import Icon from '@components/Atoms/Icon';
import ButtonMenu, { ButtonMenuProps } from '@components/Molecules/ButtonMenu';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      'height': UiConfig.layout.HEADER_HEIGHT,
      'flexDirection': 'row',
      'alignItems': 'center',
      '& svg': {
        color: 'white'
      }
    },
    logo: {
      'minWidth': UiConfig.layout.SIDE_NAVIGATION_WIDTH,
      'height': UiConfig.layout.HEADER_HEIGHT,
      '& svg': {
        fontSize: '1.75rem'
      }
    },
    other: {
      minWidth: UiConfig.layout.HEADER_HEIGHT,
      height: UiConfig.layout.HEADER_HEIGHT
    }
  })
);

// Props Type
export type HeaderProps = {};

// Component
export default function Header() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const theme = useTheme();

  const isDark = useMemo(() => theme.palette.type === 'dark', [theme]);
  const themeTypeIcon = useMemo(() => (isDark ? 'Brightness7' : 'Brightness4'), [isDark]);

  const data: ButtonMenuProps['datas'] = useMemo(
    () => [
      [
        {
          text: 'Logout',
          onClick: () => {
            ApiService.setDefaultAuthorization();
            AuthService.removeAuthCache();

            CommonUtil.redirect('/login');
          }
        }
      ]
    ],
    []
  );

  const handleThemeTypeChange = useCallback(() => {
    dispatch(uiThemeTypeChange());
  }, []);

  return (
    <MuiAppbar position="static" className={classes.root}>
      <ButtonMenu
        disablePadding
        id="header-logo"
        datas={data}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        buttonClasses={`rounded-none ${classes.logo}`}
      >
        <Icon custom type="Logo" />
      </ButtonMenu>
      <Box display="flex" flex="1 1 auto" />
      <MuiToolbar variant="dense" className={classes.other}>
        <Button icon onClick={handleThemeTypeChange}>
          <Icon type={themeTypeIcon} fontSize="small" />
        </Button>
      </MuiToolbar>
    </MuiAppbar>
  );
}

// Initial Props
Header.defaultProps = {};
