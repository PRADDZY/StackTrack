"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StockList } from "@/components/stock-list"
import { mockStocks } from "@/lib/mock-data"
import { Plus, Trash2, Edit, Save } from "lucide-react"

// Mock watchlists
const defaultWatchlists = [
  {
    id: "1",
    name: "Tech Stocks",
    stocks: mockStocks.filter((stock) => stock.sector === "Technology").map((stock) => stock.ticker),
  },
  {
    id: "2",
    name: "Financial Stocks",
    stocks: mockStocks.filter((stock) => stock.sector === "Financial Services").map((stock) => stock.ticker),
  },
  {
    id: "3",
    name: "Energy Stocks",
    stocks: mockStocks.filter((stock) => stock.sector === "Energy").map((stock) => stock.ticker),
  },
]

export function WatchlistManager() {
  const [watchlists, setWatchlists] = useState(defaultWatchlists)
  const [activeWatchlist, setActiveWatchlist] = useState(watchlists[0]?.id || "")
  const [newWatchlistName, setNewWatchlistName] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [availableStocks, setAvailableStocks] = useState(mockStocks)
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  const [isAddingWatchlist, setIsAddingWatchlist] = useState(false)

  useEffect(() => {
    if (activeWatchlist) {
      const currentWatchlist = watchlists.find((w) => w.id === activeWatchlist)
      if (currentWatchlist) {
        setSelectedStocks(currentWatchlist.stocks)
      }
    }
  }, [activeWatchlist, watchlists])

  const handleAddWatchlist = () => {
    if (newWatchlistName.trim()) {
      const newWatchlist = {
        id: Date.now().toString(),
        name: newWatchlistName,
        stocks: [],
      }
      setWatchlists([...watchlists, newWatchlist])
      setActiveWatchlist(newWatchlist.id)
      setNewWatchlistName("")
      setIsAddingWatchlist(false)
    }
  }

  const handleDeleteWatchlist = (id: string) => {
    const updatedWatchlists = watchlists.filter((w) => w.id !== id)
    setWatchlists(updatedWatchlists)
    if (activeWatchlist === id) {
      setActiveWatchlist(updatedWatchlists[0]?.id || "")
    }
  }

  const handleAddStock = (ticker: string) => {
    if (activeWatchlist) {
      const updatedWatchlists = watchlists.map((w) => {
        if (w.id === activeWatchlist && !w.stocks.includes(ticker)) {
          return {
            ...w,
            stocks: [...w.stocks, ticker],
          }
        }
        return w
      })
      setWatchlists(updatedWatchlists)
    }
  }

  const handleRemoveStock = (ticker: string) => {
    if (activeWatchlist) {
      const updatedWatchlists = watchlists.map((w) => {
        if (w.id === activeWatchlist) {
          return {
            ...w,
            stocks: w.stocks.filter((s) => s !== ticker),
          }
        }
        return w
      })
      setWatchlists(updatedWatchlists)
    }
  }

  const filteredStocks = availableStocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentWatchlist = watchlists.find((w) => w.id === activeWatchlist)
  const watchlistStocks = currentWatchlist
    ? mockStocks.filter((stock) => currentWatchlist.stocks.includes(stock.ticker))
    : []

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>My Watchlists</span>
                <Dialog open={isAddingWatchlist} onOpenChange={setIsAddingWatchlist}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Watchlist</DialogTitle>
                      <DialogDescription>Enter a name for your new watchlist.</DialogDescription>
                    </DialogHeader>
                    <Input
                      value={newWatchlistName}
                      onChange={(e) => setNewWatchlistName(e.target.value)}
                      placeholder="Watchlist Name"
                    />
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingWatchlist(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddWatchlist}>Create</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {watchlists.map((watchlist) => (
                  <div
                    key={watchlist.id}
                    className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${
                      activeWatchlist === watchlist.id ? "bg-primary/20 text-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setActiveWatchlist(watchlist.id)}
                  >
                    <span>{watchlist.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteWatchlist(watchlist.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-3/4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{currentWatchlist ? currentWatchlist.name : "Select a Watchlist"}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
                    {editMode ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                    {editMode ? "Save" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>{watchlistStocks.length} stocks in this watchlist</CardDescription>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <div className="space-y-4">
                  <Input
                    placeholder="Search stocks to add..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="max-h-[400px] overflow-y-auto">
                    {filteredStocks.map((stock) => (
                      <div key={stock.ticker} className="flex justify-between items-center p-2 border-b">
                        <div>
                          <div className="font-medium">{stock.name}</div>
                          <div className="text-sm text-muted-foreground">{stock.ticker}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (selectedStocks.includes(stock.ticker)) {
                              handleRemoveStock(stock.ticker)
                            } else {
                              handleAddStock(stock.ticker)
                            }
                          }}
                        >
                          {selectedStocks.includes(stock.ticker) ? "Remove" : "Add"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <StockList stocks={watchlistStocks} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
