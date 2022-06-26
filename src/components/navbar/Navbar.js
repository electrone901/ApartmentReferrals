import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../images/mylogo.png'
import UAuth from '@uauth/js'
import Web3Modal from 'web3modal'
import Button from '@material-ui/core/Button'
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp'

function Navbar({
  currentAccount,
  onClickDisconnect,
  onClickConnect,
  balance,
  providerSave,
}) {
  console.log('🚀 ~ file: Navbar.js ~ line 14 ~ currentAccount', currentAccount)
  var ethers = require('ethers')

  // var provider = new ethers.providers.Web3Provider(ethereum)
  // ENS functionality is provided directly on the core provider object.
  const [udUser, setudUser] = useState('')

  const uauth = new UAuth({
    clientID: '69c407cc-4663-48af-af8a-4f90592ba307',
    redirectUri: 'http://localhost:3000',
  })
  const loginUD = async (e) => {
    e.preventDefault()
    try {
      const authorization = await uauth.loginWithPopup()
      const currentUser = authorization.idToken.sub
      setudUser(currentUser)
    } catch (error) {
      console.error(error)
    }
  }
  const unstoppableDomainsLogout = () => {
    console.log('logging out!')
    uauth.logout().catch((error) => {
      console.error('profile error:', error)
    })
    setudUser('')
  }

  const search = async (e) => {
    e.preventDefault()
    // takes in  ensDomain & returns the wallet address
    var result = await providerSave.resolveName('albert.eth')
  }

  return (
    <div className="m-4">
      <nav class="navbar navbar-expand-lg navbar-dark my-navbar">
        <div class="container-fluid">
          <a href="#" class="navbar-brand">
            <img src={logo} alt="logo" className="logo" />
          </a>
          <button
            type="button"
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse2"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse2">
            <div class="navbar-nav">
              <a href="/" class="nav-item nav-link active my-nav">
                Home
              </a>
              <a href="/post-apartment" class="nav-item nav-link active my-nav">
                Register
              </a>
              <a href="/search" class="nav-item nav-link active my-nav">
                Search
              </a>
              <a href="/award" class="nav-item nav-link active my-nav">
                Award-NFT
              </a>
            </div>

            <div className="d-flex ms-auto">
              {currentAccount ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    // className="connected-btn"
                    endIcon={<VerifiedUserSharpIcon />}
                  >
                    {currentAccount.substring(0, 8)}...
                    {currentAccount.substring(38)}
                  </Button>
                  <Button
                    style={{ color: 'white' }}
                    to="/"
                    onClick={onClickDisconnect}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  className="connect-wallet-btn"
                  onClick={onClickConnect}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div>
        {currentAccount ? (
          <div className="display-flex">
            <p>Welcome back 🤗 </p>
            <p>Your balance is: {balance}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Navbar
