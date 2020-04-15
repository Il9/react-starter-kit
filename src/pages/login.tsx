import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { RootState } from '@store/modules';
import { asyncLogin } from '@store/modules/app';

import { Button, Container, Grid, TextField } from '@components/Atoms';

const useStyles = makeStyles(() =>
  createStyles({
    bgGradient: {
      backgroundImage: 'linear-gradient(120deg, #3498db, #8244ad)'
    },
    mb5: {
      marginBottom: 5
    },
    mb20: {
      marginBottom: 20
    }
  })
);

// Props Type
type LoginPageProps = {
  temp: string;
};

// Component
const LoginPage: NextPage<LoginPageProps> = ({ temp }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);

  const onClick2 = () => {
    dispatch(asyncLogin.request('String'));
  };

  return (
    <Container disableGutters maxWidth={false} className={`${classes.bgGradient} h-full`}>
      <Grid container justify="center" alignItems="center" className="h-full">
        <Grid item className="max-w-md">
          <Grid container justify="center" alignItems="center" className="h-full mb-10">
            <img className="w-2/5 mb-5" src="/static/logo.png" alt="login-logo" />
          </Grid>
          <TextField type="email" variant="filled" label="Email" size="small" className="mb-2 text-white" fullWidth />
          <TextField type="password" variant="filled" label="Password" size="small" className="mb-5" fullWidth />
          <Button type="button" variant="contained" color="primary" size="large" onClick={onClick2} fullWidth>
            Login
          </Button>

          <div>{app.auth ? 'Success' : 'Failure'}</div>
          {app.loading && <div>Loading...</div>}
          {app.error && <div>{app.error}</div>}
          <div>{temp}</div>
        </Grid>
      </Grid>
    </Container>
  );
};

// Initial Props
LoginPage.getInitialProps = async () => {
  const temp = 'Login Page';

  return { temp };
};

// Export
export default LoginPage;
