import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useBusinessContext } from '../context/BusinessProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardInventory = () => {
  const [products, setProducts] = useState([]);
  const { business, loading } = useBusinessContext();
  const [quantityMap, setQuantityMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [newFile, setNewfile] = useState(null);

  useEffect(() => {
    if (business?.businessId) {
      fetchProducts(business.businessId);
    }
  }, [business]);

  const fetchProducts = async (businessId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/businessRoutes/${businessId}/products`, { withCredentials: true });
      setProducts(response.data.products);
      const initialQuantities = {};
      response.data.products.forEach(product => {
        initialQuantities[product.name] = 0;
      });
      setQuantityMap(initialQuantities);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleStockChange = (e, productName) => {
    const { value } = e.target;
    setQuantityMap((prev) => ({
      ...prev, [productName]: value
    }));
  }

  const updateStock = async (name, quantityChange, businessId) => {
    console.log('businessId:', businessId);
    if (!quantityChange || isNaN(quantityChange)) return;

    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/businessRoutes/${businessId}/products/update`,
        { name, quantityChange }, { withCredentials: true }
      );
      setProducts(response.data.products);
      setQuantityMap((prev) => ({
        ...prev,
        [name]: 0,
      }));
      toast.success(`Stock updated succesfully for ${name}`);
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error(`Error in updating stock : ${name} : ${error}`);
    }
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const addNewProducts = async (e) => {
    e.preventDefault();

    if(!newFile){
      toast.warn('New product sheet not selected!')
      return;
    }
    const formData=new FormData();
    formData.append('products',newFile);

    try{
      console.log("Hi")
      const response = await axios.post(`http://localhost:4000/api/v1/businessRoutes/${business.businessId}/products/add-new`,formData,{withCredentials:"true"});
      console.log("Products updated");
      setProducts(response.data.products);
      toast.success(`New products succesfully added!`);

    }catch(err){
      console.error('Error updating stock:', err);
      toast.error(`Error in adding new products: ${err}`);
    }finally{
      setNewfile(null);
    }


  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewfile(file);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>No business data available</div>;
  }


  return (
    <div>
      <ToastContainer position="bottom-right" />
      <h1 className="text-center mt-2 pb-1 font-sans font-medium">Manage Stock</h1>

      <div className="relative m-4">
        <label htmlFor="Search" className="sr-only"> Search </label>

        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm px-1.5"
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Product Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Update Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.name}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.name}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.quantity}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <div className="relative">
                      <input
                        type="number"
                        id={`quantity-${product.name}`}
                        value={quantityMap[product.name] || 0}
                        onChange={(e) => handleStockChange(e, product.name)}
                        className="w-[150px] p-1 rounded-md border-gray-200 pe-10 shadow-sm sm:text-sm"
                      />
                      <button
                        onClick={() => updateStock(product.name, parseInt(quantityMap[product.name] || 0), business.businessId)}
                        className="px-2 py-1 bg-green-500 text-white mx-1"
                      >
                        +
                      </button>
                      <button
                        onClick={() => updateStock(product.name, -parseInt(quantityMap[product.name] || 0), business.businessId)}
                        className="px-2 py-1 bg-red-500 text-white mx-1"
                      >
                        -
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='relative'>
        <h2 className='font-medium'>Add new products --</h2>

        <form onSubmit={addNewProducts}>
          <span className="text-xs font-medium text-gray-700"> Products </span>
          <p className='text-xs text-red-500 mb-3'>Excel Sheet Guidelines: Name of Product | Quantity </p>
          <div className='flex justify-end ml-auto'>
            <input
              type="file"
              id="Products"
              name="products"
              accept='.xls,.xlsx'
              onChange={handleFileChange}
              required
              className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-right"
            />
          </div>

          <button className='bg-blue-500 mt-2 p-2 rounded-lg text-white hover:bg-green-400'>
            Submit
          </button>
        </form>

      </div>

    </div>


  );
};

export default DashboardInventory;
