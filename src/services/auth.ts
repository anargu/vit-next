import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, firestore, getRedirectResult } from "../firebase"
import { AuthenticatedUser } from "@/src/core/entities"

const googleProvider = new GoogleAuthProvider();

const signIn = async () => {
  await signInWithRedirect(auth, googleProvider)
};

const logOut = async () => {
  await auth.signOut();
};

const getSignInResult = async () => {
  return new Promise<AuthenticatedUser | null>((resolve, reject) => {
    getRedirectResult(auth)
      .then((result) => {
        const user = result?.user;

        if (!user) return resolve(null);

        if (!user.email) throw new Error("No email provided");

        resolve({
          id: user.uid,
          email: user.email,
          displayName: user.displayName ?? user.email.split("@")?.[0],
        });
      }).catch((error) => {
        /* const errorCode = error.code; */
        /* const errorMessage = error.message; */
        /* // The email of the user's account used. */
        /* const email = error.customData.email; */
        console.error(`>>> Error: ${error.message}.\nCode: ${error.code}.\nUser:${error.customData?.email}`);

        reject(error);
      });
  });
};

const upsertUser = async (user : AuthenticatedUser) => {
  try {
    const docRef = doc(firestore, `users/${user.id}`);

    const userSnap = await getDoc(docRef);

    const upsertUserPromise = userSnap.exists()
      ? updateDoc(userSnap.ref, { lastSignIn: new Date() })
      : setDoc(userSnap.ref, {
          id: user.id,
          updatedAt: new Date(),
          createdAt: new Date(),
          lastSignIn: new Date(),
          email: user.email,
          displayName: user.displayName,
        });

    await upsertUserPromise;
  } catch (error) {
    console.error(`Error at upsertUser: ${error}`);
  }
};

export {
  signIn,
  getSignInResult,
  upsertUser,
  logOut,
};

