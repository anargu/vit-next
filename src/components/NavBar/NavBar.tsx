import React, { useState } from "react";
import Image from "next/image";
import { NavBarItemMenu } from "./NavBarMenu";

export const FEED_LABEL = "Feed";
export const SAVED_LABEL = "Saved";

interface NavBarItemProps {
  active?: boolean,
  children?: React.ReactNode,
  onClick?: () => void,
}

const NavBarItem = ({ active, children, ...props  } : NavBarItemProps) => (
  <div className={`${active ? "text-base text-black-400 underline" : "text-base text-gray-600"} cursor-pointer text-center`} {...props}>{children}</div>
);

interface NavBarProps {
}

interface LeftItem {
  label: string,
  active: boolean,
}

export const NavBar = (props : NavBarProps) => {

  const [leftItems, setLeftItems] = useState<LeftItem[]>([
    { label: FEED_LABEL, active: true, },
    { label: SAVED_LABEL, active: false, },
  ]);

  const onSelectItem = (item : LeftItem) => {
    setLeftItems(
      leftItems.map((leftItem) => (leftItem.label === item.label)
        ? ({ ...leftItem, active: true })
        : ({ ...leftItem, active: false })
      )
    );
  };

  return (
    <div className="">
      <div className="grid grid-cols-[48px_48px_auto_70px] lg:grid-cols-[96px_96px_auto_70px] px-4 items-center h-[72px]">
        {leftItems.map((item) =>
          <NavBarItem
            key={item.label}
            active={item.active}
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
    </div>
  );
};

