import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, error, loading }] = useMutation(SIGN_IN_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signin();
    resetForm();
  }

  const resError =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    // POST method prevents the information from being posted to the browser window
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <Error error={resError} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            onChange={(e) => handleChange(e)}
            value={inputs.email}
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            onChange={(e) => handleChange(e)}
            value={inputs.password}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
          />
          <button type="submit">Sign In!</button>
        </label>
      </fieldset>
    </Form>
  );
}
