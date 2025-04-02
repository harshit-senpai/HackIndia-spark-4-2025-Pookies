import {
  ChartArea,
  Coins,
  Gamepad2,
  Gem,
  LayoutDashboard,
  LucideFileChartColumnIncreasing,
  MessageCircleMore,
  NotebookIcon,
  NotepadText,
  Settings,
  SquareActivity,
} from "lucide-react";

export const sidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "analytics",
      url: "/analytics",
      icon: ChartArea,
      isActive: false,
    },
    {
      title: "Subscription",
      url: "/subscription",
      icon: Coins,
      isActive: false,
    },
  ],
};
