import React, { useEffect, useState } from 'react';
import MyReviews from './MyReviews';

const MyReview = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://aqueous-savannah-97550.herokuapp.com/showReview')
        .then(res => res.json())
        .then(data => setReviews(data))
    }, []);
    return (
        <div className='container mx-auto px-10'>
            <h2 className='text-5xl text-center text-primary'>My Review {reviews.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
{
    reviews.map((review) => <MyReviews
    key={review._id}
    onePersonReview={review}
    />)
}
            </div>
        </div>
    );
};

export default MyReview;