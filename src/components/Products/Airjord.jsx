import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Correct icon import
import { FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

// BarLoader Component
const BarLoader = () => {
  const variants = {
    initial: {
      scaleY: 0.5,
      opacity: 0,
    },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1,
        ease: "circIn",
      },
    },
  };

  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
    </motion.div>
  );
};

// ProductDetails Component
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://etafqna-api.onrender.com/api/v1/products/${id}`);
        const productData = await response.json();
        if (productData.data) {
          setProduct(productData.data);

          // Fetch related items based on the product's category
          if (productData.data.category) {
            const relatedResponse = await fetch(`https://etafqna-api.onrender.com/api/v1/categories/${productData.data.category}/products`);
            const relatedData = await relatedResponse.json();
            if (relatedData.data) {
              setRelatedItems(relatedData.data);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="grid place-content-center bg-violet-600 px-4 py-24">
        <BarLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 flex">
      <div className="relative w-1/2 h-[1150px] flex flex-col">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="relative">
            {product.imageCover && product.imageCover.url ? (
              <img
                className="w-full h-64 object-cover"
                src={product.imageCover.url}
                alt={product.name}
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center">
                <span>No image available</span>
              </div>
            )}
            <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1">1/10</div>
            <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1">SALE</div>
          </div>
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-green-600 text-lg font-bold">{product.price} L.E <span className="text-gray-600 text-base">Negotiable</span></p>
          </div>
          <div className="px-6">
            <p className="text-gray-700 text-base">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <span className="text-orange-500 mr-1"><FaMapMarkerAlt /></span> 
                <p className="text-gray-700 text-base">{product.location?.address}</p>
              </div>
              <p className="text-gray-700 text-base">02/03/2024</p>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <img
            className="w-10 h-10 rounded-full"
            src={product.owner.profileImage}
            alt={product.owner.name}
          />
          <div className="ml-4">
            <h3 className="text-base font-bold">{product.owner.name}</h3>
            <p className="text-gray-600 text-sm">Member since : Mar 2022</p>
            <a href={`/profile/${product.owner.id}`} className="text-orange-500 flex items-center">
              See Profile <FiChevronRight className="ml-1" />
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Your safety matters to us!</h2>
          <ul className="list-disc list-inside">
            <li>Only meet in public / crowded places for example metro stations and malls.</li>
            <li>Never go alone to meet a buyer / seller, always take someone with you.</li>
            <li>Check and inspect the product properly before purchasing it.</li>
            <li>Never pay anything in advance or transfer money before inspecting the product.</li>
          </ul>
        </div>
      </div>

      <div className="w-1/2 pl-4">
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-2xl font-bold mb-4">Related Items</h2>
          <div className="flex flex-wrap">
            {relatedItems && relatedItems.length > 0 ? relatedItems.map((item) => (
              <div key={item.id} className="w-1/2 p-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img className="w-full h-32 object-cover" src={item.imageCover?.url} alt={item.name} />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <div className="flex items-center mt-2">
                      <img className="w-6 h-6 rounded-full" src={item.owner?.profileImage} alt={item.owner?.name} />
                      <div className="ml-2">
                        <p className="text-sm">{item.owner?.name}</p>
                        <p className="text-xs text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-green-600 text-lg font-bold">{item.price} L.E</p>
                      <p className="text-gray-600 text-sm">{item.location?.address}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button className="bg-orange-500 text-white px-2 py-1 rounded">Chat</button>
                      <button className="bg-orange-500 text-white px-2 py-1 rounded">Call</button>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <p>No related items found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
