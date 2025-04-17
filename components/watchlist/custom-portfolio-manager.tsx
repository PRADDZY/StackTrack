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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockStocks } from "@/lib/mock-data"
import { Plus, Trash2, Edit, Save, PieChart } from "lucide-react"
import { CustomizableChart } from "@/components/customizable-chart"
import { AssetAllocation } from "@/components/asset-allocation"

// Mock custom portfolios
const defaultPortfolios = [
  {
    id: "1",
    name: "Growth Portfolio",
    stocks: [
      { ticker: "RELI", allocation: 20 },
      { ticker: "TCS", allocation: 25 },
      { ticker: "INFY", allocation: 15 },
      { ticker: "HDFC", allocation: 10 },
      { ticker: "ICICI", allocation: 10 },
      { ticker: "AIRTEL", allocation: 10 },
      { ticker: "HIND", allocation: 10 },
    ],
    initialInvestment: 1000000,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Dividend Portfolio",
    stocks: [
      { ticker: "RELI", allocation: 15 },
      { ticker: "HDFC", allocation: 20 },
      { ticker: "ICICI", allocation: 20 },
      { ticker: "HIND", allocation: 25 },
      { ticker: "AIRTEL", allocation: 20 },
    ],
    initialInvestment: 500000,
    createdAt: "2023-02-20",
  },
]

