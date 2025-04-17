import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NavItem } from "./NavItem";
import type { NavItemType } from "./types";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  navItems: NavItemType[];
  isActive: (path: string) => boolean;
  isAuthenticated: boolean;
}

export const MobileNav = ({
  isOpen,
  setIsOpen,
  navItems,
  isActive,
  isAuthenticated,
}: MobileNavProps) => {
  return (
    <>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        >
          {isOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        className={`md:hidden ${
          isOpen ? "block animate-fade-in" : "hidden"
        } border-b border-gray-100`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              {...item}
              isActive={isActive(item.path)}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      </div>
    </>
  );
};