import { NextPage, GetStaticProps } from 'next';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@store/modules';
import { asyncLogin } from '@store/modules/login';
import LoginTemplate, { LoginTemplateProps } from '@components/Templates/LoginTemplate';

// Props Type
type LoginPageProps = {};

// Component
const LoginPage: NextPage<LoginPageProps> = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login);

  const loginPageProps: LoginTemplateProps = useMemo(
    () => ({
      form: {
        onSubmit: formData => {
          dispatch(asyncLogin.request(formData));
        },
        error: loginState.error
      },
      joinUrl: 'https://localhost:3000'
    }),
    [loginState.error]
  );

  return <LoginTemplate {...loginPageProps} />;
};

// Initial Props(Build-time)
export const getStaticProps: GetStaticProps<LoginPageProps> = async () => {
  return {
    props: {}
  };
};

// Export
export default LoginPage;
