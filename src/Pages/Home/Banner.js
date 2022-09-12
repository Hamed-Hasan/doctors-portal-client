import React from 'react';
import chair from '../../assets/images/chair.png';
import PrimaryButton from '../Shared/PrimaryButton';

const Banner = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img  src={chair} className="max-w-sm rounded-lg shadow-2xl" data-aos="zoom-in"
     data-aos-duration="4000" />
                <div>
                    <h1 className="text-5xl font-bold" data-aos="fade-right"
     data-aos-duration="2000">Your New Smile Starts Here</h1>
                    <p className="py-6" data-aos="fade-right"
     data-aos-duration="3000" data-aos-delay="2000">You'll interact with professionals other than the dentist when you get your teeth checked. Be able to communicate with a dental receptionist and dental hygienist—they will be the first people you talk to during your next dentist appointment..</p>
                    <PrimaryButton >Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;