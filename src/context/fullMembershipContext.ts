import { createContext } from 'react'

interface Membership {
  isFullMembership?: boolean | null
  minDev?: number 
  totalStake: number
  setMembership: Function
}

export const fullMembership: Membership = {
  isFullMembership: null,
  minDev: undefined,
  totalStake: 0, 
  setMembership: () => {}
}


const FullMembershipContext = createContext(fullMembership)

export default FullMembershipContext