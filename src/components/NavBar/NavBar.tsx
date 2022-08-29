import React, { useState } from "react";
import Image from "next/image";
import { NavBarItemMenu } from "./NavBarMenu";
import { useRouter } from "next/router";

export const FEED_LABEL = "Feed";
export const SAVED_LABEL = "Saved";

interface NavBarItemProps {
  active?: boolean,
  children?: React.ReactNode,
  onClick?: () => void,
}

const NavBarItem = ({ active, children, ...props  } : NavBarItemProps) => (
  <div className={`${active ? "text-base text-black-400 underline" : "text-base text-gray-400"} cursor-pointer text-center hover:text-gray-800`} {...props}>{children}</div>
);

interface NavBarProps {
}

interface LeftItem {
  label: string,
  active: boolean,
  path: string,
}

export const NavBar = (props : NavBarProps) => {
  const router = useRouter();
  const { pathname } = router;

  const [leftItems, setLeftItems] = useState<LeftItem[]>([
    { label: FEED_LABEL, path: "/", active: true, },
    { label: SAVED_LABEL, path: "/saved", active: false, },
  ]);

  const onSelectItem = (item : LeftItem) => {
    if (item.label === SAVED_LABEL) return router.push("/saved");
    if (item.label === FEED_LABEL) return router.push("/");
  };

  return (
    <div className="grid grid-cols-[48px_48px_auto_70px] lg:grid-cols-[96px_96px_auto_70px] items-center h-[72px] mx-4">
      {leftItems.map((item) =>
        <NavBarItem
          key={item.label}
          active={item.path === pathname}
          onClick={() => onSelectItem(item)}
        >{item.label}</NavBarItem>)}

      <div className="inline-block w-full"/>

      <div className="inline-grid grid-cols-1 gap-6">
        {/*
          TODO: Switch layout feature
          <Image src="/assets/mosaic.svg" width="28px" height="28px" />
        */}
        <NavBarItemMenu right menu={[
          { label: "About us", url: "/about" }
        ]}>
          <Image src="/assets/more-horizontal.svg" width="28px" height="28px" />
        </NavBarItemMenu>
      </div>
    </div>
  );
};

