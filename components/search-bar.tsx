"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockStocks } from "@/lib/mock-data"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSelect = (ticker: string) => {
    setOpen(false)
    router.push(`/stock/${ticker}`)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-gray-200 dark:border-gray-800"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search stocks...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search stocks..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Stocks">
            {mockStocks.map((stock) => (
              <CommandItem key={stock.ticker} onSelect={() => handleSelect(stock.ticker)}>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{stock.ticker}</span>
                  <span className="text-muted-foreground">{stock.name}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
