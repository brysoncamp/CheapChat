import "./SignUpButton.css";
import arrowUpRight from "./arrow-up-right.svg";

import { useAuth } from "../AuthProvider/AuthProvider";
import { isMobile } from "react-device-detect";

const SignUpButton = ({ signUp }) => {
  let signUpText = signUp ? "Sign up for $1 in free credits" : "Sign in to send messages";
  if (isMobile) signUpText = signUp ? "Sign up" : "Sign in";
  
  const { showAuth } = useAuth();

  return (
    <button className="signup-button" onClick={showAuth}>
      { signUpText }
      <img src={arrowUpRight} alt="Cross" />
    </button>
  );
};

export default SignUpButton;