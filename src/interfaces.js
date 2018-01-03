export interface Wallet {
  name: string,
  id: string,
  balance: {
    currency: string,
    amount: string
  },
  currency: string,
  purchases: string[]
}

export interface ProfitProfile {
  totalPaid: string,
  balanceNow: string,
  profitLoss: string,
  percentage: string,
  inProfit: boolean
}

export interface Purchase {
  currency: string,
  id: string,
  total: {
    amount: string,
    currency: string
  }
}
