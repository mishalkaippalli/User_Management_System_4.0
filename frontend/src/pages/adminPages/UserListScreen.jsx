import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUsers,
  deleteUser,
  createUser,
  reset,
} from '../../features/admin/adminSlice';
import SearchBox from '../../components/SearchBox';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const { users = [], isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getUsers(searchTerm));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, searchTerm]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const createHandler = () => {
    if (window.confirm('Create a new sample user?')) {
      const email = `sample${Date.now()}@example.com`;
      dispatch(
        createUser({
          name: 'Sample User',
          email,
          password: 'SamplePassword123',
          role: 'user',
        })
      ).then(() => {
        dispatch(getUsers(searchTerm));
      });
    }
  };

  const searchHandler = (keyword) => {
    setSearchTerm(keyword);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header Section */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="mx-auto w-full max-w-7xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h4 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Users List
          </h4>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="w-full sm:w-72">
              <SearchBox onSearch={searchHandler} />
            </div>
            <button
              onClick={createHandler}
              className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-sm transition duration-200 whitespace-nowrap"
              disabled={isLoading}
            >
              <FaPlus /> Create User
            </button>
          </div>
        </div>
      </header>

      {/* Main Table Section */}
      <main className="flex-grow overflow-hidden">
        <div className="mx-auto w-full max-w-7xl h-full flex flex-col px-6 py-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 flex-grow flex flex-col overflow-hidden">
            {isLoading ? (
              <div className="flex-grow flex items-center justify-center text-gray-500">
                Loading...
              </div>
            ) : isError ? (
              <div className="flex-grow flex items-center justify-center text-red-500">
                {message}
              </div>
            ) : users.length === 0 ? (
              <div className="flex-grow flex items-center justify-center text-gray-500">
                No users found.
              </div>
            ) : (
              <div className="overflow-auto flex-grow">
                <table className="min-w-full border-collapse text-sm text-gray-700">
                  <thead className="bg-gray-100 text-gray-600 text-xs uppercase sticky top-0 z-30">
                    <tr>
                      <th className="px-8 py-4 text-center font-semibold w-[25%]">
                        ID
                      </th>
                      <th className="px-8 py-4 text-center font-semibold w-[25%]">
                        Name
                      </th>
                      <th className="px-8 py-4 text-center font-semibold w-[35%]">
                        Email
                      </th>
                      <th className="px-8 py-4 text-center font-semibold w-[15%]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } hover:bg-gray-100`}
                      >
                        <td className="px-8 py-4 font-mono text-gray-800 truncate max-w-[150px] text-center">
                          {user._id}
                        </td>
                        <td className="px-8 py-4 font-medium text-gray-900 text-center">
                          {user.name}
                        </td>
                        <td className="px-8 py-4 text-gray-700 truncate max-w-[250px] text-center">
                          {user.email}
                        </td>
                        <td className="px-8 py-4 text-center">
                          <div className="flex justify-center gap-4">
                            <Link
                              to={`/admin/user/${user._id}/edit`}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => deleteHandler(user._id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              disabled={isLoading}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserListScreen;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaEdit, FaTrash, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   getUsers,
//   deleteUser,
//   createUser,
//   reset,
// } from '../../features/admin/adminSlice';
// import SearchBox from '../../components/SearchBox';

// const UserListScreen = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState('');

//   const { users = [], isLoading, isError, message } = useSelector(
//     (state) => state.admin
//   );

//   useEffect(() => {
//     dispatch(getUsers(searchTerm));
//     return () => {
//       dispatch(reset());
//     };
//   }, [dispatch, searchTerm]);

//   const deleteHandler = (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       dispatch(deleteUser(id));
//     }
//   };

//   const createHandler = () => {
//     if (window.confirm('Create a new sample user?')) {
//       const email = `sample${Date.now()}@example.com`;
//       dispatch(
//         createUser({
//           name: 'Sample User',
//           email,
//           password: 'SamplePassword123',
//           role: 'user',
//         })
//       ).then(() => {
//         dispatch(getUsers(searchTerm));
//       });
//     }
//   };

//   const searchHandler = (keyword) => {
//     setSearchTerm(keyword);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header Section */}
//       <div className="sticky top-0 z-40 bg-white shadow-md">
//         <div className="mx-auto w-full max-w-7xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <h4 className="text-2xl md:text-3xl font-semibold text-gray-800">
//             Users List
//           </h4>

//           <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
//             <div className="w-full sm:w-72">
//               <SearchBox onSearch={searchHandler} />
//             </div>
//             <button
//               onClick={createHandler}
//               className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-sm transition duration-200 whitespace-nowrap"
//               disabled={isLoading}
//             >
//               <FaPlus /> Create User
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Table Section */}
//       <div className="flex-grow mx-auto w-full max-w-7xl px-6 py-8">
//         <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
//           {isLoading ? (
//             <div className="p-8 text-center text-gray-500">Loading...</div>
//           ) : isError ? (
//             <div className="p-8 text-center text-red-500">{message}</div>
//           ) : users.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">No users found.</div>
//           ) : (
//             <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
//               <table className="min-w-full border-collapse text-sm text-gray-700">
//                 {/* Table Head */}
//                 <thead className="bg-gray-100 text-gray-600 text-xs uppercase sticky top-0 z-30">
//                   <tr>
//                     <th className="px-8 py-4 text-center font-semibold">ID</th>
//                     <th className="px-8 py-4 text-center font-semibold">Name</th>
//                     <th className="px-8 py-4 text-center font-semibold">Email</th>
//                     {/* <th className="px-8 py-4 text-center font-semibold">
//                       Admin
//                     </th> */}
//                     <th className="px-8 py-4 text-center font-semibold">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 {/* Table Body */}
//                 <tbody className="divide-y divide-gray-200">
//                   {users.map((user, index) => (
//                     <tr
//                       key={user._id}
//                       className={`transition-colors ${
//                         index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
//                       } hover:bg-gray-100`}
//                     >
//                       <td className="px-8 py-4 font-mono text-gray-800 truncate max-w-[200px]">
//                         {user._id}
//                       </td>
//                       <td className="px-8 py-4 font-medium text-gray-900">
//                         {user.name}
//                       </td>
//                       <td className="px-8 py-4 text-gray-700 truncate max-w-[300px]">
//                         {user.email}
//                       </td>
//                       {/* <td className="px-8 py-4 text-center">
//                         {user.role === 'admin' ? (
//                           <FaCheck className="text-green-500 inline-block" />
//                         ) : (
//                           <FaTimes className="text-red-500 inline-block" />
//                         )}
//                       </td> */}
//                       <td className="px-8 py-4 text-center">
//                         <div className="flex justify-center gap-4">
//                           <Link
//                             to={`/admin/user/${user._id}/edit`}
//                             className="text-blue-600 hover:text-blue-800 transition-colors"
//                           >
//                             <FaEdit />
//                           </Link>
//                           <button
//                             onClick={() => deleteHandler(user._id)}
//                             className="text-red-600 hover:text-red-800 transition-colors"
//                             disabled={isLoading}
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserListScreen;
