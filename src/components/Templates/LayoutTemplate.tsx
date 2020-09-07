import { useMemo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { UiConfig } from '@config';
import Container from '@components/Atoms/Container';
import Header from '@components/Organisms/Header';
import SideNavigation from '@components/Organisms/SideNavigation';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      height: '100%'
    },
    mainContent: {
      width: `calc(100% - ${UiConfig.layout.SIDE_NAVIGATION_WIDTH}px)`,
      maxHeight: `calc(100% - ${UiConfig.layout.HEADER_HEIGHT}px)`,
      padding: theme.spacing(3),
      overflowY: 'scroll'
    }
  })
);

// Props Type
export type LayoutTemplateProps = {
  route: string;
  children: Exclude<React.ReactNode, undefined | null>;
};

// Component
export default function LayoutTemplate({ route, children }: LayoutTemplateProps) {
  const classes = useStyles();

  const layoutYn = useMemo(() => !UiConfig.layout.NOT_CONTAIN_LAYOUT_ROUTES.includes(route), [route]);
  const contentContainerClass = useMemo(() => (layoutYn ? classes.mainContent : undefined), [classes, route]);

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      {layoutYn && (
        <>
          <Header />
          <SideNavigation />
        </>
      )}

      <Container disableGutters maxWidth={false} className={contentContainerClass}>
        {children}
      </Container>
    </Container>
  );
}

// Initial Props
LayoutTemplate.defaultProps = {};
