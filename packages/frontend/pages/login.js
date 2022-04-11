import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Login() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['user']);
  const [gqlErrors, setGqlErrors] = useState([]);

  useEffect(() => {
    if (cookies['user']) {
      router.push('/');
    }
  }, []);

  const [loginMutation, { data }] = useMutation(LOGIN);

  const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = ({ username, password }) => {
    loginMutation({ variables: { username, password } })
      .then(res => {
        setGqlErrors([]);
        setCookie('user', JSON.stringify(res.data.login));
        router.push('/');
      })
      .catch(res => {
        if (res.graphQLErrors) {
          const resErrors = res.graphQLErrors.map((error) => {
            return error.message;
          });
          setGqlErrors(resErrors);
          setError(resErrors[0]);
        }
      })
  }

  return (
    <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          {gqlErrors.map(error => error)}
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Username</label>
                <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button disabled={formState.isSubmitting} className="btn btn-primary">
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Login
            </button>
            {errors.apiError &&
                <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
            }
          </form>
        </Box>
      </Box>
    </Container>
  )
}

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`;
