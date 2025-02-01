import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signOut as signOutUser, fetchAuthSession } from "aws-amplify/auth";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import "./AuthProvider.css"; 
import awsconfig from '../../renderer/aws-exports'; 
import { Amplify } from 'aws-amplify';

Amplify.configure(awsconfig);

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // ✅ User info only
  const [authState, setAuthState] = useState({ token: null, expiry: null }); // ✅ Separate token storage
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const authenticatedUser = await getCurrentUser();
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString() || null; // ✅ Now using ID Token
        const expiry = session.tokens?.idToken?.payload.exp * 1000; // ✅ Convert to ms

        setUser(authenticatedUser); // ✅ Store user separately
        setAuthState({ token, expiry }); // ✅ Store token separately

        console.log("✅ User authenticated:", authenticatedUser);
        console.log("✅ JWT Token (ID Token):", token);
      } catch (error) {
        console.log("❌ No user found, showing Authenticator");
        setShowAuth(true);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  /**
   * Ensures the token is valid, refreshing it if necessary.
   * @returns {Promise<string|null>} - The valid token or null if refresh fails.
   */
  async function ensureValidToken() {
    if (!authState.token) {
      console.error("❌ No token found");
      return null;
    }

    const now = Date.now();
    const expiresInMs = (authState.expiry || 0) - now;

    // ✅ Refresh token if it's expiring in <60 sec
    if (expiresInMs < 60000) {
      console.log("🔄 Refreshing token...");

      try {
        const session = await fetchAuthSession();
        const newToken = session.tokens?.idToken?.toString(); // ✅ Get new ID Token
        const expiry = session.tokens?.idToken?.payload.exp * 1000; // ✅ Convert to ms

        console.log("✅ Token refreshed successfully:", newToken);

        // ✅ Update token state
        setAuthState({ token: newToken, expiry });

        return newToken;
      } catch (error) {
        console.error("❌ Failed to refresh token:", error);
        return null;
      }
    }

    return authState.token; // ✅ Token is still valid
  }

  const signOut = async () => {
    await signOutUser();
    setUser(null);
    setAuthState({ token: null, expiry: null }); // ✅ Clear token state
    setShowAuth(true);
  };

  return (
    <AuthContext.Provider value={{ user, authState, setAuthState, signOut, ensureValidToken }}>
      {children}

      {showAuth && (
        <div className="auth-overlay">
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
