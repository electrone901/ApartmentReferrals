import React from 'react'
import './Reviews.css'

function Reviews() {
  return (
    <div>
      Reviews
      <div className="card p-2 text-start">
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
            We recently bought a NYC apartment - our first time purchasing - and
            we couldn't be more grateful to have had Grant as our broker. He
            provided invaluable advice and insight at every…” more Responds in
            about 2 hours 89 locals recently contacted this agent 76 Verified
            LicenseReal Estate Agents “Efficient” - according to 2 users “My
            husband and I had the pleasure of working with Grant when planning
            our move from CA to NYC for this summer. Grant was gracious enough
            to take his time and show us several…” more Responds in about 2
            hours 89 locals recently contacted this agent
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
