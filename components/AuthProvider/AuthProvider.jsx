import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signOut as signOutUser } from "aws-amplify/auth";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import "./AuthProvider.css"; 
import awsconfig from '../../renderer/aws-exports'; 
import { Amplify } from 'aws-amplify';

Amplify.configure(awsconfig);

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [fadeIn, setFadeIn] = useState(false); // New state for transition

  useEffect(() => {
    async function checkAuth() {
      try {
        const authenticatedUser = await getCurrentUser();
        setUser(authenticatedUser);
        console.log("User authenticated:", authenticatedUser);
      } catch (error) {
        console.log("No user found, showing Authenticator");
        setShowAuth(true);
        // Delay adding the "active" class to allow transition
        setTimeout(() => setFadeIn(true), 10);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const signOut = async () => {
    await signOutUser();
    setUser(null);
    setShowAuth(true);
    setTimeout(() => setFadeIn(true), 10);
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}

      {/* Ensure overlay is rendered but starts invisible */}
      {showAuth && (
        <div className={`auth-overlay ${fadeIn ? "active" : ""}`}>
          <div className="auth-container">
            <Authenticator
              loginMechanisms={["email"]}
              socialProviders={["google"]}
              initialState="signUp"
              hideSignUp={false}
            >
              {({ user, signOut }) => {
                setUser(user);
                setShowAuth(false);
                setFadeIn(false);
                return null;
              }}
            </Authenticator>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
