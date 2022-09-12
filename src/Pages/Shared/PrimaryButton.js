import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary" data-aos="zoom-in"
        data-aos-duration="4000">{children}</button>
    );
};

export default PrimaryButton;