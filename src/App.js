import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import Companies from './components/companies/Companies'
import Apartment from './components/apartment/Apartment'
import Navbar from './components/navbar/Navbar'
import PostApartment from './components/post-apartment/PostApartment'
import CovalentGetNfts from './components/covalent-get-nfts/CovalentGetNfts'
import AwardNfts from './components/award-nfts/AwardNfts'
import { ABI } from './config'

const { ethers } = require('ethers')

// pick  slide for presentation,   sponsors & judges presentations, bouties goes directly to their
function App() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState('')
  const [contract, setContract] = useState('')
  console.log('**contract', contract)
  const [providerSave, setProviderSave] = useState('')
  const [balance, setBalance] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [chainId, setChainId] = useState(0)
  const [chainname, setChainName] = useState('')
  console.log('🚀 ~ file: App.js ~ line 25 ~ App ~ chainname', chainname)

  let provider

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return

    //client side code
    if (!window.ethereum) return
    provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance(currentAccount).then((result) => {
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result) => {
      setChainId(result.chainId)
      setChainName(result.name)
    })
  }, [currentAccount])

  const onClickConnect = async () => {
    if (!window.ethereum) {
      console.log('please install MetaMask')
      return
    }
    provider = new ethers.providers.Web3Provider(window.ethereum)
    setProviderSave(provider)
    const { chainId } = await provider.getNetwork()
    const deployedMaticContract = '0x62dDfd4447E5c894fa7860c1271b5B0293cBCa09'
    const deployedSkaleContract = '0x16d7be29ebc6db2e9c92E0Bf1dE5c1cfe6b1AD2a'
    const deployedOptimismContract =
      '0x16d7be29ebc6db2e9c92E0Bf1dE5c1cfe6b1AD2a'
    const signer = provider.getSigner()

    console.log('****', chainId)
    if (chainId == '1085866509') {
      let contract = new ethers.Contract(deployedSkaleContract, ABI, signer)
      setContract(contract)
    } else if (chainId == '80001') {
      let contract = new ethers.Contract(deployedMaticContract, ABI, signer)
      setContract(contract)
    } else if (chainId == '69') {
      let contract = new ethers.Contract(deployedOptimismContract, ABI, signer)
      setContract(contract)
    }
    // MetaMask requires requesting permission to connect users accounts
    provider
      .send('eth_requestAccounts', [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0])
      })
      .catch((e) => console.log(e))
  }

  const onClickDisconnect = () => {
    setBalance(undefined)
    setCurrentAccount(undefined)
  }

  return (
    <BrowserRouter>
      <div className="cl">
        <Navbar
          currentAccount={currentAccount}
          onClickDisconnect={onClickDisconnect}
          onClickConnect={onClickConnect}
          balance={balance}
          providerSave={providerSave}
        />

        <Routes>
          <Route path="/" element={<Companies />} />
          <Route path="apartment/:id" element={<Apartment />} />
          <Route path="/post-apartment" element={<PostApartment />} />
          <Route path="/search" element={<CovalentGetNfts />} />
          <Route path="/award" element={<AwardNfts />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
