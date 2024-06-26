import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  CircleUser,
  Menu,
  Search,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import SidebarNav from '@/components/sidebarNav'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CustomAvatar from './ui/custom-avatar'
import { get_fallback_name } from '@/lib/utils'

interface headerProps {

  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  handleLogoutClick?: () => void;
  handleEditClick?: () => void;

}

const Header = ({ avatarUrl, firstName, lastName, email, handleLogoutClick, handleEditClick }: headerProps) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SidebarNav />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10">
      <AvatarImage src={avatarUrl} />
      <AvatarFallback className="p-2">
        {get_fallback_name(firstName, lastName, email)}
      </AvatarFallback>
    </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleEditClick}>Edit Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogoutClick}>
            Logout
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
