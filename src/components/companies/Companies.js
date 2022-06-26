import { useEffect, useState } from 'react'
import './Companies.css'
import PriceHistory from '../price-history/PriceHistory'
import { apiKey } from '../APIKEYS'
import { Link, useNavigate } from 'react-router-dom'

function Companies() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadsData = async () => {
      try {
        setLoading(true)
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()
        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )
            data = await data.json()
            let descriptionArr = data.description.split(',$,')

            const getImage = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }
            data.image = await getImage(data.image)
            data.info = descriptionArr[0]
            data.company = descriptionArr[1]
            data.status = descriptionArr[2]
            data.cid = cid.cid
            data.created = cid.created
            temp.push(data)
          }
        }
        setData(temp)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loadsData()
  }, [])

  const details = () => {
    navigate('apartment/1')
  }

  return (
    <div className="m-4">
      <p className="small strong">Real estate referrals > Services </p>
      <div className="display-flex">
        <h5>
          Rate your landloard, building managment and tenants and get rewarded.
        </h5>
        <p className="small">Sort:Recommended ⌄</p>
      </div>
      <p className="small">
        <strong>Results</strong>
      </p>

      {data.length ? (
        data.map((apt, index) => (
          <div className="card p-2" key={index}>
            <div className="row">
              <div className="col-md-3">
                <img src={apt.image} style={{ width: '300px' }} alt="" />
              </div>
              <div className="col">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="title">{apt.name}</p>

                  <button
                    size="small"
                    onClick={details}
                    className="btn btn-success"
                  >
                    View Details
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <p className="">12 Reviews</p>
                </div>
                <p>
                  <i class="fa fa-check-square"></i> Verified License Real
                  Estate Owner
                </p>

                <p>
                  <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                  This Apartment is {apt.status}
                </p>

                <p>
                  <i class="fa fa-solid fa-building" aria-hidden="true"></i> By{' '}
                  {apt.company} company
                </p>
                {apt.info}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>Loading</h1>
      )}

      <br />
      <div className="card p-2">
        <div className="row">
          <div className="col-md-3">
            <img
              src="https://s3-media0.fl.yelpcdn.com/bphoto/6RBGesGTGfzEqm6AYd78qQ/ls.jpg"
              alt=""
            />
          </div>
          <div className="col">
            <p className="title">The Braswell Team at Compass</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="ratings">
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star"></i>
              </div>
              <p className="">12 Reviews</p>
            </div>
            <p>
              <i class="fa fa-check-square"></i> Verified License Real Estate
              Agent
            </p>
            <p>
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>{' '}
              Available by Appointments
            </p>
            This apartment was great and spacious. The building management was
            always responsive and effective during our time living there. 100 %
            reccomedable!
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      <PriceHistory />
    </div>
  )
}

export default Companies
