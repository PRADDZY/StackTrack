"use client"

import { Moon, Sun, Monitor, Settings } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [fontSize, setFontSize] = useState("medium")
  const [contrast, setContrast] = useState("normal")
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const applyFontSize = (size: string) => {
    setFontSize(size)
    const html = document.documentElement

    switch (size) {
      case "small":
        html.style.fontSize = "14px"
        break
      case "medium":
        html.style.fontSize = "16px"
        break
      case "large":
        html.style.fontSize = "18px"
        break
      case "x-large":
        html.style.fontSize = "20px"
        break
      default:
        html.style.fontSize = "16px"
    }
  }

  const applyContrast = (level: string) => {
    setContrast(level)
    const html = document.documentElement

    switch (level) {
      case "low":
        html.style.setProperty("--contrast-modifier", "0.9")
        break
      case "normal":
        html.style.setProperty("--contrast-modifier", "1")
        break
      case "high":
        html.style.setProperty("--contrast-modifier", "1.1")
        break
      case "very-high":
        html.style.setProperty("--contrast-modifier", "1.2")
        break
      default:
        html.style.setProperty("--contrast-modifier", "1")
    }
  }

  // If not mounted yet, render a placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="icon">
        <span className="h-[1.2rem] w-[1.2rem]"></span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          {resolvedTheme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="h-4 w-4 mr-2" />
          System
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Settings className="h-4 w-4 mr-2" />
            <span>Accessibility</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuLabel>Text Size</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={fontSize} onValueChange={applyFontSize}>
              <DropdownMenuRadioItem value="small">Small</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="large">Large</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="x-large">Extra Large</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Contrast</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={contrast} onValueChange={applyContrast}>
              <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="normal">Normal</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="very-high">Very High</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
