type Account = {
  userId: number
  username: string
  email: string
  password: string
  role: "admin" | "user"
}

export interface Accounts {
  accounts: Account[]
} 