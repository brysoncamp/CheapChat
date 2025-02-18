import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signOut as signOutUser, fetchAuthSession } from "aws-amplify/auth";
import { ThemeProvider, Authenticator, View, Heading, Text, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./AuthProvider.css"; 
import crossUrl from "./cross.svg";
import awsconfig from "../../config/aws-exports"; 
import { Amplify } from "aws-amplify";

Amplify.configure(awsconfig);

const AuthContext = createContext(null);

// 🔹 Custom Form Fields
const formFields = {
  signIn: {
    username: {
      label: "",
      placeholder: "Email",
    },
    password: {
      label: "",
      placeholder: "Password",
    },
  },
  signUp: {
    email: {
      label: "",
      placeholder: "Email",
    },
    password: {
      label: "",
      placeholder: "Password",
    },
    confirm_password: {
      label: "",
      placeholder: "Confirm Password",
    },
  },
};

const Header = () => {
  const { route } = useAuthenticator((context) => [context.route]);

  return (
    <View textAlign="left" padding="medium">
      {route === "signIn" ? (
        <>
          <Heading level={4} color="black">Welcome Back!</Heading>
          <Text fontSize="medium" color="gray">Sign in to access CheapChat.</Text>
        </>
      ) : (
        <>
          <Heading level={4} color="black">Sign Up for $1 Free</Heading>
          <Text fontSize="medium" color="gray">Start messaging now—no strings attached.</Text>
        </>
      )}
    </View>
  );
};

const Footer = () => {
  const { route, toSignIn, toSignUp } = useAuthenticator((context) => [context.route]);

  return (
    <View textAlign="center" padding="medium">
      {route === "signIn" ? (
        <Text fontSize="small" color="gray">
          Don't have an account?{" "}
          <Text as="span" color="#047d95" style={{cursor: "pointer", fontWeight: "bold"}} onClick={toSignUp}>
            Sign Up
          </Text>
        </Text>
      ) : (
        <Text fontSize="small" color="gray">
          Already have an account?{" "}
          <Text as="span" color="#047d95" style={{cursor: "pointer", fontWeight: "bold"}} onClick={toSignIn}>
            Sign In
          </Text>
        </Text>
      )}
    </View>
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState({ token: null, expiry: null });
  const [showAuth, setShowAuth] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [hasSignedInBefore, setHasSignedInBefore] = useState(false); // Default false
  const [isAuthLoading, setIsAuthLoading] = useState(true);


  useEffect(() => {
    if (typeof window !== "undefined") {
      // ✅ Access localStorage only on the client
      const hasSignedIn = localStorage.getItem("hasSignedInBefore") === "true";
      setHasSignedInBefore(hasSignedIn);
    }

    const checkAuth = async () => {
      try {
        const authenticatedUser = await getCurrentUser();
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString() || null;
        const expiry = session.tokens?.idToken?.payload.exp * 1000;

        setUser(authenticatedUser);
        setAuthState({ token, expiry });

        // ✅ Store login state only in the browser
        if (typeof window !== "undefined") {
          localStorage.setItem("hasSignedInBefore", "true");
          setHasSignedInBefore(true);
        }

        setTimeout(() => setFadeIn(true), 10);
      } catch (error) {
        setShowAuth(true);
        setTimeout(() => setFadeIn(true), 10);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  const ensureValidToken = async () => {
    if (!authState.token) return null;

    const now = Date.now();
    const expiresInMs = (authState.expiry || 0) - now;

    if (expiresInMs < 60000) {
      try {
        const session = await fetchAuthSession();
        const newToken = session.tokens?.idToken?.toString();
        const expiry = session.tokens?.idToken?.payload.exp * 1000;
        setAuthState({ token: newToken, expiry });
        return newToken;
      } catch (error) {
        return null;
      }
    }

    return authState.token;
  };

  const signOut = async () => {
    await signOutUser();
    setUser(null);
    setAuthState({ token: null, expiry: null });
  };

  const showAuthWithAnimation = () => {
    console.log("showAuthWithAnimation called");
  
    setFadeIn(false); // ✅ Reset fadeIn first
    setShowAuth(true); // ✅ Open modal
  
    setTimeout(() => {
      console.log("Triggering fade-in...");
      setFadeIn(true); // ✅ Now trigger fade-in after render
    }, 10);
  };
  

  return (
    <AuthContext.Provider
      value={{ user, authState, setAuthState, showAuth: showAuthWithAnimation, signOut, ensureValidToken, hasSignedInBefore, isAuthLoading }}
    >
      {children}

      {showAuth && (
        <div className={`auth-overlay ${fadeIn ? "active" : ""}`}>
          <div className="auth-container">
            {/* Close button */}
            <img src={crossUrl} alt="Close" className="close-button" onClick={() => setShowAuth(false)} />

            <Authenticator
              formFields={formFields}
              socialProviders={["google"]}
              initialState={hasSignedInBefore ? "signIn" : "signUp"} // ✅ Dynamically set safely
              components={{ Header, Footer }}
            >
              {({ user }) => {
                useEffect(() => {
                  setUser(user);
                  setShowAuth(false);
                  setFadeIn(false);
                }, [user]);

                return null;
              }}
            </Authenticator>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
