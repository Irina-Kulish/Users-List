import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store/store';
import { Layout } from '../Layout/Layout';
import { SearchFilter } from './SearchFilter';
import { Loading } from '../Loading/Loading';
import { ErrorComponent } from '../ErrorComponent/Error';

export const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handlePostsClick = (userId: number) => {
    navigate(`/posts/${userId}`);
  };

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };

  const handleReset = () => {
    setSearchTerm('');
    setSortOrder('asc');
  };

  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <Layout>
      <div className='flex flex-row gap-5 flex-grow'>
        <SearchFilter
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onReset={handleReset}
        />

        <div className="flex flex-wrap justify-center gap-4 flex-grow">
          {filteredUsers.length === 0 ? (
            <div className="text-center text-black p-2">
              No users found
            </div>
          ) : (
            <table className="table max-w-screen-lg">
              <thead>
                <tr className='text-black font-bold text-base leading-relaxed'>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-black">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className='text-black'>
                      {user.email}
                    </td>
                    <td className='text-black'>
                      {user.phone}
                    </td>
                    <td className="text-right flex justify-start">
                      <button
                        className="btn btn-sm border-gray-300 hover:bg-gray-500 bg-slate-600"
                        onClick={() => handlePostsClick(user.id)}
                      >
                        Posts
                      </button>
                      <button
                        className="btn btn-sm border-gray-300 hover:bg-gray-500 ml-10 bg-slate-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};
