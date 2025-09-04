import { useState } from "react";
import { 
  BarChart3, 
  Activity, 
  Settings, 
  AlertTriangle, 
  Zap, 
  MapPin, 
  TrendingUp, 
  PieChart, 
  LineChart,
  BarChart
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Goodman", url: "/", icon: BarChart3 },
  { title: "Dynagraphs", url: "/dynagraphs", icon: Activity },
  { title: "Pump Control", url: "/pump-control", icon: Settings },
  { title: "Anomalies", url: "/anomalies", icon: AlertTriangle },
  { title: "Pump", url: "/pump", icon: Zap },
  { title: "Well", url: "/well", icon: MapPin },
  { title: "IPR Curve", url: "/ipr-curve", icon: TrendingUp },
  { title: "Production 1", url: "/production-1", icon: PieChart },
  { title: "Production 2", url: "/production-2", icon: LineChart },
  { title: "Trends", url: "/trends", icon: BarChart },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold text-primary mb-4">
            Analytics Dashboard
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate group-data-[collapsible=icon]:sr-only">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}