import { useMemo } from 'react';

import Grid from '@components/Atoms/Grid';
import Box from '@components/Atoms/Box';
import Paper from '@components/Atoms/Paper';
import Typography from '@components/Atoms/Typography';
import Divider from '@components/Atoms/Divider';

// Props Type
export type TitlePaperProps = {
  title: string;

  action?: React.ReactNode;
  children?: React.ReactNode;
};

// Component
export default function TitlePaper({ action, children, ...props }: TitlePaperProps) {
  const subTitleContainerClass = useMemo(() => (action ? 'relative pr-16' : undefined), [action]);

  return (
    <Paper className="p-5 h-full">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box className={subTitleContainerClass}>
            <Typography variant="subtitle2">{props.title}</Typography>
            {action && (
              <Typography
                variant="caption"
                color="textSecondary"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                {action}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
}

// Initial Props
TitlePaper.defaultProps = {};
