import React, { Fragment } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { CgMouse } from "react-icons/cg";

function Home() {
  return (
    <Fragment>
      <Header />
        <div
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 68%, 0% 90%)' }}
          className='h-screen bg-blue-500 text-center flex flex-col justify-center text-gray'
        >
          <p className='text-xl'>Welcome to Ecommerce</p>
          <h1 className='m-5 font-bold text-4xl uppercase'>Find Amazing Products Below</h1>
          <a className='flex justify-center' href="#">
            <button className='h-8 mb-5 cursor-pointer bg-gray-100 rounded-md hover:border-solid hover:border-2 hover:border-gray-500 border-solid bg-white-400 transition w-24 flex items-center justify-center'>
              Scroll <CgMouse />
            </button>
          </a>
        </div>

        <div className='h-screen flex justify-center'>
          <h2 className='mt-0 text-center text-2xl border-b-2 w-60 p-2 text-black underline'>Featured Products</h2>
        </div>
      <Footer />
    </Fragment>
  );
}

export default Home;
