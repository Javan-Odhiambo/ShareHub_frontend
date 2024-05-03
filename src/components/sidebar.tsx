import React from 'react'
import Link from "next/link"
import {
    Bell,
    Home,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SidebarNav from '@/components/sidebarNav'


const Sidebar = () => {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="font-semibold">
                        <span className="">ShareHub</span>
                    </Link>
                </div>
                <div className="flex-1 px-4">
                    <SidebarNav />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
