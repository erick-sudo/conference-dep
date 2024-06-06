import React, { useState } from 'react';
import Swal from "sweetalert2";
import { AuthContext } from './AuthContext';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const { backendUrl } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
      });
      const data = await response.json();
      if (response.ok) {
        // show success toast notification
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Password reset successful!',
        });
      } else {
        // show error toast notification
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };;
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full lg:max-w-lg p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <label className="block mb-4">
            <span className="text-gray-700">New password:</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Token:</span>
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
          </label>
          <button type="submit" className="w-full bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 focus:outline-none focus:bg-green-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
