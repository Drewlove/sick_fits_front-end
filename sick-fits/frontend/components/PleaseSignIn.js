import { useUser } from './User';
import SignIn from './SignIn';

// renders a signIn component if the user is not signed in
// see the sell page, under pages, for an example
export default function ({ children }) {
  const me = useUser();
  if (!me) return <SignIn />;
  return children;
}
