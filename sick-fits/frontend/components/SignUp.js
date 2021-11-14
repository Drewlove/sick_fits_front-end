import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup().catch(console.error);
    resetForm();
  }

  return (
    // POST method prevents the information from being posted to the browser window
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up for An Your Account</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go Ahead and Sign
            In!
          </p>
        )}
        <label htmlFor="email">
          Your Name
          <input
            onChange={(e) => handleChange(e)}
            value={inputs.name}
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
          />
        </label>
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
