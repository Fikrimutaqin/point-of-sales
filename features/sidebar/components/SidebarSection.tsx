"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="w-full">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
