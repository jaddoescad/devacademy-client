import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { AbstractProvider, provider } from 'web3-core'
import { providers } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'

const cache: WeakMap<NonNullable<Web3>, string> = new WeakMap()

type signCache = {
  message: string
  signature: string
}

export type ChainName = UndefinedOr<
  'ethereum' | 'ropsten' | 'arbitrum-one' | 'arbitrum-rinkeby' | 'polygon' | 'polygon-mumbai'
>

const signCacheContainer: Map<string, signCache> = new Map()

export const connectWallet = async (setProvidersHandler: Function, web3Modal?: Web3Modal) => {
  console.log("web3Modal",web3Modal)
  const provider = await web3Modal?.connect().catch(() => {
    return undefined
  })
  if (provider === undefined) {
    return false
  }
  
  const web3: Web3 = new Web3(provider)
  const ethersProvider = new providers.Web3Provider(provider)
  if (web3 && ethersProvider) {
    const updater = createProviderUpdater(provider, setProvidersHandler)
    updater()
    provider.on('accountsChanged', updater)
    provider.on('chainChanged', updater)
  }
}

function createProviderUpdater(provider: any, setProviders: Function) {
  return async () => {
    const web3: any = new Web3(provider)
    const ethersProvider = new providers.Web3Provider(provider)
    const [address] = await web3.eth.getAccounts()
    console.log('address', address)
    setProviders(web3, ethersProvider, address)
    return { web3, ethersProvider, address }
  }
}

export const disconnectWallet = (setProvidersHandler: Function, setMembership: Function, web3Modal?: Web3Modal) => {
  web3Modal?.clearCachedProvider()
  setProvidersHandler(undefined)
  setMembership({
    isFullMembership: false,
    minDev: null,
    totalStake: 0.00
  })
}

export const getAccountAddress = async (web3?: Web3) => {
  if (web3) {
    return (async fromCache => {
      if (typeof fromCache === 'string') {
        return fromCache
      }
      const [account] = await web3.eth.getAccounts()
      cache.set(web3, account)
      return account
    })(cache.get(web3))
  }
  return undefined
}

export const sign = async (web3: any, inputMessage: string) => {
  const key = '@utility/web3sign'
  if (web3) {
    const address = await getAccountAddress(web3)
    if (address === undefined) {
      return undefined
    }
    const signature = await new web3.eth.personal.sign(inputMessage, address, '')
      .then((result: string) => result)
      .catch((error: any) => {
          console.log('error', error)
        return undefined
      })
    return signature
  }
  return undefined
}

export const signWithCache = async (web3: any, inputMessage: string) => {
  const key = '@utility/web3sign'
  if (web3) {
    const address = await getAccountAddress(web3)
    if (address === undefined) {
      return { signature: undefined, message: undefined }
    }

    const c = signCacheContainer.get(address)
    if (c) {
      return { signature: c.signature, message: c.message }
    }

    const signature = await new web3.eth.personal.sign(inputMessage, address, '')
      .then((result: string) => result)
      .catch((error: any) => {
        console.log(error)
        return undefined
      })

    if (signature !== undefined) {
      signCacheContainer.set(address, { signature, message: inputMessage })
    }
    return { signature, message: inputMessage }
  }
  return { signature: undefined, message: undefined }
}

export const isAbstractProvider = (prov?: provider): prov is AbstractProvider =>
  Boolean(prov && typeof prov !== 'string' && typeof (prov as any).request === 'function')

export const createHandleAddClick =
  ({
    provider,
    tokenAddress,
    tokenSymbol,
    tokenDecimals = 18,
    tokenImage
  }: {
    provider: provider
    tokenAddress: string
    tokenSymbol: string
    tokenDecimals?: number
    tokenImage?: string
  }) =>
  async () => {
    isAbstractProvider(provider) &&
      // @ts-ignore
      (await provider
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage // A string url of the token logo
            }
          }
        })
        .catch(err => {
          console.log('SOMETHING HAPPENED: ', err)
          console.log(err)
        //   message.error({ content: err.message, key: 'addTokenToWallet' })
        }))
  }

export const detectChain = async (ethersProvider?: providers.BaseProvider) => {
  const res = await ethersProvider?.getNetwork()
  const chainId = res?.chainId
  const name: ChainName =
    chainId === 1
      ? 'ethereum'
      : chainId === 3
      ? 'ropsten'
      : chainId === 42161
      ? 'arbitrum-one'
      : chainId === 421611
      ? 'arbitrum-rinkeby'
      : chainId === 137
      ? 'polygon'
      : chainId === 80001
      ? 'polygon-mumbai'
      : undefined

  return { chainId, name }
}