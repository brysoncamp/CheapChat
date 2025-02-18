import "./SignUpButton.css";
import arrowUpRight from "./arrow-up-right.svg";

import { useAuth } from "../AuthProvider/AuthProvider";

const SignUpButton = ({ signUp }) => {
  const signUpText = signUp ? "Sign up for $1 in free credits" : "Sign in to send messages";
  const { showAuth } = useAuth();

  return (
    <button className="signup-button" onClick={showAuth}>
      { signUpText }
      <img src={arrowUpRight} alt="Cross" />
    </button>
  );
};

export default SignUpButton;