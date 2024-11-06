import { useState, useEffect, useContext } from 'react';
import Logo from './logo.svg';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { IoCartOutline } from 'react-icons/io5';
import { Link, useNavigate } from "react-router-dom";
import  UserContext  from '../../../context/UserContext';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from 'axios';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext); // Get user from context
  const navigate = useNavigate();

  const isLoggedIn = !!user; // Check if user is present (logged in)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  useEffect(() => {


  }, []);


  return (
    <nav className="flex justify-between items-center p-2 w-full h-[70px] mt-2 bg-white text-lg">
      <div className="flex-shrink-0 mt-1">
        <a href="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-24 h-auto md:w-32 lg:w-40"
          />
        </a>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <button className="flex items-center space-x-1 px-4 py-2">
          <IoCartOutline size={28} />
          <p className="text-xl">Cart</p>
        </button>

        {user ? (
             <a href="/profile">
            <div className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-normal rounded-lg px-5 py-2.5 cursor-pointer transition duration-300 ease-in-out">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="User Profile" className="w-8 h-8 rounded-full" />
              ) : (
                <HiOutlineUserCircle size={28} />
              )}
              <p>{user.name || 'Profile'}</p>
            </div>
            </a>        ) : (
          <a href="/login">
            <div className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-normal rounded-lg px-5 py-2.5 transition duration-300 ease-in-out cursor-pointer">
              <HiOutlineUserCircle size={28} />
              <p>Login</p>
            </div>
          </a>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-800 hover:text-gray-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
          </svg>
        </button>
      </div>
    </nav>
  );
}
