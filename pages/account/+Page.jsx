import './code.css';
import { useAuth } from '../../components/AuthProvider/AuthProvider';

export { Page };

function Page() {
  const { user, signOut } = useAuth();

  // If user is not logged in, show nothing
  if (!user) return null;

  console.log("User Data:", user);

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}
