import type {
  Stock,
  PortfolioData,
  MarketHighlightsData,
  HeadlineData,
  Message,
  Investor,
  ActivityItem,
  Article,
  Strategy,
  Insight,
  GlossaryTerm,
} from "@/lib/types"

// Generate random chart data
const generateChartData = (length: number, isPositive: boolean, volatility = 0.05) => {
  const data = []
  let value = isPositive ? 100 : 120

  for (let i = 0; i < length; i++) {
    // Random change with trend
    const change = (Math.random() - (isPositive ? 0.4 : 0.6)) * volatility * value
    value += change
    value = Math.max(value, 50) // Ensure value doesn't go too low

    data.push({ value })
  }

  return data
}

// Mock Stocks
export const mockStocks: Stock[] = [
  {
    ticker: "RELI",
    name: "Reliance Industries",
    price: 2850.75,
    priceChange: 42.25,
    change: 1.5,
    marketCap: 1925000000000,
    volume: 5200000,
    pe: 28.5,
    dividendYield: 0.4,
    high52w: 2950.0,
    low52w: 2200.0,
    open: 2810.5,
    previousClose: 2808.5,
    sector: "Energy",
    industry: "Oil & Gas",
    exchange: "NSE",
    description:
      "Reliance Industries Limited is an Indian multinational conglomerate company, headquartered in Mumbai. Its diverse businesses include energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.",
    volatility: 0.3,
    sentiment: 0.8,
    allocation: 15,
    chartData: generateChartData(20, true, 0.03),
  },
  {
    ticker: "TCS",
    name: "Tata Consultancy Services",
    price: 3450.25,
    priceChange: -15.75,
    change: -0.45,
    marketCap: 1260000000000,
    volume: 1800000,
    pe: 32.8,
    dividendYield: 1.2,
    high52w: 3900.0,
    low52w: 3100.0,
    open: 3470.0,
    previousClose: 3466.0,
    sector: "Technology",
    industry: "IT Services",
    exchange: "NSE",
    description:
      "Tata Consultancy Services Limited is an Indian multinational information technology services and consulting company headquartered in Mumbai. It is a subsidiary of the Tata Group and operates in 149 locations across 46 countries.",
    volatility: 0.25,
    sentiment: 0.65,
    allocation: 12,
    chartData: generateChartData(20, false, 0.02),
  },
  {
    ticker: "INFY",
    name: "Infosys",
    price: 1580.5,
    priceChange: 28.3,
    change: 1.82,
    marketCap: 660000000000,
    volume: 3200000,
    pe: 29.4,
    dividendYield: 1.5,
    high52w: 1700.0,
    low52w: 1300.0,
    open: 1555.2,
    previousClose: 1552.2,
    sector: "Technology",
    industry: "IT Services",
    exchange: "NSE",
    description:
      "Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services. The company is headquartered in Bangalore.",
    volatility: 0.28,
    sentiment: 0.7,
    allocation: 10,
    chartData: generateChartData(20, true, 0.025),
  },
  {
    ticker: "HDFC",
    name: "HDFC Bank",
    price: 1680.75,
    priceChange: -12.25,
    change: -0.72,
    marketCap: 930000000000,
    volume: 2800000,
    pe: 25.6,
    dividendYield: 0.8,
    high52w: 1800.0,
    low52w: 1400.0,
    open: 1695.0,
    previousClose: 1693.0,
    sector: "Financial Services",
    industry: "Banking",
    exchange: "NSE",
    description:
      "HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai. It is India's largest private sector bank by assets and the world's 10th largest bank by market capitalization as of April 2021.",
    volatility: 0.22,
    sentiment: 0.6,
    allocation: 8,
    chartData: generateChartData(20, false, 0.02),
  },
  {
    ticker: "ICICI",
    name: "ICICI Bank",
    price: 950.25,
    priceChange: 15.75,
    change: 1.68,
    marketCap: 660000000000,
    volume: 4200000,
    pe: 22.3,
    dividendYield: 0.9,
    high52w: 1000.0,
    low52w: 800.0,
    open: 935.5,
    previousClose: 934.5,
    sector: "Financial Services",
    industry: "Banking",
    exchange: "NSE",
    description:
      "ICICI Bank Limited is an Indian multinational banking and financial services company headquartered in Mumbai. It offers a wide range of banking products and financial services for corporate and retail customers.",
    volatility: 0.35,
    sentiment: 0.75,
    allocation: 7,
    chartData: generateChartData(20, true, 0.03),
  },
  {
    ticker: "AIRTEL",
    name: "Bharti Airtel",
    price: 850.5,
    priceChange: -5.25,
    change: -0.61,
    marketCap: 475000000000,
    volume: 2500000,
    pe: 24.8,
    dividendYield: 0.5,
    high52w: 900.0,
    low52w: 700.0,
    open: 855.75,
    previousClose: 855.75,
    sector: "Communication",
    industry: "Telecom",
    exchange: "NSE",
    description:
      "Bharti Airtel Limited is an Indian multinational telecommunications services company headquartered in New Delhi. It operates in 18 countries across South Asia and Africa, and also in the Channel Islands.",
    volatility: 0.4,
    sentiment: 0.55,
    allocation: 6,
    chartData: generateChartData(20, false, 0.035),
  },
  {
    ticker: "HIND",
    name: "Hindustan Unilever",
    price: 2450.75,
    priceChange: 35.25,
    change: 1.46,
    marketCap: 575000000000,
    volume: 1200000,
    pe: 70.2,
    dividendYield: 1.1,
    high52w: 2600.0,
    low52w: 2200.0,
    open: 2420.5,
    previousClose: 2415.5,
    sector: "Consumer Goods",
    industry: "FMCG",
    exchange: "NSE",
    description:
      "Hindustan Unilever Limited is an Indian consumer goods company headquartered in Mumbai. It is a subsidiary of Unilever, a British company. Its products include foods, beverages, cleaning agents, personal care products, water purifiers and other fast-moving consumer goods.",
    volatility: 0.18,
    sentiment: 0.85,
    allocation: 5,
    chartData: generateChartData(20, true, 0.015),
  },
  {
    ticker: "BAJAJ",
    name: "Bajaj Finance",
    price: 7250.25,
    priceChange: -85.75,
    change: -1.17,
    marketCap: 435000000000,
    volume: 950000,
    pe: 40.5,
    dividendYield: 0.3,
    high52w: 8000.0,
    low52w: 6000.0,
    open: 7340.0,
    previousClose: 7336.0,
    sector: "Financial Services",
    industry: "NBFC",
    exchange: "NSE",
    description:
      "Bajaj Finance Limited is an Indian Non-Banking Financial Company (NBFC) that provides various financial services including consumer finance, SME finance, commercial lending, and wealth management. It is a subsidiary of Bajaj Finserv and one of the largest NBFCs in India.",
    volatility: 0.45,
    sentiment: 0.6,
    allocation: 5,
    chartData: generateChartData(20, false, 0.04),
  },
  {
    ticker: "WIPRO",
    name: "Wipro Limited",
    price: 420.5,
    priceChange: 8.25,
    change: 2.0,
    marketCap: 230000000000,
    volume: 3500000,
    pe: 18.5,
    dividendYield: 1.3,
    high52w: 450.0,
    low52w: 350.0,
    open: 412.25,
    previousClose: 412.25,
    sector: "Technology",
    industry: "IT Services",
    exchange: "NSE",
    description:
      "Wipro Limited is an Indian multinational corporation that provides information technology, consulting and business process services. It is headquartered in Bangalore, Karnataka, India.",
    volatility: 0.3,
    sentiment: 0.55,
    allocation: 4,
    chartData: generateChartData(20, true, 0.025),
  },
  {
    ticker: "ADANI",
    name: "Adani Enterprises",
    price: 2350.75,
    priceChange: -120.25,
    change: -4.87,
    marketCap: 267000000000,
    volume: 1800000,
    pe: 45.8,
    dividendYield: 0.2,
    high52w: 3500.0,
    low52w: 1500.0,
    open: 2470.0,
    previousClose: 2471.0,
    sector: "Energy",
    industry: "Diversified",
    exchange: "NSE",
    description:
      "Adani Enterprises Limited is the flagship entity of the Adani Group, one of India's largest business conglomerates. The company has business interests in resources, logistics, energy, agro, real estate, public transport infrastructure, consumer finance and defense sectors.",
    volatility: 0.8,
    sentiment: 0.4,
    allocation: 3,
    chartData: generateChartData(20, false, 0.06),
  },
]

