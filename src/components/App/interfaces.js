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