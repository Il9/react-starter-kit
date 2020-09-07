import { useMemo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { blue, green, pink, purple } from '@material-ui/core/colors';

import { ArrayUtil } from '@util';
import Grid from '@components/Atoms/Grid';
import Box from '@components/Atoms/Box';
import Paper from '@components/Atoms/Paper';
import Typography from '@components/Atoms/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    blue: {
      'borderColor': blue[700],
      '& .MuiPaper-root': {
        backgroundColor: blue[700]
      },
      '& svg': {
        color: blue[700]
      }
    },
    green: {
      'borderColor': green[700],
      '& .MuiPaper-root': {
        backgroundColor: green[700]
      },
      '& svg': {
        color: green[700]
      }
    },
    pink: {
      'borderColor': pink[700],
      '& .MuiPaper-root': {
        backgroundColor: pink[700]
      },
      '& svg': {
        color: pink[700]
      }
    },
    purple: {
      'borderColor': purple[700],
      '& .MuiPaper-root': {
        backgroundColor: purple[700]
      },
      '& svg': {
        color: purple[700]
      }
    }
  })
);

// Props Type
export type CountCardProps = {
  text: string;
  count: number;

  color?: 'blue' | 'green' | 'pink' | 'purple';
  border?: boolean;
  icon?: React.ReactNode;
  elevation?: number;
};

// Component
export default function CountCard({ color, border, ...props }: CountCardProps) {
  const classes = useStyles();

  const colorClass = useMemo(() => color && classes[color], [classes, color]);
  const borderClass = useMemo(() => border && 'border-t-4', [border]);
  const rootClass = useMemo(() => ArrayUtil.compactJoin([colorClass, borderClass], ' '), [colorClass, borderClass]);

  return (
    <Paper square elevation={props.elevation} className={rootClass}>
      <Grid container direction="column" justify="center" alignItems="center" className="p-3">
        <Box className="mb-1 text-center">{props.icon}</Box>
        {props.text}
      </Grid>
      <Paper square elevation={0} className="p-2 text-center">
        <Typography bold variant="h6" className="text-white">
          {props.count}
        </Typography>
      </Paper>
    </Paper>
  );
}

// Initial Props
CountCard.defaultProps = {
  border: true,
  elevation: 3
};
