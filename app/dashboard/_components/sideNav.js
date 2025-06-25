import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  BadgeIndianRupee,
  Bot,
} from "lucide-react";

export default function SideNav({ mobile = false }) {
  const pathname = usePathname();

  const sideNavList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: Wallet,
      link: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: BadgeIndianRupee,
      link: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "AI Insights (SOON🕒)",
      icon: Bot,
      link: "/dashboard/ai-insights",
    },
  ];

  return (
    <nav
      className={`${
        mobile
          ? "flex flex-row justify-around items-center h-full"
          : "min-h-screen border-r border-white/10 shadow-md backdrop-blur-sm px-4 py-6"
      } text-white`}
    >
      {sideNavList.map(({ id, name, icon: Icon, link }) => {
        const active = pathname === link;

        return (
          <Link key={id} href={link} className="group">
            <div
              className={`${
                mobile
                  ? "flex flex-col items-center justify-center px-3 py-2 rounded"
                  : "flex items-center space-x-3 my-4 p-4 rounded cursor-pointer hover:bg-blue-800"
              } ${active ? "bg-blue-800" : ""}`}
            >
              <Icon className="w-6 h-6" />
              <span className={`text-base sm:text-xl ${active ? 'text-white' : 'text-neutral-400'}`}>{name}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
