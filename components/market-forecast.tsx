"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CustomizableChart } from "@/components/customizable-chart"
import { mockStocks } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

export function MarketForecast() {
  const [selectedStock, setSelectedStock] = useState(mockStocks[0].ticker)
  const [forecastData, setForecastData] = useState<any[]>([])
  const [forecastSummary, setForecastSummary] = useState({
    prediction: "bullish",
    confidence: 75,
    targetPrice: 0,
    timeframe: "1 week",
    supportLevel: 0,
    resistanceLevel: 0,
    riskLevel: "moderate",
  })

  const stockInfo = mockStocks.find((stock) => stock.ticker === selectedStock)

  useEffect(() => {
    if (stockInfo) {
      generateForecast(stockInfo)
    }
  }, [selectedStock])

  const generateForecast = (stock: any) => {
    // Generate mock forecast data
    const currentPrice = stock.price
    const volatility = stock.volatility || 0.3
    const sentiment = stock.sentiment || 0.5

    // Determine if forecast is bullish or bearish based on sentiment
    const isBullish = sentiment > 0.5

    // Generate confidence level (higher for extreme sentiment values)
    const confidence = Math.round(Math.abs(sentiment - 0.5) * 200)

    // Calculate target price (5-10% movement in sentiment direction)
    const movement = (0.05 + Math.random() * 0.05) * (isBullish ? 1 : -1)
    const targetPrice = currentPrice * (1 + movement)

    // Calculate support and resistance levels
    const supportLevel = currentPrice * (1 - volatility * 0.5)
    const resistanceLevel = currentPrice * (1 + volatility * 0.5)

    // Determine risk level based on volatility
    let riskLevel = "moderate"
    if (volatility > 0.4) riskLevel = "high"
    if (volatility < 0.2) riskLevel = "low"

    // Update forecast summary
    setForecastSummary({
      prediction: isBullish ? "bullish" : "bearish",
      confidence,
      targetPrice,
      timeframe: "1 week",
      supportLevel,
      resistanceLevel,
      riskLevel,
    })

    // Generate forecast data points
    const data = []
    const days = 7
    let price = currentPrice

    // Historical data (last 30 days)
    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (30 - i))

      // Random daily change with slight trend based on sentiment
      const dailyChange = ((Math.random() * 2 - 1 + (sentiment - 0.5)) * volatility) / 5
      price = price * (1 + dailyChange)

      data.push({
        date: date.toLocaleDateString(),
        value: price,
        type: "historical",
      })
    }

    // Current price point
    const currentDate = new Date()
    data.push({
      date: currentDate.toLocaleDateString(),
      value: currentPrice,
      type: "current",
    })

    // Forecast data (next 7 days)
    price = currentPrice
    for (let i = 1; i <= days; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)

      // Trend towards target price with some randomness
      const progressToTarget = i / days
      const targetDelta = targetPrice - currentPrice
      const expectedMove = targetDelta * progressToTarget
      const randomness = targetDelta * volatility * 0.2 * (Math.random() * 2 - 1)

      price = currentPrice + expectedMove + randomness

      data.push({
        date: date.toLocaleDateString(),
        value: price,
        type: "forecast",
      })
    }

    setForecastData(data)
  }

  return (
    <div className="space-y-4">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className={`col-span-1 ${forecastSummary.prediction === "bullish" ? "border-green-500/50" : "border-red-500/50"}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              Forecast Summary
              {forecastSummary.prediction === "bullish" ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
            </CardTitle>
            <CardDescription>
              {stockInfo?.name} ({stockInfo?.ticker})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Prediction</div>
                <div
                  className={`text-xl font-bold ${forecastSummary.prediction === "bullish" ? "text-green-500" : "text-red-500"}`}
                >
                  {forecastSummary.prediction.toUpperCase()}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Confidence</div>
                <div className="text-xl font-bold">{forecastSummary.confidence}%</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Target Price (1 week)</div>
                <div
                  className={`text-xl font-bold ${forecastSummary.targetPrice >= (stockInfo?.price || 0) ? "text-green-500" : "text-red-500"}`}
                >
                  ₹{forecastSummary.targetPrice.toFixed(2)}
                  <span className="text-sm ml-1">
                    ({((forecastSummary.targetPrice / (stockInfo?.price || 1) - 1) * 100).toFixed(2)}%)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Support</div>
                  <div className="text-lg font-medium">₹{forecastSummary.supportLevel.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Resistance</div>
                  <div className="text-lg font-medium">₹{forecastSummary.resistanceLevel.toFixed(2)}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Risk Level</div>
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={`h-4 w-4 ${
                      forecastSummary.riskLevel === "high"
                        ? "text-red-500"
                        : forecastSummary.riskLevel === "moderate"
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  />
                  <span className="font-medium capitalize">{forecastSummary.riskLevel}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Price Forecast</CardTitle>
            <CardDescription>Historical data and 7-day price prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomizableChart
              data={forecastData.map((d) => ({
                time: d.date,
                value: d.value,
                forecast: d.type === "forecast" ? d.value : null,
                historical: d.type === "historical" || d.type === "current" ? d.value : null,
              }))}
              title="Price Forecast"
              dataKey="value"
              additionalDataKeys={["forecast", "historical"]}
              defaultChartType="line"
              height={300}
              colors={["#9333ea", "#00ffff", "#ffff00"]}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Market Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Technical Indicators</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">RSI (14)</div>
                  <div
                    className={`text-lg font-medium ${
                      Math.random() * 100 > 70
                        ? "text-red-500"
                        : Math.random() * 100 < 30
                          ? "text-green-500"
                          : "text-yellow-500"
                    }`}
                  >
                    {Math.round(Math.random() * 100)}
                  </div>
                </div>
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">MACD</div>
                  <div className={`text-lg font-medium ${Math.random() > 0.5 ? "text-green-500" : "text-red-500"}`}>
                    {Math.random() > 0.5 ? "Bullish" : "Bearish"}
                  </div>
                </div>
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Moving Avg (50)</div>
                  <div
                    className={`text-lg font-medium ${stockInfo?.price && stockInfo.price > stockInfo.price * 0.95 ? "text-green-500" : "text-red-500"}`}
                  >
                    {stockInfo?.price && stockInfo.price > stockInfo.price * 0.95 ? "Above" : "Below"}
                  </div>
                </div>
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Bollinger Bands</div>
                  <div className="text-lg font-medium">
                    {["Upper", "Middle", "Lower"][Math.floor(Math.random() * 3)]}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Market Sentiment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">News Sentiment</div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          (stockInfo?.sentiment || 0.5) > 0.6
                            ? "bg-green-500"
                            : (stockInfo?.sentiment || 0.5) < 0.4
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                        style={{ width: `${(stockInfo?.sentiment || 0.5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{Math.round((stockInfo?.sentiment || 0.5) * 100)}%</span>
                  </div>
                </div>
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Institutional Activity</div>
                  <div className="text-lg font-medium">
                    {["Buying", "Neutral", "Selling"][Math.floor(Math.random() * 3)]}
                  </div>
                </div>
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Retail Interest</div>
                  <div className="text-lg font-medium">
                    {["High", "Moderate", "Low"][Math.floor(Math.random() * 3)]}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Key Events</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-500/20 p-1 mt-0.5">
                    <div className="rounded-full bg-blue-500 w-1.5 h-1.5"></div>
                  </div>
                  <div>
                    <span className="font-medium">Earnings Report</span> - Expected in{" "}
                    {Math.floor(Math.random() * 30) + 1} days
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-purple-500/20 p-1 mt-0.5">
                    <div className="rounded-full bg-purple-500 w-1.5 h-1.5"></div>
                  </div>
                  <div>
                    <span className="font-medium">Sector Analysis</span> - {stockInfo?.sector} sector showing{" "}
                    {Math.random() > 0.5 ? "strength" : "weakness"} in current market
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5"></div>
                  </div>
                  <div>
                    <span className="font-medium">Analyst Ratings</span> - {Math.floor(Math.random() * 5) + 1} new{" "}
                    {Math.random() > 0.5 ? "buy" : "hold"} ratings in the past week
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
