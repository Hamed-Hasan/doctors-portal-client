import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctors = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm()
const {data: services, isLoading} = useQuery('services', () =>  fetch('https://doctors-portal-server-mvc.vercel.app/service').then(res => res.json()));

if(isLoading) {
    return <Loading/>
}

const imageStorageKey = '0a489a5f81e1a77f2b17492e627939c3';
    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
      const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
      fetch(url, {
          method: 'POST',
          body: formData
      })
      .then(res => res.json()) 
      .then(result => {
        if(result.success){
            const img = result.data.url;
            const doctor = {
                name: data.name,
                email: data.email,
                specialty: data.specialty,
                img: img
            }
            // send to database 
            fetch('https://doctors-portal-server-mvc.vercel.app/doctors', {   
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(doctor)
            })
            .then(res => res.json())
            .then(inserted => {
                if(inserted.insertedId){
                    toast.success('Doctor added successfully')
                    reset();
                }
                else{
                    toast.error('Failed to add the doctor');
                }
            })
        }
      })
     
    }

    return (
        <div>
            <h2 className='text-4xl my-4'>All Doctors</h2>

   <div className='container mx-auto'>
   <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 justify-items-center'>

<div className="form-control w-full max-w-xs ">
    <label className="label">
        <span className="label-text">Name</span>
    </label>
    <input
        type="text"
        placeholder="Your Name"
        className="input input-bordered w-full max-w-xs"
        {...register("name", {
            required: {
                value: true,
                message: 'Name is Required'
            }
        })}
    />
    <label className="label">
        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
    </label>
</div>

<div className="form-control w-full max-w-xs">
    <label className="label">
        <span className="label-text">Email</span>
    </label>
    <input
        type="email"
        placeholder="Your Email"
        className="input input-bordered w-full max-w-xs"
        {...register("email", {
            required: {
                value: true,
                message: 'Email is Required'
            },
            pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: 'Provide a valid Email'
            }
        })}
    />
    <label className="label">
        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
    </label>
</div>
<div className="form-control w-full max-w-xs">
    <label className="label">
        <span className="label-text">Specialty</span>
    </label>

    <select {...register('specialty')} class="select input-bordered w-full max-w-xs">
        {
            services.map(service => <option
            key={service._id}
            value={service.name}
            >{service.name}</option>)
        }
        </select>
</div>
<div className="form-control w-full max-w-xs">
    <label  class={
                  
                  "btn btn-primary  mt-5 text-white"
                  
               } for='img'>
        Upload Image
    </label>
    <input
        type="file"
        id='img'
        className="input input-bordered hidden w-full max-w-xs"
        {...register("image", {
            required: {
                value: true,
                message: 'Image is Required'
            }
        })}
    />
   
</div>



<input className='btn my-5 w-full max-w-xs text-white' type="submit" value="Add" />
</form>
   </div>
        </div>
    );
};

export default AddDoctors;