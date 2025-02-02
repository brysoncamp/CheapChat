import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signOut as signOutUser, fetchAuthSession } from "aws-amplify/auth";
import { ThemeProvider, Authenticator, defaultTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./AuthProvider.css"; 
import crossUrl from "./cross.svg";
import awsconfig from "../../config/aws-exports"; 
import { Amplify } from "aws-amplify";
// Layout.jsx (or onRenderClient.jsx)


Amplify.configure(awsconfig);

const AuthContext = createContext(null);

// 🔹 Custom Theme
const customTheme = {
  name: "CustomAuthTheme",
  tokens: {
    colors: {
      background: {
        primary: "white",
      },
      font: {
        primary: { value: "black" },
        secondary: { value: "black" }
      },
      border: { primary: "black" }
    },
    components: {
      heading: {
        color: { value: "white" }, // Ensures heading text color applies
      },
      text: {
        color: { value: "#000000" }, // Applies to most normal text elements
      },
      label: {
        color: { value: "#222222" }, // Applies to input labels
      },
      link: {
        color: { value: "#007bff" }, // Hyperlink color (forgot password, etc.)
        textDecoration: { value: "none" },
        _hover: {
          color: { value: "#0056b3" }, // Hover effect for links
        },
      },
      button: {
        primary: {
          backgroundColor: { value: "red" }, // Primary buttons (Sign In, Submit)
          color: { value: "#ffffff" }, // Text color inside primary buttons
          borderRadius: { value: "8px" },
          _hover: {
            backgroundColor: { value: "darkred" }, // Hover color
          },
        },
        secondary: {
          backgroundColor: { value: "#f0f0f0" }, // Secondary buttons (Cancel)
          color: { value: "#333333" },
          _hover: {
            backgroundColor: { value: "#d6d6d6" },
          },
        },
      },
      textfield: {
        borderColor: { value: "#ff0000" }, // Input field border color
        backgroundColor: { value: "#f9f9f9" }, // Input field background
        color: { value: "#000000" }, // Text color inside inputs
        _focus: {
          borderColor: { value: "#007bff" }, // Highlight input on focus
        },
      },
      tabs: {
        item: {
          color: { value: "#007bff" }, // Default text color
          _hover: { color: { value: "#0056b3" } }, // Hover effect
          fontWeight: { value: "bold" }, // Make selected tab bold
        },
        
        backgroundColor: { value: "#ffffff" }, // Background color of the tab bar
        _selected: {
          fontWeight: { value: "bold" },
          borderColor: { value: "red" },
        },
      },
    },
  },
};

// 🔹 Form Fields Customization
const formFields = {
  signIn: {
    username: {
      label: "Your Email Address",
      placeholder: "Enter your email",
    },
    password: {
      label: "Enter Your Password",
      placeholder: "Type your password",
    },
  },
  signUp: {
    email: {
      label: "Email Address",
      placeholder: "Enter your email",
    },
    password: {
      label: "Choose a Strong Password",
      placeholder: "Enter password",
    },
    confirm_password: {
      label: "Confirm Password",
      placeholder: "Re-enter your password",
    },
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState({ token: null, expiry: null });
  const [showAuth, setShowAuth] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticatedUser = await getCurrentUser();
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString() || null;
        const expiry = session.tokens?.idToken?.payload.exp * 1000;
        setUser(authenticatedUser);
        setAuthState({ token, expiry });
        setTimeout(() => setFadeIn(true), 10);
      } catch (error) {
        setShowAuth(true);
        setTimeout(() => setFadeIn(true), 10);
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
    setShowAuth(true);
    setTimeout(() => setFadeIn(true), 10);
  };

  return (
    <AuthContext.Provider value={{ user, authState, setAuthState, signOut, ensureValidToken }}>
      {children}

      {showAuth && (
        <div className={`auth-overlay ${fadeIn ? "active" : ""}`}>
          <div className="auth-container">
            {/* Close button */}
            <img src={crossUrl} alt="Close" className="close-button" onClick={() => setShowAuth(false)} />

            <ThemeProvider theme={customTheme}>
              <Authenticator
                formFields={formFields} // 🔹 Using the separate formFields variable
                signInButtonText="Log In Now"
                signUpButtonText="Register Your Account"
                socialProviders={["google"]}
                initialState="signIn"
              >
                {({ user }) => {
                  useEffect(() => {
                    setUser(user);
                    setShowAuth(false);
                    setFadeIn(false);
                  }, [user]); // ✅ Only runs when user changes

                  return null;
                }}
              </Authenticator>
            </ThemeProvider>
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
