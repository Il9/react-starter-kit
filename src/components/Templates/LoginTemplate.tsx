import { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Button from '@components/Atoms/Button';
import Grid from '@components/Atoms/Grid';
import Image from '@components/Atoms/Image';
import LoginForm, { LoginFormProps } from '@components/Organisms/LoginForm';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // background: 'linear-gradient(120deg, #3498db, #8244ad)',
      background: 'linear-gradient(120deg, #16a085, #3498db, #8244ad) 0% 0% / 200% 200%',
      animation: 'LoginBackgroundAnimation 30s ease infinite;'
    }
  })
);

// Props Type
export type LoginTemplateProps = {
  joinUrl: string;
  form: LoginFormProps;
};

// Component
export default function LoginTemplate({ joinUrl, ...props }: LoginTemplateProps) {
  const classes = useStyles();
  const methods = useForm();

  const handleJoinClick = useCallback(() => {
    window.open(joinUrl);
  }, [joinUrl]);

  return (
    <Grid container justify="center" alignItems="center" className={`h-full ${classes.root}`}>
      <Grid item className="max-w-md">
        <Grid container justify="center" alignItems="center" className="mb-10">
          <Image src="/static/logo.png" alt="login-logo" className="w-2/5" />
        </Grid>
        <FormProvider {...methods}>
          <LoginForm {...props.form} />
        </FormProvider>
        <Grid container justify="flex-end">
          <Button onClick={handleJoinClick}>Not a member?</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

// Initial Props
LoginTemplate.defaultProps = {};
