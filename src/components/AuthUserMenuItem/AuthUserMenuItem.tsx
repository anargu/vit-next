import { useAuth } from "@/src/hooks/useAuth";
import { logOut } from "@/src/services/auth";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import User from "../../../public/assets/user.svg";
import { CircularLoader } from "../Loaders";
import { NavBarItemMenu } from "../NavBar/NavBarMenu";

export const AuthUserMenuItem = () => {
  const router = useRouter();
  const { isAuthenticated, authUser } = useAuth();
  const [ isLoading, setIsLoading ] = useState(false);

  const logOut_ = async () => {
    setIsLoading(true);

    await logOut();

    // redirects
    router.push("/login");

    setIsLoading(false);
  };

  const menu = useMemo(() => (
    isAuthenticated
      ? [
        { label: `Hi ${authUser?.email}` },
        { label: "Log out", onClick: logOut_ },
      ]
      : [
        { label: "Sign In", url: "/login" },
      ]
  ), [isAuthenticated]) ; 

  return (
    <NavBarItemMenu
      key={`auth-user-${isAuthenticated}`}
      menu={menu}
      right
    >
      <span className="cursor-pointer inline-flex items-center gap-2">
        <User />
        {isLoading
          ? (
            <CircularLoader colorClassname="text-stone-800" />
          )
          : null}
      </span>
    </NavBarItemMenu>
  );
};

