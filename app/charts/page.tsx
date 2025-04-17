"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CustomizableChart } from "@/components/customizable-chart"
import { mockStocks, mockStockPerformance, mockPortfolioPerformance } from "@/lib/mock-data"

export default function ChartsPage() {
  const [selectedStock, setSelectedStock] = useState(mockStocks[0].ticker)
  const [timeframe, setTimeframe] = useState("1M")
  const [chartType, setChartType] = useState<"line" | "bar" | "area" | "candlestick">("candlestick")
  const [chartData, setChartData] = useState<any[]>([])

  const stockData = mockStockPerformance[selectedStock] || mockStockPerformance.default
  const stockInfo = mockStocks.find((stock) => stock.ticker === selectedStock)

  useEffect(() => {
    generateChartData()
  }, [selectedStock, timeframe, chartType])

  const getTimeframeData = () => {
    switch (timeframe) {
      case "1D":
        return stockData.daily
      case "1W":
        return stockData.weekly
      case "1M":
        return stockData.monthly
      default:
        return stockData.monthly
    }
  }

  // Generate chart data including candlestick data
  const generateChartData = () => {
    const baseData = getTimeframeData()
    const volatilityFactor = stockInfo?.volatility || 0.3

    const processedData = baseData.map((item) => {
      // For candlestick chart, generate OHLC data
      const range = item.value * volatilityFactor * 0.1
      const open = item.value - (Math.random() * range - range / 2)
      const close = item.value
      const high = Math.max(open, close) + (Math.random() * range) / 2
      const low = Math.min(open, close) - (Math.random() * range) / 2

      return {
        ...item,
        open,
        close,
        high,
        low,
      }
    })

    setChartData(processedData)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
          Customizable Charts
        </h1>
        <p className="text-muted-foreground mb-6">
          Visualize stock and portfolio performance with customizable chart options
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Select value={selectedStock} onValueChange={setSelectedStock}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select Stock" />
          </SelectTrigger>
          <SelectContent>
            {mockStocks.map((stock) => (
              <SelectItem key={stock.ticker} value={stock.ticker}>
                {stock.name} ({stock.ticker})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={chartType} onValueChange={(value) => setChartType(value as any)}>
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="line">Line</SelectItem>
            <SelectItem value="bar">Bar</SelectItem>
            <SelectItem value="area">Area</SelectItem>
            <SelectItem value="candlestick">Candlestick</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="stock" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="stock">Stock Chart</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="stock">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>
                  {stockInfo?.name} ({stockInfo?.ticker}) - ₹{stockInfo?.price.toLocaleString()}
                  <span className={stockInfo?.change >= 0 ? "text-green-500" : "text-red-500"}>
                    {" "}
                    ({stockInfo?.change >= 0 ? "+" : ""}
                    {stockInfo?.change}%)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CustomizableChart
                  data={chartData}
                  title={`${stockInfo?.name} Performance`}
                  defaultChartType={chartType}
                  defaultTimeframe={timeframe as any}
                  onTimeframeChange={setTimeframe as any}
                  height={500}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="portfolio">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <CustomizableChart
                  data={
                    timeframe === "1D"
                      ? mockPortfolioPerformance.daily.map((item) => ({
                          ...item,
                          open: item.value * 0.99,
                          close: item.value,
                          high: item.value * 1.01,
                          low: item.value * 0.98,
                        }))
                      : timeframe === "1W"
                        ? mockPortfolioPerformance.weekly.map((item) => ({
                            ...item,
                            open: item.value * 0.99,
                            close: item.value,
                            high: item.value * 1.01,
                            low: item.value * 0.98,
                          }))
                        : mockPortfolioPerformance.monthly.map((item) => ({
                            ...item,
                            open: item.value * 0.99,
                            close: item.value,
                            high: item.value * 1.01,
                            low: item.value * 0.98,
                          }))
                  }
                  title="Portfolio Performance"
                  defaultChartType={chartType}
                  defaultTimeframe={timeframe as any}
                  onTimeframeChange={setTimeframe as any}
                  height={500}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
