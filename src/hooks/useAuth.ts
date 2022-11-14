import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { User } from "../core/entities";
import { auth } from "../firebase";

// Hook
export function useAuth () {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (firebaseUser) => {
      const hasLoggedUser = !!firebaseUser;

      const authUser : User | null = hasLoggedUser ? {
        id: firebaseUser!.uid,
        email: firebaseUser!.email!,
        displayName: firebaseUser!.displayName!,
      } : null;

      setIsAuthenticated(hasLoggedUser);
      setAuthUser(hasLoggedUser ? authUser : null);
    });

    return () => unSub && unSub();
  }, []);

  return {
    isAuthenticated,
    authUser,
  };
}


