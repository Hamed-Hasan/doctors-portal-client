import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointments = ({ date }) => {
    // const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);

    const formattedDate = format(date, 'PP');

    const { data: services, isLoading, refetch } = useQuery('services', () => fetch(`https://doctors-portal-server-mvc.vercel.app/available?date=${formattedDate}`, {
        method: 'GET',
        // headers: {
        //     authorization: `Bearer ${localStorage.getItem('accessToken')}`
        // }
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
          
    })
        .then(res => res.json()));
        refetch();
        // console.log(services.data)
    // useEffect(() => {
    //     fetch(`https://doctors-portal-server-mvc.vercel.appavailable?date=${formattedDate}`)
    //         .then(res => res.json())
    //         .then(data => setServices(data));
    // }, [])


    return (
        <div className='my-10'>
            <h4 className='text-xl text-secondary text-center my-12'>Available Appointments on {format(date, 'PP')}</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                { services &&
                    services?.data?.map(service => <Service
                        key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    ></Service>)
                }
            </div>
            {treatment && <BookingModal
                date={date}
                treatment={treatment}
                setTreatment={setTreatment}
            ></BookingModal>}
        </div>
    );
};

export default AvailableAppointments;