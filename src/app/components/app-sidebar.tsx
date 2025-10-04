"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Constant_SideBarData } from "@/constants"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import LogOutButton from "./signout"
import { Video } from "lucide-react"

export function AppSidebar() {
  const { data: session } = useSession()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  
  return (
    <Sidebar 
      variant="floating"
      collapsible="icon"
      className="border-r border-gray-200 dark:border-gray-800"
    >
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="flex items-center gap-3 px-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30">
            <Video className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Do-Meet
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Features
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {Constant_SideBarData.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="group hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-200 rounded-lg"
                  >
                    <Link href={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-3 space-y-3">
        {!isCollapsed ? (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 p-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-emerald-500/20 flex-shrink-0">
                <AvatarImage 
                  src={session?.user?.image || ''} 
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold text-sm">
                  {session?.user?.name?.[0]?.toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Avatar className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-emerald-500/20">
              <AvatarImage 
                src={session?.user?.image || ''} 
                className="h-full w-full object-cover"
              />
              <AvatarFallback className="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold text-sm">
                {session?.user?.name?.[0]?.toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        <LogOutButton />
      </SidebarFooter>
    </Sidebar>
  )
}