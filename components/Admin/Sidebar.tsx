import Link from "next/link";
import {
  CircleUser,
  Home,
  LogOut,
  MapPin,
  ShoppingBagIcon,
} from "lucide-react";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { useLogout } from "@/services/useLogout";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const router = useRouter();
  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 mb-2 hover:bg-primary hover:text-white"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <Button
        variant={router.pathname === "/admin" ? "default" : "ghost"}
        className="flex items-center justify-start gap-3 mb-2 hover:bg-primary hover:text-white"
        title="Admin"
        asChild
      >
        <Link href="/admin">
          <CircleUser />
          <span className="hidden lg:inline">Admin</span>
        </Link>
      </Button>
      <Button
        variant={router.pathname === "/admin/orders" ? "default" : "ghost"}
        className="flex items-center justify-start gap-3 mb-2 hover:bg-primary hover:text-white"
        title="Orders"
        asChild
      >
        <Link href="/admin/orders">
          <ShoppingBagIcon />
          <span className="hidden lg:inline">Orders</span>
        </Link>
      </Button>
      <Button
        variant={router.pathname === "/admin/meetings" ? "default" : "ghost"}
        className="flex items-center justify-start gap-3 hover:bg-primary hover:text-white mb-2"
        title="Track Orders"
        asChild
      >
        <Link href="/admin/meetings">
          <RiCalendarScheduleFill />
          <span className="hidden lg:inline">Scheduled Meetings</span>
        </Link>
      </Button>

      <Button
        variant={
          router.pathname === "/admin/change-password" ? "default" : "ghost"
        }
        className="flex items-center justify-start gap-3 hover:bg-primary hover:text-white mb-2"
        title="hange Password"
        asChild
      >
        <Link href="/admin/change-password">
          <MapPin />
          <span className="hidden lg:inline">Change Password</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 hover:bg-primary hover:text-white mb-0 w-full"
        title="Log Out"
        onClick={useLogout}
      >
        <LogOut />
        <span className="hidden lg:inline">Log Out</span>
      </Button>
    </div>
  );
};
