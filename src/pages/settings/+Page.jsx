import './code.css';
import { useAuth } from '../../components/AuthProvider/AuthProvider';
import ChatOrPage from "../../components/ChatOrPage/ChatOrPage";

const Page = (props) => {
  const { user, signOut } = useAuth();

  // If user is not logged in, show nothing
  /*if (!user) return null;
  console.log("User Data:", user); */
  if (!user) return null;
  
  return (
    <ChatOrPage
      {...props}
      pageContent={
        <div>
          <h1>Welcome, {user.username}</h1>
          <button onClick={signOut}>
            Sign Out
          </button>
        </div>
      }
    />
  );
}

export default Page;