import { createContext, useState } from "react"

export const OrderContext = createContext()

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null)

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  )
}
