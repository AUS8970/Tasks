import React from 'react';
import useTheme from '../theme/hook/useTheme';
import useAuth from '../auth/hook/useAuth';
import { Link } from 'react-router-dom';

const Navber = () => {

  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div className="m-5">
        <button onClick={toggleTheme} className={`focus:outline-none m-1 rounded p-2 transition-all duration-300 ${theme === "black" ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-black border border-gray-300 shadow-md"}`}>
          {theme === "black" ? "Dark" : "Light"}
        </button>
      </div>

      <div className="font-lobster">
        <Link to={'/register'} className={`focus:outline-none m-1 w-20 rounded p-2 transition-all duration-300 ${theme === "black" ? "bg-none text-white border border-white" : "bg-none text-black border border-black shadow-md"}`}>
          Register
        </Link>

        <Link to={'/login'} className={`focus:outline-none m-1 w-20 rounded p-2 transition-all duration-300 ${theme === "black" ? "bg-white text-black border border-black" : "bg-black text-white border border-white shadow-md"}`}>
          Login
        </Link>
        <img className="cursor-pointer w-10 h-10" src={""} />
      </div>
    </div>
  );
};

export default Navber;