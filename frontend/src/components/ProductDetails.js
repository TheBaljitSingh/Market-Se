import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductListing from './ProductListings';
import Home from './layout/Home/Home';
import Header from './layout/Header/Header';
import Carousel from "../components/Carousel"
import axios from 'axios';



const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER}/api/v1/product/${id}`)
    .then(res=>{
      setProduct(res.data.product);
      console.log(res.data.product);
    })
    .catch(e=>{
      console.log("error wile fetching product with id", e);
    })


  }, [])

 

  if (!product) {
    return <h2 className="text-2xl font-bold text-center py-8">Product not found</h2>;
  }

  return (
    <>
    <Header/>
      <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className='flex flex-col justify-center items-center'>
        {product.images.length > 0 &&
                   <Carousel items={product.images} />
               
        } 
        
        
        </div>

             
        <div>
          
          <h1 className="text-5xl font-bold mb-6 text-gray-800">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-4">${product.price?.toFixed(2)}</p>
          <p className="text-lg text-gray-600 mb-8">{product.description}</p>
          <div className="flex gap-4">
            <Link to="/">
              <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                Back to Products
              </button>
            </Link>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300">
              Buy Now
            </button>
          </div> 

        
        </div>

      </div>
    </div>
            </>
  );
};

export default ProductDetails;
