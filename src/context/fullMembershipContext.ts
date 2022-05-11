import { createContext } from 'react'

export const fullMembership = {
  fullMembership: false,
  setFullMembership: (stoken: boolean) => {}
}

const FullMembershipContext = createContext(fullMembership)

export default FullMembershipContext
