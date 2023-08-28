import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

import DeleteConfirmModal from './DeleteConfirmModal';
import DoctorRow from './DoctorRow';

const ManageDoctor = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const { data: doctors, isLoading, error, refetch } = useQuery(
        'doctors',
        async () => {
            const response = await fetch('https://doctors-portal-server-mvc.vercel.app/doctors', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const responseData = await response.json();
            
            if (!Array.isArray(responseData.data)) {
                console.error('Doctors data is not in the expected format:', responseData.data);
                return []; // Return an empty array to avoid the error
            }
            
            return responseData.data; // Return the array directly from the data property
        }
    );
    

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        return <p>Error fetching doctors data: {error.message}</p>;
    }
    return (
        <div>
            <h2 className="text-2xl">Manage Doctors: {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor, index) => (
                            <DoctorRow
                                key={doctor._key}
                                doctor={doctor}
                                index={index}
                                refetch={refetch}
                                setDeletingDoctor={setDeletingDoctor}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {deletingDoctor && (
                <DeleteConfirmModal
                    deletingDoctor={deletingDoctor}
                    refetch={refetch}
                    setDeletingDoctor={setDeletingDoctor}
                />
            )}
        </div>
    );
};

export default ManageDoctor;
