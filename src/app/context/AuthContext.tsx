import React, { useState, useEffect, useContext, createContext } from 'react';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import firebase_app from '../firebase/config';

const auth = getAuth(firebase_app);

interface UserType {
  email: string | null;
  uid: string | null;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: UserType;
  logIn: (email: string, password: string) => Promise<UserType>;
  signUp: (email: string, password: string) => Promise<UserType>;
  logOut: () => Promise<void>;
}

/** Setup the authentication context */
export const AuthContext = createContext<AuthContextType>({
  user: { email: null, uid: null, isLoggedIn: false },
  logIn: async (email: string, password: string) => {
    throw new Error("logIn function not implemented");
  },
  signUp: async (email: string, password: string) => {
    throw new Error("signUp function not implemented");
  },
  logOut: async() =>{
    throw new Error("logOut function not implemented");
  }
});


/** Configure auth */
export const useAuth = () => useContext(AuthContext);

/** Provider for Auth */
export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null, isLoggedIn: false });
  const [loading, setLoading] = useState<boolean>(true);

  /** Setup hooks to update user state */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser({
          email: authUser.email,
          uid: authUser.uid,
          isLoggedIn: true
        });
      } else {
        setUser({
          email: null,
          uid: null,
          isLoggedIn: false
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /** Attempt to log the user in */
  const logIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return {
        email: auth.currentUser?.email || null,
        uid: auth.currentUser?.uid || null
      };
    } catch (error) {
      throw error as AuthError;
    }
  };

  /** Attempt to log the user out */
  const logOut = async () => {
    setUser({ email: null, uid: null, isLoggedIn: false });
    return await signOut(auth);
  };

  /** Create an account for the user given an email and a password */
  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return {
        email: auth.currentUser?.email || null,
        uid: auth.currentUser?.uid || null
      };
    } catch (error) {
      throw error as AuthError;
    }
  };

  return (
    <AuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {loading ? <div>Loading...</div> : <>{children}</>}
    </AuthContext.Provider>
  );
};