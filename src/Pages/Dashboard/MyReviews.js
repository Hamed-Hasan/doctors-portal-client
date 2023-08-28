import React from 'react';
import { FaStar } from "react-icons/fa";
const MyReviews = ({ onePersonReview }) => {
  console.log(onePersonReview);
  const { _id, rating, review, email, displayName, photoURL } = onePersonReview;
  return (
    <div class="card  bg-base-100 shadow-xl">
      <figure class="px-10 pt-10">
        <img src={photoURL} alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">{displayName}</h2>
        <p>{email}</p>
          <div className="flex">
            {rating >= 1 ? (
              <FaStar className="text-orange-400" />
            ) : (
              <FaStar className="text-orange-100" />
            )}
            {rating >= 2 ? (
              <FaStar className="text-orange-400" />
            ) : (
              <FaStar className="text-orange-100" />
            )}
            {rating >= 3 ? (
              <FaStar className="text-orange-400" />
            ) : (
              <FaStar className="text-orange-100" />
            )}
            {rating >= 4 ? (
              <FaStar className="text-orange-400" />
            ) : (
              <FaStar className="text-orange-100" />
            )}
            {rating >= 5 ? (
              <FaStar className="text-orange-400" />
            ) : (
              <FaStar className="text-orange-100" />
            )}
          </div>
          <p>{review}</p>
        </div>
      </div>
    );
};

export default MyReviews;