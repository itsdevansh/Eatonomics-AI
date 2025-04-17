import { NavItem } from "./NavItem";
import type { NavItemType } from "./types";

interface DesktopNavProps {
  navItems: NavItemType[];
  isActive: (path: string) => boolean;
  isAuthenticated: boolean;
}

export const DesktopNav = ({ navItems, isActive }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          {...item}
          isActive={isActive(item.path)}
        />
      ))}
    </div>
  );
};