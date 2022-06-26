import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PostApartment.css'
import { NFTStorage, File } from 'nft.storage'
import { apiKey } from '../APIKEYS'

function PostApartment() {
  const history = useNavigate()
  const [image, setImage] = useState('')
  const [description, setDescription] = useState(
    "We recently bought a NYC apartment - our first time purchasing - and we couldn't be more grateful to have had Grant as our broker. He provided invaluable advice and insight at every… more Responds in about 2 hours 89 locals recently contacted this agent 76 Verified LicenseReal Estate Agents Efficient - according to 2 users My husband and I had the pleasure of working with Grant when planning our move from CA to NYC for this summer. Grant was gracious enough to take his time and show us several…",
  )
  const [address, setAddress] = useState(
    '123 Broadway Apartment 3 A NY, NY 10024',
  )
  const [company, setCompany] = useState('Compass')
  const [status, setStatus] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')

  const statusChange = (e) => {
    setStatus(e.target.value)
  }
  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(
      '🚀 image, status, address , company',
      description,
      image,
      status,
      address,
      company,
    )

    try {
      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: address,
        description: `${description},$, ${company},$,${status}`,
        image: new File([image], imageName, { type: imageType }),
      })
      if (metadata) {
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div className="mb-3 text-center">
        <h2>Registered An Apartment</h2>
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="pet"
            className="img-preview"
          />
        ) : (
          ''
        )}
      </div>
      <form action="" className="form-inline" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="formFile" className="form-label">
            Image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            defaultValue={image}
            onChange={handleImage}
          />
        </div>

        <div className="mb-3">
          <label for="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder=""
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="address" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder=""
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="company" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            placeholder="Compass"
            defaultValue={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            defaultValue={status}
            onChange={statusChange}
          >
            <option selected value="">
              Apartment Status
            </option>
            <option value="Occupied">Occupied</option>
            <option value="Available">Available</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  )
}

export default PostApartment
