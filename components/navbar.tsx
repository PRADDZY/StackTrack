"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, BarChart2, TrendingUp, Users, BookOpen, BotIcon as Robot, Eye, LineChart } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/portfolio", label: "Portfolio", icon: BarChart2 },
    { href: "/watchlist", label: "Watchlist", icon: Eye },
    { href: "/charts", label: "Charts", icon: LineChart },
    { href: "/forecast", label: "Forecast", icon: TrendingUp },
    { href: "/social", label: "Social", icon: Users },
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/robo-advisor", label: "Assistant", icon: Robot },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-purple-500" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
              StackTrack
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {links.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <div className="relative flex items-center space-x-1">
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </div>
              </Link>
            )
          })}
        </nav>
        <div className="md:hidden flex-1 overflow-x-auto">
          <nav className="flex items-center space-x-4">
            {links.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex flex-col items-center text-xs font-medium transition-colors hover:text-primary py-1",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <div className="relative flex flex-col items-center">
                    <link.icon className="h-4 w-4 mb-1" />
                    <span className="text-[10px]">{link.label}</span>
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-[6px] left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300"
                        layoutId="navbar-indicator-mobile"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
