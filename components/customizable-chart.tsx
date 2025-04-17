"use client"

import { useState, useMemo } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChartData {
  time: string
  value: number
  [key: string]: any
}

interface CustomizableChartProps {
  data: ChartData[]
  title?: string
  dataKey?: string
  xAxisKey?: string
  height?: number
  defaultChartType?: "line" | "bar" | "area" | "candlestick"
  defaultTimeframe?: "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y"
  onTimeframeChange?: (timeframe: string) => void
  additionalDataKeys?: string[]
  colors?: string[]
}

export function CustomizableChart({
  data,
  title = "Chart",
  dataKey = "value",
  xAxisKey = "time",
  height = 300,
  defaultChartType = "line",
  defaultTimeframe = "1M",
  onTimeframeChange,
  additionalDataKeys = [],
  colors = ["#00ff00", "#ff0000", "#0000ff", "#ffff00", "#ff00ff"],
}: CustomizableChartProps) {
  const [chartType, setChartType] = useState<"line" | "bar" | "area" | "candlestick">(defaultChartType)
  const [timeframe, setTimeframe] = useState<string>(defaultTimeframe)

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
    if (onTimeframeChange) {
      onTimeframeChange(newTimeframe)
    }
  }

  const isPositive = useMemo(() => {
    if (data.length < 2) return true
    return data[0][dataKey] <= data[data.length - 1][dataKey]
  }, [data, dataKey])

  const chartColor = isPositive ? colors[0] : colors[1]
  const chartShadow = isPositive ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 0, 0, 0.5)"

  // Custom tooltip for candlestick chart
  const CandlestickTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background/90 border border-border p-2 rounded-md shadow-md">
          <p className="text-sm font-medium">{`Time: ${label}`}</p>
          <p className="text-sm text-green-500">{`Open: ₹${data.open.toLocaleString()}`}</p>
          <p className="text-sm text-blue-500">{`High: ₹${data.high.toLocaleString()}`}</p>
          <p className="text-sm text-red-500">{`Low: ₹${data.low.toLocaleString()}`}</p>
          <p className="text-sm text-yellow-500">{`Close: ₹${data.close.toLocaleString()}`}</p>
        </div>
      )
    }
    return null
  }

  // Custom candlestick component
  const renderCandlestick = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} />
      </ResponsiveContainer>
    )
  }

  // Composed chart for candlestick visualization
  const ComposedChart = ({ data }: { data: any[] }) => {
    return (
      <div className="w-full h-full">
        <svg width="100%" height="100%" viewBox={`0 0 ${data.length * 40} ${height}`} preserveAspectRatio="none">
          <g>
            {/* X and Y axis lines */}
            <line x1="0" y1={height - 30} x2="100%" y2={height - 30} stroke="rgba(255,255,255,0.2)" />
            <line x1="40" y1="0" x2="40" y2={height - 30} stroke="rgba(255,255,255,0.2)" />

            {/* Candlesticks */}
            {data.map((item, index) => {
              if (!item.open || !item.close || !item.high || !item.low) return null

              // Calculate positions
              const x = 40 + index * 40
              const candleWidth = 20

              // Find min and max values for scaling
              const minValue = Math.min(...data.map((d) => d.low))
              const maxValue = Math.max(...data.map((d) => d.high))
              const valueRange = maxValue - minValue
              const scale = (height - 60) / valueRange

              // Calculate y positions
              const openY = height - 30 - (item.open - minValue) * scale
              const closeY = height - 30 - (item.close - minValue) * scale
              const highY = height - 30 - (item.high - minValue) * scale
              const lowY = height - 30 - (item.low - minValue) * scale

              // Determine if bullish or bearish
              const isBullish = item.close > item.open
              const candleColor = isBullish ? "#00ff00" : "#ff0000"

              return (
                <g key={index}>
                  {/* Wick (high to low) */}
                  <line x1={x} y1={highY} x2={x} y2={lowY} stroke={candleColor} strokeWidth={1} />

                  {/* Candle body */}
                  <rect
                    x={x - candleWidth / 2}
                    y={isBullish ? closeY : openY}
                    width={candleWidth}
                    height={Math.abs(closeY - openY) || 1} // Ensure at least 1px height
                    fill={candleColor}
                    stroke={candleColor}
                  />

                  {/* X-axis label */}
                  {index % Math.ceil(data.length / 10) === 0 && (
                    <text x={x} y={height - 10} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                      {item.time}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Y-axis labels */}
            {Array.from({ length: 5 }).map((_, i) => {
              const minValue = Math.min(...data.map((d) => d.low))
              const maxValue = Math.max(...data.map((d) => d.high))
              const valueRange = maxValue - minValue
              const value = minValue + (valueRange * i) / 4
              const y = height - 30 - ((value - minValue) / valueRange) * (height - 60)

              return (
                <g key={i}>
                  <text
                    x="35"
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize="10"
                  >
                    ₹{value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </text>
                  <line x1="40" y1={y} x2="100%" y2={y} stroke="rgba(255,255,255,0.1)" strokeDasharray="3,3" />
                </g>
              )
            })}
          </g>
        </svg>
      </div>
    )
  }

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={xAxisKey} stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={["dataMin - 1000", "dataMax + 1000"]}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Value"]}
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
              }}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={chartColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              style={{
                filter: `drop-shadow(0 0 8px ${chartShadow})`,
              }}
            />
            {additionalDataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[(index + 2) % colors.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        )
      case "bar":
        return (
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={xAxisKey} stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={["dataMin - 1000", "dataMax + 1000"]}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Value"]}
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
              }}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Bar dataKey={dataKey} fill={chartColor} />
            {additionalDataKeys.map((key, index) => (
              <Bar key={key} dataKey={key} fill={colors[(index + 2) % colors.length]} />
            ))}
          </BarChart>
        )
      case "area":
        return (
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={xAxisKey} stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              domain={["dataMin - 1000", "dataMax + 1000"]}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Value"]}
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
              }}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={chartColor}
              fill={chartColor}
              fillOpacity={0.3}
              style={{
                filter: `drop-shadow(0 0 8px ${chartShadow})`,
              }}
            />
            {additionalDataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[(index + 2) % colors.length]}
                fill={colors[(index + 2) % colors.length]}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        )
      case "candlestick":
        return renderCandlestick()
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <CardTitle>{title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Select value={chartType} onValueChange={(value) => setChartType(value as any)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="area">Area</SelectItem>
                <SelectItem value="candlestick">Candlestick</SelectItem>
              </SelectContent>
            </Select>
            <Tabs value={timeframe} onValueChange={handleTimeframeChange} className="w-auto">
              <TabsList>
                <TabsTrigger value="1D" className="px-2 py-1 text-xs">
                  1D
                </TabsTrigger>
                <TabsTrigger value="1W" className="px-2 py-1 text-xs">
                  1W
                </TabsTrigger>
                <TabsTrigger value="1M" className="px-2 py-1 text-xs">
                  1M
                </TabsTrigger>
                <TabsTrigger value="3M" className="px-2 py-1 text-xs">
                  3M
                </TabsTrigger>
                <TabsTrigger value="1Y" className="px-2 py-1 text-xs">
                  1Y
                </TabsTrigger>
                <TabsTrigger value="5Y" className="px-2 py-1 text-xs">
                  5Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px`, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
