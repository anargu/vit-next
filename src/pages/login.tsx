import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CircularLoader } from "../components/Loaders";
import { showDefaultNotification } from "../components/Notification/Notification";
import { getSignInResult, signIn, upsertUser } from "../services/auth";
import { migrateLocalData } from "../services/datasource";

export const LoginPage = () => {
  const router = useRouter();

  const [hasError, setHasError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSignInResult = async () => {
      try {
        setIsLoading(true);
        const authenticatedUser = await getSignInResult();

        if (!authenticatedUser) return setIsLoading(false);

        // Creates user
        await upsertUser(authenticatedUser);

        // Migrate user data if any
        if (await migrateLocalData(authenticatedUser)) {
          showDefaultNotification(
            "Migration of local data succeeded!",
            "Info",
          );
        }

        setIsLoading(false);

        return await router.push("/");
      } catch (error) {
        console.error(`>>> error ${error}`);
        setHasError(error);
      }

      setIsLoading(false);
    };

    fetchSignInResult();
  }, []);

  return <div className="h-screen flex flex-col justify-center items-center">
    <button
      onClick={(e) => {
        e.preventDefault();

        signIn();
      }}
      type="button"
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
    >
      <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
      Sign in with Google
    </button>

    {hasError
    ? (<div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          <span className="font-medium">Oops! there is an Error:</span> {hasError?.message ?? "Please try again"}
      </div>)
    : null}

    {isLoading
    ? (<div className="p-4 mb-4 text-sm text-stone-800 bg-amber-300 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          <span className="font-regular">We are syncing your data. Please wait a moment.</span>
          <span className="px-2"><CircularLoader size="18px" colorClassname="text-stone-800" /></span>
      </div>)
    : null}

  </div>;
}

