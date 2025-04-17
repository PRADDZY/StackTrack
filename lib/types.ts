export interface Stock {
  ticker: string
  name: string
  price: number
  priceChange: number
  change: number
  marketCap: number
  volume: number
  pe: number
  dividendYield: number
  high52w: number
  low52w: number
  open: number
  previousClose: number
  sector: string
  industry: string
  exchange: string
  description: string
  volatility: number
  sentiment: number
  allocation: number
  chartData: { value: number }[]
}

export interface PortfolioData {
  totalValue: number
  dailyChange: number
  dailyChangePercent: number
  overallChange: number
  overallChangePercent: number
  allocation: { name: string; value: number }[]
  holdings: {
    ticker: string
    name: string
    price: number
    change: number
    shares: number
    value: number
    chartData: { value: number }[]
  }[]
}

export interface MarketHighlightsData {
  gainers: {
    ticker: string
    name: string
    price: number
    change: number
  }[]
  losers: {
    ticker: string
    name: string
    price: number
    change: number
  }[]
}

export interface HeadlineData {
  title: string
  source: string
  time: string
  url: string
}

export interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export interface Investor {
  username: string
  name: string
  avatar: string
  bio: string
  followers: number
  following: number
  tradingSince: string
  monthlyReturn: number
  yearlyReturn: number
  winRate: number
  rank: number
  badges: string[]
  tradingStyle: string[]
}

export interface ActivityItem {
  id: string
  user: {
    username: string
    name: string
    avatar: string
  }
  action: "buy" | "sell"
  stock: {
    ticker: string
    name: string
  }
  quantity: number
  price: number
  time: string
  comment?: string
}

export interface Author {
  name: string
  avatar: string
  role?: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string[]
  author: Author
  date: string
  readTime: number
  category: string
}

export interface Strategy {
  slug: string
  title: string
  excerpt: string
  content: string[]
  author: Author
  date: string
  readTime: number
  level: "beginner" | "intermediate" | "advanced"
}

export interface Insight {
  slug: string
  title: string
  excerpt: string
  content: string[]
  author: Author
  date: string
  sector: string
}

export interface GlossaryTerm {
  term: string
  definition: string
}

export interface PortfolioRecommendation {
  description: string
  expectedReturn: number
  volatility: number
  timeHorizon: string
  allocation: { name: string; value: number }[]
  recommendedETFs: {
    ticker: string
    name: string
    category: string
    allocation: number
  }[]
}

export interface RiskQuestion {
  question: string
  options: string[]
}
