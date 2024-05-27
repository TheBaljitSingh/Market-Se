import { useState } from 'react';
// import './';
import Logo from './logo.svg';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { IoCartOutline } from 'react-icons/io5';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center p-2 w-full h-[70px] mt-2 bg-white text-lg">
      <div className="flex-shrink-0 mt-1">
        <a href="#">
          <img
            src={Logo}
            alt="Logo"
            className="w-24 h-auto md:w-32 lg:w-40"
          />
        </a>
      </div>

      <div className="hidden md:flex w-full max-w-xl items-center mx-4">
        <form className="w-full">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-base text-gray-800 border border-gray-300 rounded-lg bg-blue-100 focus:outline-none" placeholder="Search Laptop, Smartphones..." required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
          </div>
        </form>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <button className="flex items-center space-x-1 px-4 py-2">
          <IoCartOutline size={28} />
          <p className="text-xl">Cart</p>
        </button>

        <button id="dropdownInformationButton" className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-normal rounded-lg px-5 py-2.5" type="button">
          <HiOutlineUserCircle size={28} />
          <p>Login</p>
          <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
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
