"use client"
import React from 'react'
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import {
    CircleUser,
    Home,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    Users,
    Bookmark,
    SquarePen,
    Plus
} from "lucide-react"

const SidebarNav = () => {
    const pathname = usePathname()
    const links = [
        {
            href: "/dashboard",
            icon: Home,
            label: "Home"
        },
        {
            href: "/dashboard/innovation/new",
            icon: Plus,
            label: "New Project"
        },
        {
            href: "/dashboard/my-profile",
            icon: CircleUser,
            label: "My Profile"
        },
        {
            href: "/dashboard/bookmarks",
            icon: Bookmark,
            label: "Bookmarks"
        },
        {
            href: "/dashboard/innovation/drafts",
            icon: SquarePen,
            label: "Drafts"
        }
    ]

    return (
        <nav className="grid gap-2 text-lg font-medium pt-3">
    
           {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                        pathname === link.href
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    {link.icon && <link.icon className="h-5 w-5" />}
                    {link.label}
                </Link>
            ))}
            

                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                </Badge> */}
       
  
        </nav>
    )
}

export default SidebarNav
