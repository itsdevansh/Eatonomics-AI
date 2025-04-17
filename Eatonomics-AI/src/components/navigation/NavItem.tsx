import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick?: () => void;
}

export const NavItem = ({ name, path, icon: Icon, isActive, onClick }: NavItemProps) => {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn(
        "transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2",
        isActive
          ? "text-primary bg-primary/10"
          : "text-gray-600 hover:text-primary hover:bg-primary/5"
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {name}
    </Link>
  );
};