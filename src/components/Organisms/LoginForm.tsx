import { useFormContext, SubmitHandler } from 'react-hook-form';

import Grid from '@components/Atoms/Grid';
import Form from '@components/Atoms/Form';
import Button from '@components/Atoms/Button';
import FormControl from '@components/Molecules/FormControl';
import Alert from '@components/Molecules/Alert';

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

// Props Type
export type LoginFormProps = {
  onSubmit: SubmitHandler<FormData>;

  error?: string;
};

// Component
export default function LoginForm({ ...props }: LoginFormProps) {
  const methods = useFormContext<FormData>();

  return (
    <Form onSubmit={methods.handleSubmit(props.onSubmit)}>
      <FormControl
        fullWidth
        required
        formType="text"
        type="text"
        id="email"
        name="email"
        label="Email"
        className="mb-2"
        variant="filled"
        margin="dense"
      />
      <FormControl
        fullWidth
        required
        formType="text"
        type="password"
        id="password"
        name="password"
        label="Password"
        className="mb-2"
        variant="filled"
        margin="dense"
      />
      <Grid container alignItems="center" className="mb-2">
        <Grid item xs={6}>
          <FormControl formType="checkbox" id="remember" name="remember" label="Remeber me" color="default" />
        </Grid>
        <Grid container item justify="flex-end" xs={6}>
          <Button>Forgot Password?</Button>
        </Grid>
      </Grid>
      <Grid container className="mb-2">
        <Button fullWidth type="submit" variant="contained" color="primary" size="large">
          Login
        </Button>
        {props.error && (
          <Alert fullWidth severity="error" variant="filled" size="small" className="mt-2">
            {props.error}
          </Alert>
        )}
      </Grid>
    </Form>
  );
}

// Initial Props
LoginForm.defaultProps = {};
