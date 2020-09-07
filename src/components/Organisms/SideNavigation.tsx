import { useMemo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { UiConfig } from '@config';
import { CommonUtil } from '@util';
import Paper from '@components/Atoms/Paper';
import Icon from '@components/Atoms/Icon';
import ButtonMenu from '@components/Molecules/ButtonMenu';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: UiConfig.layout.SIDE_NAVIGATION_WIDTH,
      height: `calc(100% - ${UiConfig.layout.HEADER_HEIGHT}px)`,
      backgroundColor: theme.palette.primary.dark
    },
    menuBtn: {
      height: UiConfig.layout.SIDE_NAVIGATION_WIDTH,
      color: theme.palette.common.white,
      borderBottom: `1px solid ${theme.palette.primary.main}`
    },
    menuPaper: {
      'width': 180,
      'backgroundColor': theme.palette.primary.main,
      '& span': {
        fontWeight: 700
      },
      '& span, & svg': {
        color: 'white'
      }
    }
  })
);

// Props Type
export type SideNavigationProps = {};

// Component
export default function SideNavigation() {
  const classes = useStyles();

  const navigationData = useMemo(
    () => [
      {
        text: 'home',
        onClick: CommonUtil.createRedirectHandler('/home/dashboard')
      },
      {
        text: 'list',
        data: [
          {
            text: 'table',
            icon: <Icon type="TableChart" fontSize="small" />,
            onClick: CommonUtil.createRedirectHandler('/list/table')
          }
        ]
      }
    ],
    []
  );

  return (
    <Paper square className={classes.root}>
      {navigationData.map(({ text, data, onClick }, index) => (
        <ButtonMenu
          key={index}
          id={`side-navigation-menu-${index}`}
          datas={data}
          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
          buttonClasses={`${classes.menuBtn} rounded-none min-w-full font-bold`}
          menuClasses={classes.menuPaper}
          onClick={onClick}
          fullWidth
        >
          {text}
        </ButtonMenu>
      ))}
    </Paper>
  );
}

// Initial Props
SideNavigation.defaultProps = {};
