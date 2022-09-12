import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({user, refetch, index}) => {
    const {email, role, name} = user;
    const makeAdmin = () => {
        fetch(`https://doctors-portal-server-rosy.vercel.app/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if(res.status === 403){
                    toast.error('Failed to Make an admin');
                }
                return res.json()})
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully made an admin`);
                }

            })
    }
    const handleRemove = () => {
        fetch(`https://doctors-portal-server-rosy.vercel.app/user/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success(`User: ${name} is deleted.`)
               
                    refetch();
                }
            })
    }
    return (
    
              <tr>
              <th>{index + 1}</th>
              <td>{email}</td>
              <td>{ role !== 'admin' && <button onClick={makeAdmin} class="btn btn-xs">Make Admin</button>}</td>
              <td><button onClick={() => handleRemove()} class="btn btn-xs">Remove Users</button></td>
            </tr>
        
    );
};

export default UserRow;