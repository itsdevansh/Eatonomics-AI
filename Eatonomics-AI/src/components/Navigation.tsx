import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, User, Calendar } from "lucide-react";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import type { NavItemType } from "./navigation/types";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAuthenticated = localStorage.getItem("token") !== null;

  const publicNavItems: NavItemType[] = [
    { name: "Home", path: "/" },
    { name: "Sign Up", path: "/signup" },
    { name: "Login", path: "/login" },
  ];

  const privateNavItems: NavItemType[] = [
    { name: "Meal Planner", path: "/meal-planner", icon: Calendar },
    { name: "Chat", path: "/chat", icon: MessageSquare },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const navItems = isAuthenticated ? privateNavItems : publicNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-primary">
              Eatonomics AI
            </Link>
          </div>

          <DesktopNav
            navItems={navItems}
            isActive={isActive}
            isAuthenticated={isAuthenticated}
          />

          <MobileNav
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            navItems={navItems}
            isActive={isActive}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;