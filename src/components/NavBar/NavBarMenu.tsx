import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface ItemSubMenu {
  label: string,
  url?: string,
  onClick?: (...args : any) => void,
}

interface NavBarItemMenuProps {
  right?: boolean,
  children: React.ReactNode,
  menu?: ItemSubMenu[],
}

export const NavBarItemMenu : React.FC<NavBarItemMenuProps> = ({ right, children, menu }) => {

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className=" relative text-right" ref={ref}>
      <div onClick={() => { setIsOpen((oldValue) => !oldValue) }}>
        {children}
      </div>
      <div className={`${!isOpen && "hidden"} ${right && "right-0"}
        absolute z-30 min-w-[96px] text-base list-none bg-white rounded divide-y
        divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        {menu && (
          <ul className="py-1" aria-labelledby="dropdown">
            {menu.map((item, i) => (
              <li
                key={`nav-menu-item-${i}`}
                onClick={(e : any) => {
                  e.preventDefault?.();

                  setIsOpen(false);
                }}
              >
                {item.url
                ? <Link href={item.url}>
                  <span className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    {item.label}
                  </span>
                </Link>
                : <span
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();

                      item.onClick?.();
                    }}
                  >
                    {item.label}
                  </span>}
                
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

