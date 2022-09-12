import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';


const colors = {
    orange: '#FFBA5A',
    gray: '#a9a9a9'
}
const AddReviews = () => {
    const [user, loading] = useAuthState(auth);
    const {register, handleSubmit} = useForm();
    const [rating, setRating] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0);

    const handleClick = (value) => {
        setRating(value)
    }
    const handleOver = (newValue) => {
        setHoverValue(newValue)
    }
    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    if(loading){
        return <Loading/>
    }
    const onSubmit = (data) => {
        const email = user.email;
        const photoURL = user.photoURL;
        const displayName = user.displayName;
        const review = {...data, rating, email, photoURL, displayName}
        console.log(review);

        // add review to database
        fetch("https://doctors-portal-server-rosy.vercel.app/addReview", {
            method: 'POST',
            headers: {
                "content-type" : "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
        .then(res => {
            console.log('my res', res);
            return res.json()
        })
        .then(data => {
            if(data.result === 'data receive'){
                toast.success('Review Added', {theme: 'dark'})
            }else{
                toast.error('Failed to Review')
            }
            console.log('my data',data)
        })
    }
    return (
        <div className="w-full p-10 lg:w-1/2 mx-auto">
            <form className="card-body pb-0" onSubmit={handleSubmit(onSubmit)}>
                <div className='avatar mx-auto flex-col items-center gap-3'>
                <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                <img src={user?.photoURL} alt={user?.displayName} />
                </div>
                </div>
                <h2 className='text-2xl font-bold'>{user?.displayName}</h2>
                <div className='flex flex-row justify-center'>
                {
                    stars.map((_, index) => {
                        return(
                            <FaStar 
                            key={index}
                            size={24}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            color={
                                (hoverValue || rating) > index ? colors.orange : colors.gray
                            }
                            style={{
                                marginRight: 10,
                                cursor: "pointer",
                            }}
                            />
                        )
                    })
                }
                </div>
                <textarea 
               {...register("review", { required: false, maxLength: 500 })}
               className="textarea textarea-primary h-40 my-3 w-full"
               placeholder="Your Reviews"
                >
                </textarea>
                <input type="submit" className="btn btn-primary" value="Add Review"/>
            </form>
           
        </div>
    );
};

export default AddReviews;