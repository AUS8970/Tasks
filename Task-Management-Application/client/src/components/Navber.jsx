import React from 'react';
import useTheme from '../theme/hook/useTheme';
import { Link } from 'react-router-dom';
import useAuth from '../auth/hook/useAuth';
import toast from 'react-hot-toast';

const Navber = () => {

  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
    .then(() => { 
      toast.success("Logout Seccessfull!")
    }) .catch (err => { toast.error(err)})
  }

  return (
    <div className='flex items-center justify-between p-2'>
      <div className="">
        <button onClick={toggleTheme} className={`focus:outline-none m-1 rounded p-2 transition-all duration-300 ${theme === "black" ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-black border border-gray-300 shadow-md"}`}>
          {theme === "black" ? "Dark" : "Light"}
        </button>
      </div>

      <div className="font-lobster">
        { !user ? <div className='flex items-center justify-center text-center'>
          <Link to={'/register'} className={`focus:outline-none m-1 w-20 rounded p-2 transition-all duration-300 ${theme === "black" ? "bg-none text-white border border-white" : "bg-none text-black border border-black shadow-md"}`}> Register </Link>
          <Link to={'/login'} className={`focus:outline-none m-1 w-20 rounded p-2 transition-all duration-300 ${theme === "black" ? "bg-white text-black border border-black" : "bg-black text-white border border-white shadow-md"}`}> Login </Link>
        </div>: <div className='flex items-center justify-center text-center'>
          <button onClick={handleLogOut} className={`focus:outline-none m-1 w-20 rounded p-2 transition-all duration-300 ${theme === "black" ? "bg-white text-black border border-black" : "bg-black text-white border border-white shadow-md"}`}> Log Out </button>
          <img className="cursor-pointer w-10 h-10 rounded-full" src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
        </div>}
      </div>
    </div>
  );
};

export default Navber;