// Mock Portfolio Data
export const mockPortfolio: PortfolioData = {
  totalValue: 1250000,
  dailyChange: 15000,
  dailyChangePercent: 1.2,
  overallChange: 250000,
  overallChangePercent: 25,
  allocation: [
    { name: "Technology", value: 35 },
    { name: "Financial", value: 25 },
    { name: "Energy", value: 20 },
    { name: "Consumer", value: 15 },
    { name: "Others", value: 5 },
  ],
  holdings: mockStocks.map((stock) => ({
    ticker: stock.ticker,
    name: stock.name,
    price: stock.price,
    change: stock.change,
    shares: Math.floor(Math.random() * 100) + 10,
    value: stock.price * (Math.floor(Math.random() * 100) + 10),
    chartData: stock.chartData,
  })),
}

// Mock Portfolio Performance
export const mockPortfolioPerformance = {
  daily: Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: 1200000 + Math.random() * 100000,
  })),
  weekly: Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return {
      time: date.toLocaleDateString("en-US", { weekday: "short" }),
      value: 1150000 + Math.random() * 150000,
    }
  }),
  monthly: Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return {
      time: `${date.getDate()}/${date.getMonth() + 1}`,
      value: 1000000 + Math.random() * 300000,
    }
  }),
}

// Mock Stock Performance
export const mockStockPerformance: Record<string, any> = {
  default: {
    daily: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: 1000 + Math.random() * 200,
    })),
    weekly: Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        time: date.toLocaleDateString("en-US", { weekday: "short" }),
        value: 950 + Math.random() * 300,
      }
    }),
    monthly: Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return {
        time: `${date.getDate()}/${date.getMonth() + 1}`,
        value: 900 + Math.random() * 400,
      }
    }),
  },
}

// Add specific stock data
mockStocks.forEach((stock) => {
  const baseValue = stock.price
  const volatility = stock.volatility * baseValue

  mockStockPerformance[stock.ticker] = {
    daily: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: baseValue - volatility / 2 + Math.random() * volatility,
    })),
    weekly: Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        time: date.toLocaleDateString("en-US", { weekday: "short" }),
        value: baseValue - volatility + Math.random() * volatility * 2,
      }
    }),
    monthly: Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return {
        time: `${date.getDate()}/${date.getMonth() + 1}`,
        value: baseValue - volatility * 1.5 + Math.random() * volatility * 3,
      }
    }),
  }
})

// Mock Market Highlights
export const mockMarketHighlights: MarketHighlightsData = {
  gainers: [
    {
      ticker: "TATASTEEL",
      name: "Tata Steel",
      price: 145.75,
      change: 8.5,
    },
    {
      ticker: "SUNPHARMA",
      name: "Sun Pharmaceutical",
      price: 1120.5,
      change: 5.2,
    },
    {
      ticker: "MARUTI",
      name: "Maruti Suzuki",
      price: 10250.25,
      change: 4.8,
    },
  ],
  losers: [
    {
      ticker: "COALINDIA",
      name: "Coal India",
      price: 320.75,
      change: -6.2,
    },
    {
      ticker: "NTPC",
      name: "NTPC Limited",
      price: 245.5,
      change: -4.5,
    },
    {
      ticker: "ONGC",
      name: "Oil and Natural Gas Corporation",
      price: 175.25,
      change: -3.8,
    },
  ],
}

// Mock Headlines
export const mockHeadlines: HeadlineData[] = [
  {
    title: "RBI Keeps Repo Rate Unchanged at 6.5% for Sixth Consecutive Time",
    source: "Economic Times",
    time: "2 hours ago",
    url: "#",
  },
  {
    title: "Reliance Industries Announces Expansion into Green Energy Sector",
    source: "Business Standard",
    time: "4 hours ago",
    url: "#",
  },
  {
    title: "IT Stocks Rally as Global Tech Spending Forecast Improves",
    source: "Mint",
    time: "6 hours ago",
    url: "#",
  },
  {
    title: "Government Announces New PLI Scheme for Electronics Manufacturing",
    source: "Financial Express",
    time: "8 hours ago",
    url: "#",
  },
  {
    title: "Sensex Crosses 75,000 Mark for the First Time in History",
    source: "NDTV Profit",
    time: "10 hours ago",
    url: "#",
  },
]

// Mock Chat Messages
export const mockChatMessages: Message[] = [
  {
    id: "1",
    content: "Welcome to Neon Portfolio AI Assistant! How can I help you with your investments today?",
    sender: "assistant",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    content: "What's the overall health of my portfolio?",
    sender: "user",
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: "3",
    content:
      "Your portfolio is performing well with a 25% overall gain. However, you're 65% invested in tech and energy sectors. Consider diversifying to reduce sector-specific risks.",
    sender: "assistant",
    timestamp: new Date(Date.now() - 3400000),
  },
]

// Mock Chat Responses
export const mockChatResponses: Record<string, string> = {
  "how is my portfolio doing":
    "Your portfolio is up 1.2% today and 25% overall. Your top performer is Wipro with a 2% gain today.",
  "what should i buy":
    "Based on your current allocation, you might consider adding more consumer goods stocks to diversify. Hindustan Unilever (HIND) has strong fundamentals and would balance your tech-heavy portfolio.",
  "what should i sell":
    "You might consider reducing your exposure to Adani Enterprises (ADANI) as it shows high volatility (0.8) and has declined 4.87% today.",
  "how can i reduce risk":
    "Your portfolio is 65% concentrated in Technology and Energy sectors. Consider reallocating some funds to more stable sectors like Consumer Goods or adding some fixed income investments.",
  "market outlook":
    "The market is showing mixed signals. IT stocks are rallying due to improved global tech spending forecasts, while energy stocks are facing pressure. The RBI has kept rates unchanged, which is positive for financial stocks.",
  default:
    "I can provide insights on your portfolio performance, suggest diversification strategies, or analyze specific stocks. What would you like to know?",
}

// Add more mock responses
mockChatResponses["portfolio analysis"] =
  "Your portfolio has a good growth trajectory with a 25% overall gain. However, it's heavily weighted towards Technology (35%) and Financial (25%) sectors. Consider adding more defensive stocks to balance risk."
mockChatResponses["best performers"] =
  "Your best performing stocks are Wipro (+2.0%) and Infosys (+1.82%) today. Over the longer term, Reliance Industries has contributed most to your portfolio growth."
mockChatResponses["worst performers"] =
  "Your worst performing stocks today are Adani Enterprises (-4.87%) and Bajaj Finance (-1.17%). Consider reviewing these positions if the downward trend continues."

