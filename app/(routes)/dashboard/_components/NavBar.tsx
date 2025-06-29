import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import React from "react"
import { Scale } from "lucide-react"

const menuOptions = [
    {
        id: 1,
        name: 'Home',
        path: '/dashboard'
    },
    {
        id: 2,
        name: 'History',
        path: '/dashboard/history'
    },
    {
        id: 3,
        name: 'Pricing',
        path: '/dashboard/billing'
    },
    {
        id: 4,
        name: 'Profile',
        path: '/dashboard/profile'
    }
]

function NavBar() {
    return (
        <div className="flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40">
            <Link href={'/'} className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-blue" />
            <span className="font-bold text-xl tracking-tight text-blue">LegalSnap</span>
            </Link>
            <div className="hidden md:flex gap-12 items-center">
                {
                    menuOptions.map((option, index) => (
                        <Link key={index} href={option.path}>
                            <h2 className="cursor-pointer transition-all hover:font-bold">
                                {
                                    option.name
                                }
                            </h2>
                        </Link>
                    ))
                }
            </div>
            <UserButton />
        </div>
    )
}

export default NavBar