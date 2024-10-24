import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ProductListing() {
  // const products = [
  //   { id: 1, name: "Elegant Watch", price: 199.99, image: "https://media.istockphoto.com/id/1257455876/photo/duffel-bag-travel-case-leather-holdall-valise-fashion-modern.jpg?s=2048x2048&w=is&k=20&c=NkG_Te02ika_YDJ0EotB0yaTiDNinVAxmuZZUIr48uc=" },
  //   { id: 2, name: "Leather Bag", price: 89.99, image: "/placeholder.svg?height=200&width=200" },
  //   { id: 3, name: "Wireless Earbuds", price: 129.99, image: "/placeholder.svg?height=200&width=200" },
  //   { id: 4, name: "Sunglasses", price: 59.99, image: "/placeholder.svg?height=200&width=200" },
  //   { id: 5, name: "Running Shoes", price: 79.99, image: "/placeholder.svg?height=200&width=200" },
  //   { id: 6, name: "Smart Speaker", price: 149.99, image: "/placeholder.svg?height=200&width=200" },
  // ];

  const [products, setProducts] = useState([]);


  useEffect(()=>{

    axios.get(`${process.env.REACT_APP_SERVER}/api/v1/products`)

    .then(res=>{
      console.log(res.data.products);
      setProducts(res.data.products);
    })
    .catch(error=>{
      console.error("Error while fetching the product", error);
    })

  },[])

  return (
<div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800">Welcome to Market</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`} className="block">
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-64 mx-auto h-64 object-cover"
              />
              <div>
                
              </div>

              <div className="p-6 flex flex-col justify-between h-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-lg text-gray-500 mb-4">₹{product.price.toFixed(0)}</p>
                <button className="w-full bg-blue-600 text-white text-lg py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