// Mock Investors
export const mockInvestors: Investor[] = [
  {
    username: "rajesh_trader",
    name: "Rajesh Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Professional trader with 15+ years of experience in Indian markets. Focused on value investing and long-term growth strategies.",
    followers: 24500,
    following: 156,
    tradingSince: "2008",
    monthlyReturn: 8.2,
    yearlyReturn: 32.5,
    winRate: 68,
    rank: 1,
    badges: ["Top Performer", "Verified", "Pro Trader"],
    tradingStyle: ["Value Investing", "Long-term", "Fundamental Analysis"],
  },
  {
    username: "priya_investments",
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Investment analyst specializing in tech and financial sectors. Former hedge fund manager with a focus on growth stocks.",
    followers: 18700,
    following: 203,
    tradingSince: "2012",
    monthlyReturn: 6.8,
    yearlyReturn: 28.4,
    winRate: 65,
    rank: 2,
    badges: ["Tech Expert", "Verified"],
    tradingStyle: ["Growth Investing", "Sector Rotation", "Momentum"],
  },
  {
    username: "vikram_capital",
    name: "Vikram Malhotra",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Chartered accountant turned full-time trader. Specializes in swing trading and options strategies.",
    followers: 15200,
    following: 89,
    tradingSince: "2015",
    monthlyReturn: 5.9,
    yearlyReturn: 24.7,
    winRate: 62,
    rank: 3,
    badges: ["Options Expert", "Rising Star"],
    tradingStyle: ["Swing Trading", "Options", "Technical Analysis"],
  },
  {
    username: "neha_trades",
    name: "Neha Gupta",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Day trader focusing on high-volatility stocks. Developed proprietary trading algorithms for market timing.",
    followers: 12800,
    following: 112,
    tradingSince: "2017",
    monthlyReturn: 9.3,
    yearlyReturn: 22.1,
    winRate: 58,
    rank: 4,
    badges: ["Day Trading Pro", "Algo Expert"],
    tradingStyle: ["Day Trading", "Algorithmic", "High Frequency"],
  },
  {
    username: "amit_investor",
    name: "Amit Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Dividend growth investor with a focus on building passive income streams. Former financial advisor.",
    followers: 9500,
    following: 78,
    tradingSince: "2010",
    monthlyReturn: 3.2,
    yearlyReturn: 18.5,
    winRate: 75,
    rank: 5,
    badges: ["Dividend Expert", "Verified"],
    tradingStyle: ["Dividend Growth", "Value Investing", "Income Focus"],
  },
  {
    username: "divya_markets",
    name: "Divya Kapoor",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Sector rotation specialist with background in economic research. Focuses on macroeconomic trends for investment decisions.",
    followers: 8200,
    following: 134,
    tradingSince: "2014",
    monthlyReturn: 4.7,
    yearlyReturn: 19.8,
    winRate: 64,
    rank: 6,
    badges: ["Macro Expert", "Research Analyst"],
    tradingStyle: ["Sector Rotation", "Macro Trading", "Global Markets"],
  },
  {
    username: "suresh_trades",
    name: "Suresh Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Technical analyst specializing in chart patterns and momentum strategies. Conducts regular webinars on technical trading.",
    followers: 7800,
    following: 92,
    tradingSince: "2016",
    monthlyReturn: 7.1,
    yearlyReturn: 26.3,
    winRate: 60,
    rank: 7,
    badges: ["Technical Expert", "Educator"],
    tradingStyle: ["Technical Analysis", "Momentum", "Pattern Trading"],
  },
  {
    username: "ananya_investor",
    name: "Ananya Desai",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "ESG-focused investor with expertise in sustainable and socially responsible investing strategies.",
    followers: 6500,
    following: 105,
    tradingSince: "2018",
    monthlyReturn: 4.2,
    yearlyReturn: 17.9,
    winRate: 66,
    rank: 8,
    badges: ["ESG Specialist", "Green Investor"],
    tradingStyle: ["ESG Investing", "Sustainable", "Long-term"],
  },
  {
    username: "rahul_trader",
    name: "Rahul Verma",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Contrarian investor focusing on undervalued and out-of-favor stocks. Former investment banker with deep value approach.",
    followers: 5900,
    following: 67,
    tradingSince: "2013",
    monthlyReturn: 5.3,
    yearlyReturn: 21.2,
    winRate: 59,
    rank: 9,
    badges: ["Contrarian", "Value Hunter"],
    tradingStyle: ["Contrarian", "Deep Value", "Mean Reversion"],
  },
  {
    username: "meera_stocks",
    name: "Meera Joshi",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Small-cap specialist with focus on identifying emerging growth companies before they become mainstream.",
    followers: 5200,
    following: 88,
    tradingSince: "2019",
    monthlyReturn: 10.5,
    yearlyReturn: 29.7,
    winRate: 55,
    rank: 10,
    badges: ["Small Cap Expert", "Rising Star"],
    tradingStyle: ["Small Caps", "Growth", "High Risk/Reward"],
  },
]

// Mock Following
export const mockFollowing: Investor[] = [mockInvestors[0], mockInvestors[2], mockInvestors[4], mockInvestors[7]]

