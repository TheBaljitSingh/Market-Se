import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProductListing from '../../ProductListings';



export default function Home() {
  return (
    <>
    <Header/>
    <div>
    <ProductListing/>

    </div>
    <Footer/>
    </>
  )
}
