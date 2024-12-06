import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useBusinessContext } from '../context/BusinessProvider';

const DashboardInventory = () => {
  const [products, setProducts] = useState([]);
  const { business, loading } = useBusinessContext();

  useEffect(() => {
    if (business?.businessId) {
      fetchProducts(business.businessId);
    }
  }, [business]);

  const fetchProducts = async (businessId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/businessRoutes/${businessId}/products`,{withCredentials:true});
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const updateStock = async (name, quantityChange,businessId) => {
    console.log('businessId:', businessId);
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/businessRoutes/${businessId}/products/update`,
        { name, quantityChange } ,{withCredentials:true}
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

    
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>No business data available</div>;
  }


  return (
    <div>
      <h1 className="text-center mt-2 pb-1 font-sans font-medium">Manage Stock</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Product Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.name}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.name}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.quantity}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <button
                    onClick={() => updateStock(product.name, 1,business.businessId)}
                    className="px-2 py-1 bg-green-500 text-white"
                  >
                    +
                  </button>
                  <button
                    onClick={() => updateStock(product.name, -1,business.businessId)}
                    className="px-2 py-1 bg-red-500 text-white"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardInventory;
