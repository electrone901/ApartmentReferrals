import React, { useState, useEffect } from 'react'
import {
  Button,
  StylesProvider,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useParams, useLocation } from 'react-router-dom'
import './CovalentGetNfts.css'

function CovalentGetNfts({ account }) {
  const { recipeId } = useParams()
  const [loading, setLoading] = useState(false)
  const userWallet = '0xAF67cbD8fb00759C3b4667beAcfBB3600e25476A'
  const [nfts, setNfts] = useState({})
  const [items, setItems] = useState([])
  console.log('items', items)
  const [data, setData] = useState({})
  const { state = {} } = useLocation()

  const covalentNfts = async () => {
    const covalentAPI = 'ckey_d4115699196e4d238fa138e180c'
    // const chefContractAddress = '0x1a2FCb5F2704f1fF8eFF26668f63D001b42bF80B'
    // const ENSName = 'Metaverse4life.eth'
    const ENSName = '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C'
    try {
      const nfts = await fetch(
        `https://api.covalenthq.com/v1/137/address/${ENSName}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${covalentAPI}`,
      )
      // const nfts = await fetch(
      //   `https://api.covalenthq.com/v1/80001/tokens/${chefContractAddress}/nft_token_ids/?quote-currency=USD&format=JSON&key=${covalentAPI}`,
      // )
      const allNFTS = await nfts.json()
      console.log('my =>>>>>>  allNFTS', allNFTS)
      if (allNFTS) {
        setNfts(allNFTS)
        setItems(allNFTS?.data?.items)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    covalentNfts()
  }, [])

  useEffect(() => {
    const getImage = (ipfsURL) => {
      if (!ipfsURL) return
      ipfsURL = ipfsURL.split('://')
      return 'https://ipfs.io/ipfs/' + ipfsURL[1]
    }

    const getMetadata = async () => {
      let data = await fetch(`https://ipfs.io/ipfs/${recipeId}/metadata.json`)
      data = await data.json()
      const dataArray = data.description.split(',')
      data.creator = dataArray[0]
      data.type = dataArray[1]
      data.intro = dataArray[2]
      data.image = getImage(data.image)
      setData(data)
    }
    if (recipeId) {
      getMetadata()
      getImage()
    }
  }, [recipeId, account])

  return (
    <StylesProvider injectFirst>
      <Container style={{ paddingTop: '1rem', paddingBottom: '6rem' }}>
        <div className="search-container">
          <br />
          <form className="d-flex ms-auto my-form">
            <input
              type="text"
              class="form-control me-sm-2"
              placeholder="Alice.eth"
            />
            <button
              type="button"
              // onClick={search}
              className="btn btn-primary search-btn"
            >
              search
            </button>
          </form>
        </div>
        <br />

        {loading ? (
          <h1>Loading..</h1>
        ) : (
          <div>
            {nfts && nfts?.data ? (
              <div>
                <h4 className="text-center">
                  This Domain Tenant has the following NFTs landloard referrals
                </h4>
                <br />
                <p className="info">
                  <strong>Last update: </strong> {nfts.data.updated_at}
                </p>
                <p>
                  <strong className="info">Total Count: </strong>
                  {/* {nfts.data.pagination.total_count} */}
                </p>
              </div>
            ) : (
              <h2>No data</h2>
            )}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Logo</TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Contract name</TableCell>
                    <TableCell>Contract address</TableCell>
                    <TableCell>Contract symbol</TableCell>
                    <TableCell>Contract decimals</TableCell>
                    <TableCell>Logo url</TableCell>
                    <TableCell>View Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items &&
                    items.map((legislator, key) => {
                      let overallRating, overallBlkRating
                      if (legislator.AverageRating) {
                        overallRating = legislator.overallRating
                      }
                      if (legislator.AverageBLKRating) {
                        overallBlkRating = legislator.overallBlkRating
                      }
                      return (
                        <TableRow key={key}>
                          <TableCell>
                            <Avatar alt="nft logo" src={legislator.logo_url} />
                          </TableCell>
                          <TableCell>{legislator.token_id}</TableCell>
                          <TableCell>{legislator.contract_name}</TableCell>
                          <TableCell className="line-break">
                            {legislator.contract_address}
                          </TableCell>
                          <TableCell>
                            {legislator.contract_ticker_symbol}
                          </TableCell>
                          <TableCell>{legislator.contract_decimals}</TableCell>
                          <TableCell className="line-break">
                            {legislator.logo_url}
                          </TableCell>
                          <TableCell align="center">
                            <a
                              href={`https://mumbai.polygonscan.com/address/${legislator.contract_address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ChevronRightIcon
                                fontSize="large"
                                style={{ color: 'blue' }}
                              />
                            </a>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Container>
    </StylesProvider>
  )
}

export default CovalentGetNfts
