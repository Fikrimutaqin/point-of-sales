"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  ArrowLeftRight
} from "lucide-react"

import { NavMain } from "@/features/sidebar/components/nav/NavMain"
import { NavUser } from "@/features/sidebar/components/nav/NavUser"
import { TeamSwitcher } from "@/features/sidebar/components/nav/TeamSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/components/ui/sidebar"
import { getNavUserFromStorage } from "@/lib/auth-storage"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "POS",
      url: "#",
      icon: ArrowLeftRight,
      isActive: false,
      items: [],
    },
  ],
}

 export default function SidebarSection({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState({
    name: "Guest",
    email: "guest@example.com",
    avatar: "/avatars/shadcn.jpg",
  })

  React.useEffect(() => {
    const stored = getNavUserFromStorage()
    if (stored) {
      setUser({
        name: stored.name || "Guest",
        email: stored.email || "guest@example.com",
        avatar: stored.avatar || "/avatars/shadcn.jpg",
      })
    }
  }, [])
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="w-full">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
