import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { createContext } from 'react'
import { ethers } from 'ethers'

interface IWallet {
  web3?: Web3
  ethersProvider?: ethers.providers.BaseProvider
  web3Modal?: Web3Modal
  address?: string
  setProviders: Function
  stokenValue?: number
}

export const wallet: IWallet = {
  web3: undefined,
  ethersProvider: undefined,
  web3Modal: undefined,
  address: undefined,
  setProviders: () => {},
  stokenValue: undefined,
}

const WalletContext = createContext(wallet)

export default WalletContext
