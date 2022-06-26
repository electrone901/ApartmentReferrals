import React, { useState } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import './AwardNfts.css'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  Card,
} from '@material-ui/core'
import { toast } from 'react-toast'
import { ToastContainer } from 'react-toast'

function AwardNfts() {
  const apiKeyport = '5aca4bfa-4460-4000-ada2-dfe2b88831e8'
  const [image, setImage] = useState('')
  const [tenantName, setTenantName] = useState('Metaverse4life.eth')
  const [description, setDescription] = useState(
    'This tenant always paid on time. She was always clean. I definitely reccomend her for with this NFT landloard  referral for being a great tenant!',
  )
  let [mintAddress, setMintAddress] = useState(
    '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C',
  )
  const file_url =
    'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  const [codeHash, setCodeHash] = useState('')
  const showError = () => toast.error('Oops! Some error occurred. Try again! ')
  const showSuccess = () => toast('Yay your NFT was sent successfully!')

  const nftPortFunc = (e) => {
    e.preventDefault()
    fetch('https://api.nftport.xyz/v0/mints/easy/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '5aca4bfa-4460-4000-ada2-dfe2b88831e8',
      },
      body: `{"chain":"polygon","name":${tenantName},"description":"Mydescription","file_url":${file_url},"mint_to_address":${mintAddress}}`,
    })
      .then((response) => {
        console.log(response)
        showSuccess()
        setCodeHash(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const mintWithNFTPort = (event) => {
    event.preventDefault()
    setImage(event.target.files[0])
    if (mintAddress === '') {
      mintAddress = '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C'
      // mintAddress = '0xAF67cbD8fb00759C3b4667beAcfBB3600e25476A'
      // mintAddress = '0x5Df598c222C4A7e8e4AB9f347dcBd924B6458382'
    }
    console.log(' image', event.target.files[0])
    const form = new FormData()
    form.append('file', event.target.files[0])

    const options = {
      method: 'POST',
      body: form,
      headers: {
        Authorization: apiKeyport,
      },
    }

    fetch(
      'https://api.nftport.xyz/v0/mints/easy/files' +
        new URLSearchParams({
          chain: 'polygon',
          name: tenantName,
          description: description,
          mint_to_address: mintAddress,
          msg: 'This is a NFT landloard  referral for being a great tenant!',
        }),
      options,
    ).then(function (responseJson) {
      if (responseJson) {
        showSuccess()
        setCodeHash(responseJson)
      } else {
        showError()
      }
      console.log(responseJson)
    })
  }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-create-pet"
        style={{ minHeight: '80vh', paddingBottom: '3rem' }}
      >
        <div>
          {codeHash ? (
            <Card className="code-hash">
              <Typography gutterBottom className="title">
                Your NFT was minted succesfully 🎉
              </Typography>

              <Typography gutterBottom variant="subtitle1">
                Confirmation Transaction:
              </Typography>
              <p> {codeHash.transaction_hash}</p>

              <br />
              <p>MintedAddress:</p>
              <p>{codeHash.mint_to_address}</p>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href={codeHash.transaction_external_url}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className="transaction-btn"
                >
                  See transaction details
                </Button>
              </a>
            </Card>
          ) : (
            ''
          )}
          <br />
          <br />
          <br />
          <Typography className="title" color="textPrimary" gutterBottom>
            Donate NFTs
          </Typography>

          {/* Add Form */}
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="pet"
              className="img-preview"
            />
          ) : (
            ''
          )}
          <div className="form-container">
            <ToastContainer delay={3000} />
            <form className="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                id="outlined-basic"
                label="NFT's name"
                variant="outlined"
                className="text-field"
                defaultValue={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Short description"
                variant="outlined"
                className="text-field"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Sent to wallet Address "
                variant="outlined"
                className="text-field"
                defaultValue={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                required
              />

              <input
                accept="image/*"
                className="input"
                id="icon-button-photo"
                defaultValue={image}
                onChange={nftPortFunc}
                type="file"
              />

              <label htmlFor="icon-button-photo">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>

              <Button size="large" variant="contained" color="primary">
                Upload & Submit
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </StylesProvider>
  )
}

export default AwardNfts
