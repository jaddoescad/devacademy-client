import { createContext } from 'react'


interface AuthStateType {
  authState: 'loading' | 'loaded'
}

export const authState:AuthStateType = {
  authState: 'loading',
}

const AuthStateContext = createContext(authState)

export default AuthStateContext