export function CustomPortfolioManager() {
  const [portfolios, setPortfolios] = useState(defaultPortfolios)
  const [activePortfolio, setActivePortfolio] = useState(portfolios[0]?.id || "")
  const [newPortfolioName, setNewPortfolioName] = useState("")
  const [newInitialInvestment, setNewInitialInvestment] = useState("1000000")
  const [editMode, setEditMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false)
  const [stockAllocation, setStockAllocation] = useState<Record<string, number>>({})
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (activePortfolio) {
      const currentPortfolio = portfolios.find((p) => p.id === activePortfolio)
      if (currentPortfolio) {
        const allocations: Record<string, number> = {}
        currentPortfolio.stocks.forEach((stock) => {
          allocations[stock.ticker] = stock.allocation
        })
        setStockAllocation(allocations)
      }
    }
  }, [activePortfolio, portfolios])

  const handleAddPortfolio = () => {
    if (newPortfolioName.trim()) {
      const newPortfolio = {
        id: Date.now().toString(),
        name: newPortfolioName,
        stocks: [],
        initialInvestment: Number.parseInt(newInitialInvestment) || 1000000,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setPortfolios([...portfolios, newPortfolio])
      setActivePortfolio(newPortfolio.id)
      setNewPortfolioName("")
      setNewInitialInvestment("1000000")
      setIsAddingPortfolio(false)
    }
  }

  const handleDeletePortfolio = (id: string) => {
    const updatedPortfolios = portfolios.filter((p) => p.id !== id)
    setPortfolios(updatedPortfolios)
    if (activePortfolio === id) {
      setActivePortfolio(updatedPortfolios[0]?.id || "")
    }
  }

  const handleAddStock = (ticker: string) => {
    if (activePortfolio) {
      const updatedPortfolios = portfolios.map((p) => {
        if (p.id === activePortfolio) {
          const existingStock = p.stocks.find((s) => s.ticker === ticker)
          if (!existingStock) {
            return {
              ...p,
              stocks: [...p.stocks, { ticker, allocation: 0 }],
            }
          }
        }
        return p
      })
      setPortfolios(updatedPortfolios)
    }
  }

  const handleRemoveStock = (ticker: string) => {
    if (activePortfolio) {
      const updatedPortfolios = portfolios.map((p) => {
        if (p.id === activePortfolio) {
          return {
            ...p,
            stocks: p.stocks.filter((s) => s.ticker !== ticker),
          }
        }
        return p
      })
      setPortfolios(updatedPortfolios)
    }
  }

  const handleAllocationChange = (ticker: string, allocation: number) => {
    setStockAllocation((prev) => ({
      ...prev,
      [ticker]: allocation,
    }))
  }

  const saveAllocations = () => {
    if (activePortfolio) {
      const updatedPortfolios = portfolios.map((p) => {
        if (p.id === activePortfolio) {
          return {
            ...p,
            stocks: p.stocks.map((s) => ({
              ...s,
              allocation: stockAllocation[s.ticker] || 0,
            })),
          }
        }
        return p
      })
      setPortfolios(updatedPortfolios)
      setEditMode(false)
    }
  }

  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentPortfolio = portfolios.find((p) => p.id === activePortfolio)
  const portfolioStocks = currentPortfolio
    ? currentPortfolio.stocks
        .map((s) => {
          const stockInfo = mockStocks.find((stock) => stock.ticker === s.ticker)
          return {
            ...stockInfo,
            allocation: s.allocation,
          }
        })
        .filter(Boolean)
    : []

  // Calculate portfolio value and performance
  const calculatePortfolioValue = () => {
    if (!currentPortfolio) return { current: 0, change: 0, changePercent: 0 }

    const initialValue = currentPortfolio.initialInvestment
    let currentValue = 0

    currentPortfolio.stocks.forEach((stock) => {
      const stockInfo = mockStocks.find((s) => s.ticker === stock.ticker)
      if (stockInfo) {
        const stockValue = ((initialValue * stock.allocation) / 100) * (1 + stockInfo.change / 100)
        currentValue += stockValue
      }
    })

    const change = currentValue - initialValue
    const changePercent = (change / initialValue) * 100

    return { current: currentValue, change, changePercent }
  }

  const portfolioValue = calculatePortfolioValue()

  // Generate mock performance data
  const generatePerformanceData = () => {
    const data = []
    const days = 30
    let value = currentPortfolio?.initialInvestment || 1000000

    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i - 1))

      // Random daily change between -1.5% and +2%
      const dailyChange = (Math.random() * 3.5 - 1.5) / 100
      value = value * (1 + dailyChange)

      data.push({
        date: date.toLocaleDateString(),
        value: Math.round(value),
      })
    }

    return data
  }

  const performanceData = generatePerformanceData()

  // Calculate sector allocation
  const calculateSectorAllocation = () => {
    if (!currentPortfolio) return []

    const sectorMap: Record<string, number> = {}

    currentPortfolio.stocks.forEach((stock) => {
      const stockInfo = mockStocks.find((s) => s.ticker === stock.ticker)
      if (stockInfo) {
        const sector = stockInfo.sector
        sectorMap[sector] = (sectorMap[sector] || 0) + stock.allocation
      }
    })

    return Object.entries(sectorMap).map(([name, value]) => ({ name, value }))
  }

  const sectorAllocation = calculateSectorAllocation()

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>My Portfolios</span>
                <Dialog open={isAddingPortfolio} onOpenChange={setIsAddingPortfolio}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Portfolio</DialogTitle>
                      <DialogDescription>Enter details for your new theoretical portfolio.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="portfolio-name" className="text-sm font-medium">
                          Portfolio Name
                        </label>
                        <Input
                          id="portfolio-name"
                          value={newPortfolioName}
                          onChange={(e) => setNewPortfolioName(e.target.value)}
                          placeholder="Portfolio Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="initial-investment" className="text-sm font-medium">
                          Initial Investment (₹)
                        </label>
                        <Input
                          id="initial-investment"
                          type="number"
                          value={newInitialInvestment}
                          onChange={(e) => setNewInitialInvestment(e.target.value)}
                          placeholder="1000000"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingPortfolio(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddPortfolio}>Create</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {portfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${
                      activePortfolio === portfolio.id ? "bg-primary/20 text-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setActivePortfolio(portfolio.id)}
                  >
                    <div>
                      <div>{portfolio.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ₹{portfolio.initialInvestment.toLocaleString()}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeletePortfolio(portfolio.id)
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
          {currentPortfolio ? (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{currentPortfolio.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (editMode) {
                          saveAllocations()
                        } else {
                          setEditMode(true)
                        }
                      }}
                    >
                      {editMode ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                      {editMode ? "Save" : "Edit"}
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Created on {currentPortfolio.createdAt} • Initial Investment: ₹
                  {currentPortfolio.initialInvestment.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="allocation">Allocation</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">Current Value</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              ₹{Math.round(portfolioValue.current).toLocaleString()}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">Total Change</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div
                              className={`text-2xl font-bold ${portfolioValue.change >= 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {portfolioValue.change >= 0 ? "+" : ""}₹
                              {Math.round(portfolioValue.change).toLocaleString()}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">Percent Change</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div
                              className={`text-2xl font-bold ${portfolioValue.changePercent >= 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {portfolioValue.changePercent >= 0 ? "+" : ""}
                              {portfolioValue.changePercent.toFixed(2)}%
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {editMode ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Portfolio Composition</h3>
                            <Input
                              placeholder="Search stocks to add..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-64"
                            />
                          </div>
                          <div className="max-h-[400px] overflow-y-auto">
                            {filteredStocks.map((stock) => {
                              const isInPortfolio = currentPortfolio.stocks.some((s) => s.ticker === stock.ticker)
                              return (
                                <div key={stock.ticker} className="flex justify-between items-center p-2 border-b">
                                  <div>
                                    <div className="font-medium">{stock.name}</div>
                                    <div className="text-sm text-muted-foreground">{stock.ticker}</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {isInPortfolio && (
                                      <div className="flex items-center gap-2">
                                        <Input
                                          type="number"
                                          min="0"
                                          max="100"
                                          value={stockAllocation[stock.ticker] || 0}
                                          onChange={(e) =>
                                            handleAllocationChange(stock.ticker, Number.parseInt(e.target.value) || 0)
                                          }
                                          className="w-16"
                                        />
                                        <span>%</span>
                                      </div>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        if (isInPortfolio) {
                                          handleRemoveStock(stock.ticker)
                                        } else {
                                          handleAddStock(stock.ticker)
                                        }
                                      }}
                                    >
                                      {isInPortfolio ? "Remove" : "Add"}
                                    </Button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Portfolio Composition</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Stock</th>
                                  <th className="text-right py-2">Allocation</th>
                                  <th className="text-right py-2">Value</th>
                                  <th className="text-right py-2">Daily Change</th>
                                </tr>
                              </thead>
                              <tbody>
                                {portfolioStocks.map((stock) => {
                                  const stockValue = currentPortfolio.initialInvestment * (stock.allocation / 100)
                                  const dailyChange = stockValue * (stock.change / 100)
                                  return (
                                    <tr key={stock.ticker} className="border-b">
                                      <td className="py-2">
                                        <div className="font-medium">{stock.name}</div>
                                        <div className="text-sm text-muted-foreground">{stock.ticker}</div>
                                      </td>
                                      <td className="text-right py-2">{stock.allocation}%</td>
                                      <td className="text-right py-2">₹{Math.round(stockValue).toLocaleString()}</td>
                                      <td
                                        className={`text-right py-2 ${dailyChange >= 0 ? "text-green-500" : "text-red-500"}`}
                                      >
                                        {dailyChange >= 0 ? "+" : ""}₹{Math.round(dailyChange).toLocaleString()} (
                                        {stock.change}%)
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="performance">
                    <div className="space-y-4">
                      <CustomizableChart
                        data={performanceData.map((d) => ({ time: d.date, value: d.value }))}
                        title="Portfolio Performance"
                        height={400}
                        defaultChartType="area"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="allocation">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Sector Allocation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <AssetAllocation data={sectorAllocation} />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Stock Allocation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <AssetAllocation
                              data={portfolioStocks.map((stock) => ({
                                name: stock.ticker,
                                value: stock.allocation,
                              }))}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Portfolio Selected</h3>
                <p className="text-muted-foreground mb-4">Select a portfolio from the list or create a new one</p>
                <Button onClick={() => setIsAddingPortfolio(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Portfolio
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
