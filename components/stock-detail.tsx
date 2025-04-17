"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Stock } from "@/lib/types"

interface StockDetailProps {
  stock: Stock
}

export function StockDetail({ stock }: StockDetailProps) {
  const isPositive = stock.change >= 0

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-4xl font-bold">₹{stock.price.toLocaleString()}</p>
          <div className="flex items-center mt-1">
            {isPositive ? (
              <ArrowUpRight className="h-5 w-5 mr-1 text-green-500" />
            ) : (
              <ArrowDownRight className="h-5 w-5 mr-1 text-red-500" />
            )}
            <p className={cn("text-lg font-semibold", isPositive ? "text-green-500" : "text-red-500")}>
              {Math.abs(stock.change)}% (₹{Math.abs(stock.priceChange).toLocaleString()})
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Market Cap</p>
          <p className="font-semibold">₹{stock.marketCap.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
