"use client";

import {
  Building2,
  CreditCard,
  Frame,
  MapPinned,
  PieChart,
  Settings2,
  ShoppingCart,
  SquareTerminal,
  Users,
} from "lucide-react";
import type { Route } from "next";
import { type ComponentType, useEffect, useState } from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSessionStore } from "@/state/session";

export type NavItem = {
  title: string;
  url: Route;
  icon?: ComponentType;
};

export type NavMainItem = NavItem & {
  isActive?: boolean;
  items?: NavItem[];
};

type Data = {
  user: {
    name: string;
    email: string;
  };
  teams: {
    name: string;
    logo: ComponentType;
    plan: string;
  }[];
  navMain: NavMainItem[];
  projects: NavItem[];
};

// TODO Add a theme switcher
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSessionStore();
  const [formattedTeams, setFormattedTeams] = useState<Data["teams"]>([]);

  // Map session teams to the format expected by TeamSwitcher
  useEffect(() => {
    if (session?.teams && session.teams.length > 0) {
      // Map teams from session to the format expected by TeamSwitcher
      const teamData = session.teams.map((team) => {
        return {
          name: team.name,
          // TODO Get the actual logo when we implement team avatars
          logo: Building2,
          // Default plan - you might want to add plan data to your team structure
          plan: team.role.name || "Member",
        };
      });

      setFormattedTeams(teamData);
    }
  }, [session]);

  const data: Data = {
    user: {
      name: session?.user?.firstName || "User",
      email: session?.user?.email || "user@example.com",
    },
    teams: formattedTeams,
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard" as Route,
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Teams",
        url: "/dashboard/teams" as Route,
        icon: Users,
      },
      {
        title: "Marketplace",
        url: "/dashboard/marketplace" as Route,
        icon: ShoppingCart,
      },
      {
        title: "Billing",
        url: "/dashboard/billing" as Route,
        icon: CreditCard,
      },
      {
        title: "Settings",
        url: "/settings" as Route,
        icon: Settings2,
        items: [
          {
            title: "Profile",
            url: "/settings" as Route,
          },
          {
            title: "Security",
            url: "/settings/security" as Route,
          },
          {
            title: "Sessions",
            url: "/settings/sessions" as Route,
          },
          {
            title: "Change Password",
            url: "/forgot-password" as Route,
          },
        ],
      },
    ],
    projects: [
      {
        title: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        title: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        title: "Travel",
        url: "#",
        icon: MapPinned,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      {data?.teams?.length > 0 && (
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
      )}

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
