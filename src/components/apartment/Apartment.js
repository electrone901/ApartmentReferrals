import React from 'react'
import './Apartment.css'
import TabsNabvar from './TabsNabvar'
const myImg =
  'https://s3-media0.fl.yelpcdn.com/bphoto/oTMzZGypcGxUkhWGmbBFnw/o.jpg'
function Apartment() {

  return (
    <div className="m-4">
      <h2>Apartment</h2>
      <header>
        <div className="img-apartment">
          {/* <img
            src="https://s3-media0.fl.yelpcdn.com/bphoto/oTMzZGypcGxUkhWGmbBFnw/o.jpg"
            alt="header apt"
          /> */}

          <div
            style={{
              background: `url(${myImg}) no-repeat`,
              backgroundPosition: 'center top',
              backgroundSize: '100%',
              height: '500px',
              display: 'flex',
              justifyContent: 'space-between',
              color: 'white',
              fontWeight: '600',
            }}
          >
            <div className="apartment-inner">
              <div className="bg-black">
                <h2>Name of company</h2>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i> 12 Reviews
                  </div>
                </div>
                <p>
                  <i class="fa fa-clock-o" aria-hidden="true"></i> Currently
                  Occupied
                </p>
              </div>
            </div>

            <div className="apartment-inner2">
              <button type="button" className="btn btn-lg btn-primary">
                Write a review
              </button>
              <button type="button" className="btn btn-lg btn-warning">
                Add new price
              </button>
            </div>
          </div>
        </div>
      </header>

      {/*TABS  */}
      <TabsNabvar />
    </div>
  )
}

export default Apartment
