import React from 'react'
import profilePic from '../../../images/Profile.png'
import FiveStarRating from '../startRating/Star-rating';
const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 5,
    value: 4,
    isHalf: true,
  };

const ReviewCard = (review) => {
    console.log("review",review)
  return (
    <div className='reviewCard'>
      <img src={profilePic} alt="" />
      <p>{review.review.name}</p>
      <FiveStarRating count={review.review.rating} />
      <span>{ review.review.comment }</span>
    </div>
  )
}

export default ReviewCard