// Mock Activity Feed
export const mockActivityFeed: ActivityItem[] = [
  {
    id: "1",
    user: {
      username: "rajesh_trader",
      name: "Rajesh Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "buy",
    stock: {
      ticker: "INFY",
      name: "Infosys",
    },
    quantity: 100,
    price: 1580.5,
    time: "10 minutes ago",
    comment: "Adding to my tech position on the dip. Strong fundamentals and positive outlook for IT services.",
  },
  {
    id: "2",
    user: {
      username: "priya_investments",
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "sell",
    stock: {
      ticker: "ADANI",
      name: "Adani Enterprises",
    },
    quantity: 50,
    price: 2350.75,
    time: "25 minutes ago",
    comment: "Taking profits after recent volatility. Will look to re-enter at lower levels.",
  },
  {
    id: "3",
    user: {
      username: "vikram_capital",
      name: "Vikram Malhotra",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "buy",
    stock: {
      ticker: "HDFC",
      name: "HDFC Bank",
    },
    quantity: 75,
    price: 1680.75,
    time: "1 hour ago",
    comment: "Banking sector looks promising with stable interest rates. HDFC is a quality pick at current levels.",
  },
  {
    id: "4",
    user: {
      username: "neha_trades",
      name: "Neha Gupta",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "buy",
    stock: {
      ticker: "RELI",
      name: "Reliance Industries",
    },
    quantity: 30,
    price: 2850.75,
    time: "2 hours ago",
  },
  {
    id: "5",
    user: {
      username: "amit_investor",
      name: "Amit Singh",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "buy",
    stock: {
      ticker: "HIND",
      name: "Hindustan Unilever",
    },
    quantity: 40,
    price: 2450.75,
    time: "3 hours ago",
    comment: "Adding this defensive stock to my portfolio for stability and dividend income.",
  },
  {
    id: "6",
    user: {
      username: "rajesh_trader",
      name: "Rajesh Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "sell",
    stock: {
      ticker: "BAJAJ",
      name: "Bajaj Finance",
    },
    quantity: 25,
    price: 7250.25,
    time: "4 hours ago",
    comment: "Reducing exposure to high-valuation financial stocks in the current market environment.",
  },
  {
    id: "7",
    user: {
      username: "divya_markets",
      name: "Divya Kapoor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "buy",
    stock: {
      ticker: "TCS",
      name: "Tata Consultancy Services",
    },
    quantity: 15,
    price: 3450.25,
    time: "5 hours ago",
  },
  {
    id: "8",
    user: {
      username: "suresh_trades",
      name: "Suresh Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "buy",
    stock: {
      ticker: "AIRTEL",
      name: "Bharti Airtel",
    },
    quantity: 120,
    price: 850.5,
    time: "6 hours ago",
    comment: "Technical breakout on the charts. Expecting upward momentum in the telecom sector.",
  },
]

// Mock Articles
export const mockArticles: Article[] = [
  {
    slug: "understanding-pe-ratio",
    title: "Understanding P/E Ratio: The Key to Value Investing",
    excerpt:
      "Learn how to use the price-to-earnings ratio to identify undervalued stocks and make better investment decisions.",
    content: [
      "The price-to-earnings (P/E) ratio is one of the most widely used metrics for evaluating stocks. It compares a company's share price to its earnings per share (EPS), giving investors a simple way to assess whether a stock is potentially overvalued or undervalued.",
      "To calculate the P/E ratio, simply divide the current share price by the earnings per share. For example, if a company's stock is trading at ₹1,000 and its EPS is ₹50, the P/E ratio would be 20.",
      "A high P/E ratio suggests that investors expect higher earnings growth in the future compared to companies with a lower P/E ratio. However, a high P/E ratio might also indicate that a stock is overvalued, while a low P/E might signal an undervalued opportunity—or a company in trouble.",
      "It's important to compare P/E ratios within the same industry, as different sectors typically have different average P/E ratios. For instance, technology companies often have higher P/E ratios than utility companies.",
      "There are two main types of P/E ratios: trailing P/E, which is based on earnings from the past 12 months, and forward P/E, which uses projected earnings for the next 12 months. Forward P/E can be more relevant but relies on estimates that may not materialize.",
      "While the P/E ratio is a valuable tool, it shouldn't be used in isolation. Combine it with other metrics like PEG ratio (P/E divided by growth rate), price-to-book ratio, and debt-to-equity ratio for a more comprehensive analysis.",
      "Remember that companies with no earnings or negative earnings don't have a meaningful P/E ratio, which is a limitation when evaluating startups or companies in financial distress.",
      "By understanding and properly applying the P/E ratio in your investment analysis, you can make more informed decisions and potentially identify valuable investment opportunities before the broader market recognizes them.",
    ],
    author: {
      name: "Vikram Malhotra",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Financial Analyst",
    },
    date: "April 12, 2023",
    readTime: 8,
    category: "fundamentals",
  },
  {
    slug: "diversification-strategies",
    title: "Diversification Strategies for the Modern Investor",
    excerpt:
      "Explore effective diversification techniques to protect your portfolio against market volatility and maximize returns.",
    content: [
      "Diversification is often described as the only free lunch in investing. By spreading your investments across various asset classes, sectors, and geographies, you can reduce risk without necessarily sacrificing returns.",
      "The fundamental principle behind diversification is that different assets often respond differently to the same economic event. When some investments are performing poorly, others may be doing well, helping to smooth out your portfolio's overall performance.",

      "There are several ways to diversify your portfolio. Asset class diversification involves investing across stocks, bonds, real estate, commodities, and cash equivalents. Each of these responds differently to economic conditions, providing balance to your portfolio.",

      "Sector diversification means spreading investments across different industries such as technology, healthcare, finance, consumer goods, and energy. This protects against sector-specific downturns that might severely impact a concentrated portfolio.",

      "Geographic diversification involves investing in different countries and regions. This helps mitigate country-specific risks like political instability, currency fluctuations, or localized economic downturns.",

      "Market capitalization diversification means including a mix of large-cap, mid-cap, and small-cap companies. Smaller companies often offer higher growth potential but with greater risk, while larger companies typically provide more stability.",

      "When implementing diversification, avoid over-diversification, which can dilute returns and make portfolio management unnecessarily complex. A well-diversified portfolio typically contains 20-30 stocks across different sectors, along with bonds and other asset classes.",

      "Regularly rebalancing your portfolio is essential to maintain your desired level of diversification. As some investments perform better than others, your asset allocation will naturally drift from your target allocation.",

      "Remember that diversification cannot eliminate all risk, but it remains one of the most effective strategies for managing risk while pursuing long-term investment goals.",
    ],
    author: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Investment Strategist",
    },
    date: "March 5, 2023",
    readTime: 7,
    category: "strategy",
  },
  {
    slug: "technical-analysis-basics",
    title: "Technical Analysis Basics: Chart Patterns Every Trader Should Know",
    excerpt:
      "Master the essential chart patterns that can help you identify potential market trends and make more informed trading decisions.",
    content: [
      "Technical analysis is the study of historical price action to forecast future price movements. Unlike fundamental analysis, which focuses on a company's financial health, technical analysis concentrates on patterns in price charts and trading volumes.",
      "One of the most basic elements of technical analysis is trend identification. An uptrend is characterized by higher highs and higher lows, while a downtrend shows lower highs and lower lows. A sideways trend, or consolidation, occurs when prices move within a relatively narrow range.",
      "Support and resistance levels are price points where a stock has historically had difficulty falling below (support) or rising above (resistance). These levels often coincide with psychological price points or significant historical price actions.",
      "Chart patterns are formations that appear on price charts and can signal continuation or reversal of trends. Common reversal patterns include head and shoulders, double tops and bottoms, and rounding bottoms.",
      "Continuation patterns suggest that the current trend will continue after a brief pause. These include flags, pennants, and triangles. These patterns often form during consolidation periods before the trend resumes.",
      "Candlestick patterns offer insights into market psychology and potential price movements. Patterns like doji, hammer, engulfing patterns, and morning/evening stars can signal potential reversals or continuations.",
      "Moving averages smooth out price data to identify trends while eliminating short-term fluctuations. Common types include simple moving averages (SMA) and exponential moving averages (EMA), with the latter giving more weight to recent prices.",
      "Technical indicators like Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), and Bollinger Bands can provide additional insights when used alongside chart patterns.",
      "Remember that no pattern or indicator is foolproof. Successful technical analysis often involves using multiple tools and confirmation signals before making trading decisions.",
    ],
    author: {
      name: "Suresh Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Technical Analyst",
    },
    date: "February 18, 2023",
    readTime: 10,
    category: "technical",
  },
  {
    slug: "tax-efficient-investing",
    title: "Tax-Efficient Investing: Maximizing Your After-Tax Returns",
    excerpt: "Learn strategies to minimize the tax impact on your investment returns and keep more of what you earn.",
    content: [
      "Tax-efficient investing is about structuring your investments to minimize the impact of taxes on your returns. Over time, tax efficiency can significantly impact your wealth accumulation.",
      "One of the most effective tax-efficient strategies is utilizing tax-advantaged accounts like Public Provident Fund (PPF), National Pension System (NPS), and Equity Linked Savings Schemes (ELSS) in India. These accounts offer tax deductions on contributions and tax-free or tax-deferred growth.",
      "Asset location is a key principle of tax-efficient investing. Place tax-inefficient investments (like those generating ordinary income) in tax-advantaged accounts, and tax-efficient investments (like long-term equity holdings) in taxable accounts.",
      "In taxable accounts, consider holding investments for the long term. In India, equity investments held for more than one year qualify for long-term capital gains tax, which is typically lower than short-term capital gains tax.",
      "Tax-loss harvesting involves selling investments that have experienced losses to offset capital gains in your portfolio. This strategy can reduce your overall tax liability while maintaining your investment strategy.",
      "Dividend-paying stocks can be tax-inefficient in taxable accounts since dividends are taxed as income. Growth stocks that focus on capital appreciation rather than dividends may be more tax-efficient in taxable accounts.",
      "Consider tax-efficient investment vehicles like index funds and ETFs, which typically generate fewer capital gains distributions than actively managed funds due to lower portfolio turnover.",
      "Municipal bonds (tax-free bonds in India) can offer tax-exempt interest income, making them attractive for high-income investors, especially in higher tax brackets.",
      "Remember that investment decisions should not be driven solely by tax considerations. The primary focus should be on your investment goals, risk tolerance, and overall financial plan.",
    ],
    author: {
      name: "Amit Singh",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tax Consultant",
    },
    date: "January 25, 2023",
    readTime: 9,
    category: "tax",
  },
  {
    slug: "behavioral-finance",
    title: "Behavioral Finance: Understanding Your Investment Biases",
    excerpt:
      "Discover how psychological biases affect your investment decisions and learn strategies to overcome them.",
    content: [
      "Behavioral finance combines psychology and economics to explain why investors often make irrational decisions. Understanding these biases can help you become a more disciplined and successful investor.",
      "Loss aversion is one of the most powerful biases, where investors feel the pain of losses more intensely than the pleasure of equivalent gains. This can lead to holding onto losing investments too long or selling winners too early.",
      "Confirmation bias causes investors to seek out information that confirms their existing beliefs while ignoring contradictory evidence. This can result in overlooking important warning signs about investments.",
      "Recency bias leads investors to give too much weight to recent events and extrapolate them into the future. This can cause chasing performance by buying after markets have risen or selling after they've fallen.",
      "Herd mentality drives investors to follow what others are doing, leading to market bubbles and crashes. The fear of missing out (FOMO) is a powerful manifestation of this bias.",
      "Overconfidence bias causes investors to overestimate their knowledge and abilities, leading to excessive trading, inadequate diversification, and taking on too much risk.",
      "Anchoring bias occurs when investors rely too heavily on the first piece of information encountered (like the purchase price of a stock), making it difficult to adjust to new information.",
      "To overcome these biases, consider implementing a systematic investment approach with clear rules and guidelines. Dollar-cost averaging, regular rebalancing, and having a written investment policy statement can help remove emotion from investing.",
      "Working with a financial advisor can provide an objective perspective and help identify blind spots in your decision-making process. Sometimes, the most valuable advice is being talked out of making a poor decision during market extremes.",
    ],
    author: {
      name: "Ananya Desai",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Behavioral Finance Specialist",
    },
    date: "December 10, 2022",
    readTime: 8,
    category: "psychology",
  },
]

// Mock Strategy Guides
export const mockStrategies: Strategy[] = [
  {
    slug: "value-investing-guide",
    title: "Value Investing: Finding Diamonds in the Rough",
    excerpt:
      "A comprehensive guide to value investing principles and how to identify undervalued stocks with strong fundamentals.",
    content: [
      "Value investing is an investment strategy popularized by Benjamin Graham and later adopted by Warren Buffett. It focuses on buying stocks that appear to be trading for less than their intrinsic or book value.",
      "The core principle of value investing is the concept of margin of safety—purchasing securities when their market price is significantly below their intrinsic value. This provides a buffer against errors in analysis or unexpected market downturns.",
      "To identify potential value stocks, investors typically analyze financial statements and look for companies with strong fundamentals trading at a discount. Key metrics include price-to-earnings (P/E) ratio, price-to-book (P/B) ratio, debt-to-equity ratio, and free cash flow.",
      "A low P/E ratio relative to industry peers or the company's historical average may indicate an undervalued stock. However, it's important to understand why the P/E is low—it could signal genuine problems rather than an investment opportunity.",
      "Similarly, a P/B ratio below 1 suggests that a stock is trading below the value of its assets. This could represent a bargain, especially if the company has stable earnings and low debt.",
      "Dividend yield is another important consideration for value investors. A high dividend yield can provide income while waiting for the market to recognize a stock's true value.",
      "Value investors should also assess a company's competitive advantages or 'economic moat.' These are sustainable advantages that protect a company from competition and allow it to maintain profitability over the long term.",
      "Patience is crucial in value investing. It may take time for the market to recognize an undervalued stock's true worth. Value investors must be prepared to hold positions for years and even add to them if prices decline further.",
      "While value investing has proven successful over long periods, it can underperform during certain market cycles, particularly during speculative bull markets when growth stocks are favored. Maintaining discipline during these periods is essential.",
    ],
    author: {
      name: "Rajesh Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Value Investor",
    },
    date: "May 15, 2023",
    readTime: 12,
    level: "intermediate",
  },
  {
    slug: "momentum-trading-strategy",
    title: "Momentum Trading: Riding Market Trends for Profit",
    excerpt:
      "Learn how to identify and capitalize on market momentum to generate short to medium-term trading profits.",
    content: [
      "Momentum trading is based on the premise that securities that have performed well in the recent past will continue to perform well in the near future, and those that have performed poorly will continue to underperform.",
      "The strategy involves identifying securities with strong upward or downward trends and entering positions in the direction of the trend. Momentum traders typically use technical analysis rather than fundamental analysis to identify opportunities.",
      "One common approach is to look for stocks that have broken out above resistance levels on high volume, suggesting strong buying interest that could continue to push prices higher.",
      "Relative strength is a key concept in momentum trading. It involves comparing a security's performance to a benchmark index or sector. Securities outperforming their peers often continue to do so in the short term.",
      "Technical indicators commonly used by momentum traders include the Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), and rate of change (ROC). These help identify securities with strong price momentum.",
      "Risk management is crucial in momentum trading. Since momentum can reverse quickly, traders typically use stop-loss orders to limit potential losses. The stop-loss level is often set below a recent support level for long positions.",
      "Position sizing is another important consideration. Many momentum traders use a percentage of their portfolio for each trade rather than fixed amounts, adjusting position sizes based on volatility and perceived risk.",
      "Momentum trading requires active management and regular monitoring of positions. Unlike value investing, it's not a 'set and forget' strategy. Traders must be prepared to exit positions when momentum shows signs of weakening.",
      "While momentum trading can be profitable, it typically involves higher transaction costs and potential tax implications due to frequent trading. These costs should be factored into your overall strategy.",
    ],
    author: {
      name: "Neha Gupta",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Momentum Trader",
    },
    date: "June 8, 2023",
    readTime: 10,
    level: "advanced",
  },
  {
    slug: "dividend-growth-investing",
    title: "Dividend Growth Investing: Building Passive Income Streams",
    excerpt:
      "Discover how to build a portfolio of dividend-growing stocks that provide increasing passive income over time.",
    content: [
      "Dividend growth investing focuses on companies that not only pay dividends but consistently increase them over time. This strategy aims to generate growing passive income while potentially benefiting from capital appreciation.",
      "The power of dividend growth investing lies in compounding. As companies increase their dividends, reinvesting those dividends can accelerate portfolio growth, especially over long time horizons.",
      "When selecting dividend growth stocks, look beyond the current yield. A moderate yield with strong growth potential often outperforms a high current yield with limited growth prospects over the long term.",
      "Dividend aristocrats—companies that have increased their dividends for at least 25 consecutive years—are often good starting points for dividend growth investors. These companies have demonstrated commitment to shareholder returns through various economic cycles.",
      "Assess the sustainability of dividends by examining the payout ratio (dividends per share divided by earnings per share). A lower payout ratio suggests room for future dividend increases, while a very high ratio might indicate potential dividend cuts.",
      "Dividend growth investors should also evaluate a company's business model, competitive advantages, and financial health. Look for companies with stable earnings, low debt levels, and strong free cash flow to support future dividend increases.",
      "Sector diversification is important in a dividend growth portfolio. Different sectors have different dividend characteristics—utilities and consumer staples often offer higher yields, while technology companies might offer lower yields but higher growth rates.",
      "Dividend growth investing is typically a long-term strategy. Be prepared to hold positions through market cycles and avoid the temptation to chase yields or react to short-term market movements.",
      "Regular portfolio review is essential. Monitor changes in company fundamentals, dividend policies, and industry trends that might affect future dividend growth prospects.",
    ],
    author: {
      name: "Amit Singh",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Dividend Investor",
    },
    date: "April 3, 2023",
    readTime: 9,
    level: "beginner",
  },
  {
    slug: "swing-trading-basics",
    title: "Swing Trading Basics: Capturing Short-Term Market Moves",
    excerpt: "Learn the fundamentals of swing trading and how to profit from short to medium-term price movements.",
    content: [
      "Swing trading is a trading style that aims to capture gains in a stock or other financial instrument over a period of a few days to several weeks. It's a middle ground between day trading and long-term investing.",
      "Unlike day traders who close positions by the end of each trading day, swing traders hold positions overnight and may keep them open for several days or weeks, allowing them to capture larger price moves.",
      "Technical analysis is the primary tool for swing traders. Chart patterns, support and resistance levels, and technical indicators help identify potential entry and exit points.",
      "Common chart patterns used in swing trading include double tops and bottoms, head and shoulders, flags, and triangles. These patterns can signal potential reversals or continuations in price trends.",
      "Support and resistance levels are critical in swing trading. Traders often buy near support levels in uptrends and sell near resistance levels in downtrends, looking for the optimal risk-reward ratio.",
      "Technical indicators like moving averages, RSI, MACD, and Bollinger Bands can help confirm trends and identify potential reversal points. Many swing traders use a combination of indicators rather than relying on just one.",
      "Risk management is crucial in swing trading. Setting stop-loss orders to limit potential losses and having predetermined profit targets helps maintain discipline and prevent emotional decision-making.",
      "Position sizing is another important aspect of risk management. Many swing traders risk only a small percentage (1-2%) of their trading capital on any single trade.",
      "While technical analysis is the primary focus, swing traders should also be aware of fundamental factors that could impact their positions, such as earnings announcements, economic data releases, or major news events.",
    ],
    author: {
      name: "Vikram Malhotra",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Swing Trader",
    },
    date: "March 22, 2023",
    readTime: 11,
    level: "intermediate",
  },
  {
    slug: "index-investing-guide",
    title: "Index Investing: The Simple Path to Market Returns",
    excerpt:
      "Discover why index investing works and how to build a low-cost, diversified portfolio using index funds and ETFs.",
    content: [
      "Index investing is a passive investment strategy that seeks to replicate the performance of a specific market index, such as the Nifty 50 or Sensex in India. Instead of trying to beat the market, index investors aim to match its returns.",
      "The philosophy behind index investing is based on the efficient market hypothesis, which suggests that it's difficult to consistently outperform the market after accounting for costs and risks.",
      "One of the primary advantages of index investing is lower costs. Index funds and ETFs typically have much lower expense ratios than actively managed funds because they don't require extensive research teams or frequent trading.",
      "Diversification is another key benefit. A single index fund can provide exposure to hundreds or thousands of securities, reducing the impact of poor performance from any individual company.",
      "Index investing also offers simplicity and transparency. Investors always know what securities they own (those in the index), and the strategy requires less time and expertise than active investing approaches.",
      "When building an index portfolio, consider your asset allocation—the mix of stocks, bonds, and other asset classes. This should be based on your investment goals, time horizon, and risk tolerance.",
      "For stock exposure, consider a combination of domestic and international index funds. Within each category, you might include large-cap, mid-cap, and small-cap indexes for broader diversification.",
      "For bond exposure, index funds tracking government bonds, corporate bonds, or aggregate bond indexes can provide income and stability to the portfolio.",
      "Regular rebalancing is important to maintain your target asset allocation. As different assets perform differently over time, your allocation will drift from your targets. Rebalancing involves selling overperforming assets and buying underperforming ones to return to your target allocation.",
    ],
    author: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Passive Investor",
    },
    date: "February 5, 2023",
    readTime: 8,
    level: "beginner",
  },
]

// Mock Market Insights
export const mockInsights: Insight[] = [
  {
    slug: "tech-sector-outlook-2023",
    title: "Technology Sector Outlook: Navigating the Post-Pandemic Landscape",
    excerpt:
      "An analysis of the technology sector's prospects in 2023 as companies adapt to changing consumer behaviors and economic conditions.",
    content: [
      "The technology sector has experienced significant volatility in recent years, from the pandemic-driven surge to the subsequent correction as interest rates rose and growth expectations moderated.",
      "As we move forward, several key trends are shaping the technology landscape. Cloud computing continues to see robust growth as businesses accelerate their digital transformation initiatives. Major players like AWS, Microsoft Azure, and Google Cloud are expanding their service offerings and geographic presence.",
      "Artificial intelligence and machine learning applications are becoming increasingly mainstream across industries. Companies that can effectively leverage AI for business process optimization, customer experience enhancement, or product innovation are likely to outperform their peers.",
      "The semiconductor industry faces both challenges and opportunities. While supply chain constraints have eased, geopolitical tensions and efforts to reduce dependence on specific regions are driving significant investments in manufacturing capacity across different geographies.",
      "In the software space, the shift to subscription-based models continues, providing more predictable revenue streams for companies. However, enterprises are becoming more selective in their software spending, focusing on solutions that deliver clear ROI.",
      "E-commerce growth has normalized after the pandemic surge but remains structurally higher than pre-pandemic levels. Companies that have built robust omnichannel capabilities and efficient logistics networks are better positioned in this environment.",
      "Cybersecurity remains a critical priority for organizations of all sizes as threats become more sophisticated. This sector is relatively resilient to economic downturns due to the non-discretionary nature of security spending.",
      "From an investment perspective, valuation discipline is crucial in the current environment. Focus on companies with strong competitive positions, sustainable growth prospects, and paths to profitability rather than speculative growth stories.",
      "While the technology sector may face near-term headwinds from economic uncertainty, the long-term secular trends driving technology adoption remain intact, making this an important sector for long-term investors.",
    ],
    author: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "June 15, 2023",
    sector: "technology",
  },
  {
    slug: "banking-sector-analysis",
    title: "Banking Sector Analysis: Opportunities and Challenges in a Rising Rate Environment",
    excerpt:
      "Examining how Indian banks are positioned to benefit from higher interest rates while navigating credit quality concerns.",
    content: [
      "The banking sector in India has undergone significant transformation in recent years, with improvements in asset quality, capitalization, and technological capabilities. As interest rates have risen, the sector faces both opportunities and challenges.",
      "Higher interest rates typically benefit banks through expanded net interest margins (NIMs)—the difference between what banks earn on loans and pay on deposits. However, the extent of this benefit varies based on each bank's loan mix, funding structure, and competitive positioning.",
      "Private sector banks generally have stronger retail franchises and higher CASA (current account, savings account) ratios, allowing them to benefit more from rising rates compared to public sector banks with higher-cost funding structures.",
      "Asset quality remains a key focus area. While non-performing asset (NPA) ratios have improved significantly from their peaks, potential stress in certain segments like unsecured retail lending and small business loans warrants monitoring, especially if economic growth slows.",
      "Credit growth has been robust, particularly in retail segments like housing loans, personal loans, and credit cards. Corporate credit demand has also shown signs of revival as capacity utilization improves and private investment picks up.",
      "Digital transformation is reshaping the competitive landscape. Banks that have invested in technology infrastructure, data analytics capabilities, and seamless customer experiences are better positioned to defend market share against fintech disruptors.",
      "Regulatory developments, including the RBI's focus on risk management, governance, and compliance, continue to influence strategic decisions. Banks with strong risk management frameworks and compliance cultures are likely to face fewer regulatory headwinds.",
      "From a valuation perspective, the sector offers varying opportunities. Large private banks with strong deposit franchises, diversified loan books, and digital capabilities appear well-positioned for sustainable growth, while select public sector banks offer value at current valuations.",
      "Investors should focus on banks with strong liability franchises (high CASA ratios), diversified loan portfolios, adequate provisioning, and technological capabilities when considering investments in this sector.",
    ],
    author: {
      name: "Amit Singh",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "May 28, 2023",
    sector: "banking",
  },
  {
    slug: "renewable-energy-investment-opportunities",
    title: "Renewable Energy: Investment Opportunities in India's Green Transition",
    excerpt:
      "Exploring investment opportunities in India's rapidly growing renewable energy sector as the country pursues ambitious clean energy goals.",
    content: [
      "India has set ambitious renewable energy targets, aiming to achieve 500 GW of non-fossil fuel electricity generation capacity by 2030. This transition presents significant investment opportunities across various segments of the renewable energy value chain.",
      "Solar power continues to be the fastest-growing renewable energy source in India, driven by falling costs, supportive policies, and increasing corporate commitments to clean energy. Companies involved in solar module manufacturing, system integration, and project development offer exposure to this growth.",
      "Wind energy, both onshore and offshore, represents another significant opportunity. While growth has been slower than solar, technological improvements and hybrid projects (combining wind and solar) are enhancing the economics of wind power investments.",
      "Energy storage solutions are becoming increasingly important as renewable penetration increases. Companies developing battery storage technologies, pumped hydro storage, or other storage solutions are critical enablers of the renewable transition.",
      "The green hydrogen ecosystem is at an early stage but offers substantial long-term potential. India's National Hydrogen Mission aims to make the country a global hub for green hydrogen production and export, creating opportunities across the hydrogen value chain.",
      "Power transmission and distribution infrastructure needs significant upgrades to accommodate renewable energy growth. Companies involved in grid modernization, smart grid technologies, and high-voltage transmission equipment stand to benefit.",
      "Renewable energy financing is evolving with innovative structures like green bonds, infrastructure investment trusts (InvITs), and sustainability-linked loans. Financial institutions with expertise in renewable project financing have opportunities to grow in this space.",
      "Policy and regulatory developments continue to shape the sector. The Production Linked Incentive (PLI) scheme for solar manufacturing, renewable purchase obligations, and potential carbon pricing mechanisms all influence investment attractiveness across different segments.",
      "When evaluating investments in this sector, consider factors like technology differentiation, execution capabilities, balance sheet strength, and policy exposure to identify companies well-positioned to capitalize on India's renewable energy transition.",
    ],
    author: {
      name: "Divya Kapoor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "April 10, 2023",
    sector: "energy",
  },
  {
    slug: "pharmaceutical-industry-trends",
    title: "Pharmaceutical Industry Trends: Innovation and Growth Drivers",
    excerpt:
      "Analyzing key trends shaping the pharmaceutical industry and identifying potential investment opportunities.",
    content: [
      "The pharmaceutical industry in India and globally is undergoing significant transformation, driven by innovation, changing healthcare needs, and evolving business models. Several key trends are shaping the investment landscape in this sector.",
      "Research and development productivity is improving after years of declining returns. Advances in technologies like AI-driven drug discovery, genomics, and precision medicine are accelerating the identification of novel therapeutic targets and development of more effective treatments.",
      "Specialty medicines for complex or rare diseases represent a growing segment of the market. These high-value therapies often face less pricing pressure and generic competition compared to traditional small molecule drugs.",
      "Biosimilars (biological products highly similar to already-approved biologics) present significant opportunities, especially for Indian pharmaceutical companies with strong development and manufacturing capabilities. As more biologics lose patent protection, this market is expected to expand substantially.",
      "Contract development and manufacturing organizations (CDMOs) are benefiting from pharmaceutical companies' increasing outsourcing of manufacturing and development activities. Companies with specialized capabilities in areas like complex generics, biologics manufacturing, or novel delivery technologies are particularly well-positioned.",
      "Digital health integration is becoming increasingly important across the pharmaceutical value chain. From clinical trials and patient engagement to supply chain management and marketing, digital technologies are enhancing efficiency and effectiveness.",
      "Regulatory developments continue to influence the sector. Accelerated approval pathways for innovative therapies, evolving data requirements, and increasing focus on real-world evidence are changing how drugs are developed, approved, and commercialized.",
      "Geographic diversification remains a key strategy for pharmaceutical companies. While the US remains the largest and most profitable market, companies are increasingly focusing on expanding their presence in emerging markets with growing healthcare needs and spending.",
      "When evaluating pharmaceutical investments, consider factors like pipeline strength and diversity, patent expiration timelines, manufacturing capabilities, regulatory track record, and geographic exposure to identify companies with sustainable competitive advantages.",
    ],
    author: {
      name: "Ananya Desai",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "March 5, 2023",
    sector: "healthcare",
  },
  {
    slug: "consumer-trends-post-pandemic",
    title: "Evolving Consumer Trends: Investment Implications in the Post-Pandemic Economy",
    excerpt:
      "Examining how changing consumer behaviors are creating both challenges and opportunities across consumer-facing industries.",
    content: [
      "Consumer behaviors have undergone significant shifts in recent years, accelerated by the pandemic and subsequent economic changes. Understanding these evolving trends is crucial for identifying investment opportunities in consumer-facing sectors.",
      "Digital adoption has permanently increased across demographics. E-commerce penetration remains higher than pre-pandemic levels, and consumers expect seamless omnichannel experiences. Companies that have invested in robust digital capabilities and last-mile delivery infrastructure are better positioned to capture this shift.",
      "Premiumization trends are evident in certain categories despite inflationary pressures. Consumers are trading up in categories they value while economizing in others. This barbell effect creates opportunities at both the premium and value ends of the market, potentially squeezing mid-tier offerings.",
      "Health and wellness priorities have expanded beyond traditional healthcare to encompass nutrition, fitness, mental wellbeing, and preventive care. Companies offering products and services aligned with holistic wellness concepts are seeing strong demand growth.",
      "Sustainability considerations are increasingly influencing purchasing decisions. From eco-friendly packaging to ethical sourcing and reduced carbon footprints, consumers—particularly younger demographics—are favoring brands with strong environmental and social credentials.",
      "The experience economy is rebounding strongly after pandemic restrictions. Travel, hospitality, live entertainment, and out-of-home dining are seeing robust demand, though the nature of consumption has evolved with greater emphasis on unique, personalized experiences.",
      "Value consciousness has intensified amid inflationary pressures. Private label products, discount retailers, and brands offering compelling value propositions are gaining market share in many categories as consumers become more price-sensitive.",
      "Rural consumption patterns are evolving with increasing aspiration levels and digital connectivity. Companies with strong distribution networks and product offerings tailored to rural preferences have opportunities to tap into this large and growing market.",
      "When evaluating consumer sector investments, focus on companies with strong brand equity, pricing power, efficient supply chains, and the agility to adapt to rapidly evolving consumer preferences in this dynamic environment.",
    ],
    author: {
      name: "Rahul Verma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "February 12, 2023",
    sector: "consumer",
  },
]

// Mock Glossary Terms
export const mockGlossaryTerms: GlossaryTerm[] = [
  {
    term: "Asset Allocation",
    definition:
      "The process of dividing investments among different asset categories, such as stocks, bonds, and cash equivalents, based on an investor's goals, risk tolerance, and investment horizon.",
  },
  {
    term: "Bear Market",
    definition:
      "A market condition in which the prices of securities are falling or are expected to fall, typically by 20% or more from recent highs.",
  },
  {
    term: "Bull Market",
    definition:
      "A market condition in which the prices of securities are rising or are expected to rise, characterized by optimism and investor confidence.",
  },
  {
    term: "Capital Gain",
    definition:
      "The profit realized when an investment is sold for a higher price than the purchase price. Capital gains may be short-term (assets held for one year or less) or long-term (assets held for more than one year).",
  },
  {
    term: "Dividend",
    definition:
      "A distribution of a portion of a company's earnings, decided by the board of directors, to a class of its shareholders. Dividends can be issued as cash payments, shares of stock, or other property.",
  },
  {
    term: "Exchange-Traded Fund (ETF)",
    definition:
      "A type of investment fund that is traded on stock exchanges, similar to stocks. ETFs typically track an index, sector, commodity, or other asset, but can be bought and sold like a common stock throughout the trading day.",
  },
  {
    term: "Fundamental Analysis",
    definition:
      "A method of evaluating a security by attempting to measure its intrinsic value by examining related economic, financial, and other qualitative and quantitative factors.",
  },
  {
    term: "Hedge",
    definition:
      "An investment position intended to offset potential losses or gains that may be incurred by a companion investment. Hedging strategies are used to reduce risk.",
  },
  {
    term: "Index",
    definition:
      "A statistical measure of the changes in a portfolio of stocks representing a portion of the overall market. Common indices include the Nifty 50, Sensex, S&P 500, and Dow Jones Industrial Average.",
  },
  {
    term: "Liquidity",
    definition:
      "The degree to which an asset or security can be quickly bought or sold in the market without affecting its price. Cash is the most liquid asset.",
  },
  {
    term: "Market Capitalization",
    definition:
      "The total market value of a company's outstanding shares of stock, calculated by multiplying the stock's current market price by the total number of outstanding shares.",
  },
  {
    term: "Mutual Fund",
    definition:
      "An investment vehicle made up of a pool of funds collected from many investors for the purpose of investing in securities such as stocks, bonds, money market instruments, and other assets.",
  },
  {
    term: "Portfolio",
    definition:
      "A collection of financial investments like stocks, bonds, commodities, cash, and cash equivalents, including mutual funds and ETFs.",
  },
  {
    term: "Price-to-Earnings (P/E) Ratio",
    definition:
      "A valuation ratio of a company's current share price compared to its earnings per share (EPS). A high P/E could mean that a stock's price is high relative to earnings and possibly overvalued, or that investors are expecting high growth rates in the future.",
  },
  {
    term: "Risk Tolerance",
    definition:
      "The degree of variability in investment returns that an investor is willing to withstand. Risk tolerance is an important component in investing and should be considered when creating an investment strategy.",
  },
  {
    term: "Yield",
    definition:
      "The income return on an investment, such as the interest or dividends received from holding a particular security. Usually expressed as an annual percentage rate.",
  },
]

// Mock Risk Assessment Questions
export const mockRiskQuestions = [
  {
    question: "What is your primary investment goal?",
    options: [
      "Preserving capital and minimizing risk",
      "Generating income with some growth",
      "Balanced approach with moderate growth and income",
      "Achieving long-term growth with higher risk tolerance",
      "Maximizing growth potential with aggressive investments",
    ],
  },
  {
    question: "How long do you plan to keep your money invested before you need it?",
    options: ["Less than 3 years", "3-5 years", "5-10 years", "10-20 years", "More than 20 years"],
  },
  {
    question: "How would you react if your portfolio lost 20% of its value in a year?",
    options: [
      "Sell everything to prevent further losses",
      "Sell some investments to reduce risk",
      "Hold steady and make no changes",
      "See it as an opportunity and invest a little more",
      "Significantly increase investments to take advantage of lower prices",
    ],
  },
  {
    question: "Which statement best describes your investment knowledge and experience?",
    options: [
      "I have very limited knowledge and experience",
      "I understand basic investment principles but have limited experience",
      "I have moderate knowledge and some experience with different investment types",
      "I am knowledgeable and experienced with various investment strategies",
      "I consider myself an expert investor with extensive experience",
    ],
  },
  {
    question: "How would you describe your income stability?",
    options: [
      "My income is very unstable or I'm retired with fixed income",
      "My income is somewhat unstable",
      "My income is stable but with limited growth potential",
      "My income is stable with moderate growth potential",
      "My income is very stable with strong growth prospects",
    ],
  },
]

// Mock Portfolio Recommendations
export const mockPortfolioRecommendations = {
  conservative: {
    description:
      "This conservative portfolio is designed for investors who prioritize capital preservation and income over growth. It has a higher allocation to fixed income and lower volatility investments.",
    expectedReturn: 8,
    volatility: 5,
    timeHorizon: "Short to medium term (1-5 years)",
    allocation: [
      { name: "Fixed Income", value: 60 },
      { name: "Large Cap Equity", value: 20 },
      { name: "Gold", value: 10 },
      { name: "Cash", value: 10 },
    ],
    recommendedETFs: [
      { ticker: "GOLDBEES", name: "Nippon India ETF Gold BeES", category: "Gold", allocation: 10 },
      { ticker: "LIQUIDBEES", name: "Nippon India ETF Liquid BeES", category: "Cash Equivalent", allocation: 10 },
      { ticker: "NETFLTGILT", name: "Nippon India ETF Long Term Gilt", category: "Government Bonds", allocation: 30 },
      { ticker: "NETFSDL", name: "Nippon India ETF SDL", category: "State Development Loans", allocation: 30 },
      { ticker: "NIFTYBEES", name: "Nippon India ETF Nifty BeES", category: "Large Cap Equity", allocation: 20 },
    ],
  },
  "moderately-conservative": {
    description:
      "This moderately conservative portfolio balances income and growth, with a tilt toward income. It's suitable for investors with a medium-term horizon who can tolerate some volatility.",
    expectedReturn: 10,
    volatility: 8,
    timeHorizon: "Medium term (5-7 years)",
    allocation: [
      { name: "Fixed Income", value: 45 },
      { name: "Large Cap Equity", value: 30 },
      { name: "Mid Cap Equity", value: 10 },
      { name: "Gold", value: 10 },
      { name: "Cash", value: 5 },
    ],
    recommendedETFs: [
      { ticker: "GOLDBEES", name: "Nippon India ETF Gold BeES", category: "Gold", allocation: 10 },
      { ticker: "LIQUIDBEES", name: "Nippon India ETF Liquid BeES", category: "Cash Equivalent", allocation: 5 },
      { ticker: "NETFLTGILT", name: "Nippon India ETF Long Term Gilt", category: "Government Bonds", allocation: 25 },
      { ticker: "NETFSDL", name: "Nippon India ETF SDL", category: "State Development Loans", allocation: 20 },
      { ticker: "NIFTYBEES", name: "Nippon India ETF Nifty BeES", category: "Large Cap Equity", allocation: 30 },
      { ticker: "NETFMID150", name: "Nippon India ETF Nifty Midcap 150", category: "Mid Cap Equity", allocation: 10 },
    ],
  },
  moderate: {
    description:
      "This balanced portfolio aims for moderate growth and income. It has a roughly equal allocation between equity and fixed income, suitable for investors with a medium to long-term horizon.",
    expectedReturn: 12,
    volatility: 12,
    timeHorizon: "Medium to long term (7-10 years)",
    allocation: [
      { name: "Fixed Income", value: 35 },
      { name: "Large Cap Equity", value: 30 },
      { name: "Mid Cap Equity", value: 15 },
      { name: "Small Cap Equity", value: 5 },
      { name: "International Equity", value: 10 },
      { name: "Gold", value: 5 },
    ],
    recommendedETFs: [
      { ticker: "GOLDBEES", name: "Nippon India ETF Gold BeES", category: "Gold", allocation: 5 },
      { ticker: "NETFLTGILT", name: "Nippon India ETF Long Term Gilt", category: "Government Bonds", allocation: 20 },
      { ticker: "NETFSDL", name: "Nippon India ETF SDL", category: "State Development Loans", allocation: 15 },
      { ticker: "NIFTYBEES", name: "Nippon India ETF Nifty BeES", category: "Large Cap Equity", allocation: 30 },
      { ticker: "NETFMID150", name: "Nippon India ETF Nifty Midcap 150", category: "Mid Cap Equity", allocation: 15 },
      {
        ticker: "NETFSMLCAP",
        name: "Nippon India ETF Nifty Smallcap 250",
        category: "Small Cap Equity",
        allocation: 5,
      },
      { ticker: "NETFN100", name: "Nippon India ETF Nifty 100", category: "International Equity", allocation: 10 },
    ],
  },
  "moderately-aggressive": {
    description:
      "This growth-oriented portfolio has a higher allocation to equities across market capitalizations. It's designed for investors with a long-term horizon who can tolerate higher volatility.",
    expectedReturn: 14,
    volatility: 16,
    timeHorizon: "Long term (10-15 years)",
    allocation: [
      { name: "Fixed Income", value: 20 },
      { name: "Large Cap Equity", value: 35 },
      { name: "Mid Cap Equity", value: 20 },
      { name: "Small Cap Equity", value: 10 },
      { name: "International Equity", value: 15 },
    ],
    recommendedETFs: [
      { ticker: "NETFLTGILT", name: "Nippon India ETF Long Term Gilt", category: "Government Bonds", allocation: 10 },
      { ticker: "NETFSDL", name: "Nippon India ETF SDL", category: "State Development Loans", allocation: 10 },
      { ticker: "NIFTYBEES", name: "Nippon India ETF Nifty BeES", category: "Large Cap Equity", allocation: 35 },
      { ticker: "NETFMID150", name: "Nippon India ETF Nifty Midcap 150", category: "Mid Cap Equity", allocation: 20 },
      {
        ticker: "NETFSMLCAP",
        name: "Nippon India ETF Nifty Smallcap 250",
        category: "Small Cap Equity",
        allocation: 10,
      },
      { ticker: "NETFN100", name: "Nippon India ETF Nifty 100", category: "International Equity", allocation: 15 },
    ],
  },
  aggressive: {
    description:
      "This aggressive growth portfolio is heavily weighted toward equities, including higher allocations to mid and small-cap stocks. It's designed for investors with a very long-term horizon and high risk tolerance.",
    expectedReturn: 16,
    volatility: 20,
    timeHorizon: "Very long term (15+ years)",
    allocation: [
      { name: "Fixed Income", value: 10 },
      { name: "Large Cap Equity", value: 30 },
      { name: "Mid Cap Equity", value: 25 },
      { name: "Small Cap Equity", value: 15 },
      { name: "International Equity", value: 15 },
      { name: "Thematic/Sector", value: 5 },
    ],
    recommendedETFs: [
      { ticker: "NETFLTGILT", name: "Nippon India ETF Long Term Gilt", category: "Government Bonds", allocation: 10 },
      { ticker: "NIFTYBEES", name: "Nippon India ETF Nifty BeES", category: "Large Cap Equity", allocation: 30 },
      { ticker: "NETFMID150", name: "Nippon India ETF Nifty Midcap 150", category: "Mid Cap Equity", allocation: 25 },
      {
        ticker: "NETFSMLCAP",
        name: "Nippon India ETF Nifty Smallcap 250",
        category: "Small Cap Equity",
        allocation: 15,
      },
      { ticker: "NETFN100", name: "Nippon India ETF Nifty 100", category: "International Equity", allocation: 15 },
      { ticker: "NETFIT", name: "Nippon India ETF Nifty IT", category: "Sector - IT", allocation: 5 },
    ],
  },
}
