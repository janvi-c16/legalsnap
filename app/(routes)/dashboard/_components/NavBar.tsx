"use client"
import React from "react"
import Link from "next/link"
import { Scale, Sun, Moon } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

const menuOptions = [
    { id: 1, name: 'Home', path: '/dashboard' },
    { id: 2, name: 'History', path: '/dashboard/history' },
    { id: 3, name: 'Pricing', path: '/dashboard/billing' },
    { id: 4, name: 'Profile', path: '/dashboard/profile' }
]

function NavBar() {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
        }
        return 'light';
    });

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <header>
            <nav data-state={menuState && 'active'} className="fixed z-20 w-full px-2 group">
                <div className={`mx-auto mt-4 max-w-4xl rounded-2xl border border-white/10 bg-black/80 backdrop-blur-lg px-6 transition-all duration-300 lg:px-12 ${isScrolled ? 'shadow-lg' : ''}`}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link href="/" aria-label="home" className="flex items-center space-x-2">
                                <Scale className="h-6 w-6 text-white" />
                                <span className="font-bold text-xl tracking-tight text-white">LegalSnap</span>
                            </Link>
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                                <span className="block w-6 h-0.5 bg-white"></span>
                            </button>
                        </div>
                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuOptions.map((item) => (
                                    <li key={item.id}>
                                        <Link href={item.path} className="text-gray-300 hover:text-white block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="hidden lg:flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                className="p-2 rounded-full hover:bg-zinc-700 transition-colors"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-300" />}
                            </button>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                        {/* Mobile menu */}
                        {menuState && (
                            <div className="bg-zinc-900/80 block w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-zinc-700 p-6 shadow-2xl shadow-zinc-950/20 lg:hidden mt-4">
                                <ul className="space-y-6 text-base">
                                    {menuOptions.map((item) => (
                                        <li key={item.id}>
                                            <Link href={item.path} className="text-gray-300 hover:text-white block duration-150" onClick={() => setMenuState(false)}>
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-end mt-4 gap-2">
                                    <button
                                        onClick={toggleTheme}
                                        aria-label="Toggle theme"
                                        className="p-2 rounded-full hover:bg-zinc-700 transition-colors"
                                    >
                                        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-300" />}
                                    </button>
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar