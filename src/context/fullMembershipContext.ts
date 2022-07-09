import { createContext } from 'react'

interface Membership {
  isFullMembership?: boolean
  minDev?: number 
  totalStake: number
  setMembership: Function
}

export const fullMembership: Membership = {
  isFullMembership: false,
  minDev: undefined,
  totalStake: 0, 
  setMembership: () => {}
}


const FullMembershipContext = createContext(fullMembership)

export default FullMembershipContext