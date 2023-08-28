import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';

const Users = () => {
  const { data: users, isLoading, refetch } = useQuery(
    'users',
    async () => {
        const response = await fetch('https://doctors-portal-server-mvc.vercel.app/user', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        const responseData = await response.json();
        return Array.isArray(responseData) ? responseData : []; // Handle non-array responses
    }
);
console.log(users)
if (isLoading) {
    return <Loading />;
}

if (!Array.isArray(users)) {
    return <p>Users data is not in the expected format.</p>;
}
    return (
        <>
                <h2 className="text-2xl">All Users: {users?.length}</h2>
        <div class="overflow-x-auto">
        <table class="table w-full">
         
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
           
          {
              users?.map((user, index) => <UserRow
              key={user._id}
              user={user}
              refetch={refetch}
              index={index}
              />)
          }
       
          </tbody>
        </table>
      </div>
        </>
    );
};

export default Users;