import {
  createUserWithEmailAndPassword,
  getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import SplashScreen from "src/components/functional/SplashScreen";
import { Auth, authUserInitialValue } from "src/models/Auth";
import { firebaseAuth } from "../libs/firebase";

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: authUserInitialValue,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "AUTH_STATE_CHANGED": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: "FirebaseAuth",
  login: (email: Email, password: string) => {},
  register: (email: Email, password: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = (email: Email, password: string) => {
    signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const register = (email: Email, password: string) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logout = () => {
    signOut(firebaseAuth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const token = await getIdToken(user);
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid,
              token: token,
              avatar: user.photoURL,
              email: user.email,
              name: user.displayName || user.email,
              tier: "Premium",
            },
          },
        });
      } else {
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: false,
            user: authUserInitialValue,
          },
        });
      }
    });
    return unsubscribe;
  }, [dispatch]);

  if (!state.isInitialized) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={
        {
          ...state,
          method: "FirebaseAuth",
          login,
          register,
          logout,
        } as Auth
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
