import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { User } from "../core/entities";
import { auth } from "../firebase";

// Hook
export function useAuth () {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    if (isAuthenticated) return;

    const unSub = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) return;

      const authUser : User = {
        id: firebaseUser!.uid,
        email: firebaseUser!.email!,
        displayName: firebaseUser!.displayName!,
      };

      setIsAuthenticated(!!authUser);
      setAuthUser(authUser);
    });

    return () => unSub && unSub();
  }, [isAuthenticated]);

  return {
    isAuthenticated,
    authUser,
  };
}


