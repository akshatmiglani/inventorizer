import React, { useEffect, useState } from 'react'
import { useBusinessContext } from '../context/BusinessProvider';
import axios from 'axios';

const DashboardInvoice = () => {

  const [customer, setCustomer] = useState({ name: '', email: '', phonenumber: '' });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const { business, loading } = useBusinessContext();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (business?.businessId) {
      fetchProducts(business.businessId);
    }
  }, [business]);

  const fetchProducts = async (businessId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/businessRoutes/${businessId}/products`, { withCredentials: true });
      const fetchedProducts = Array.isArray(response.data.products) ? response.data.products : [];
      setProducts(fetchedProducts);
      console.log(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if(!customer.name || !customer.email || !customer.phonenumber){
      alert(' Provide complete customer details.');
      return;
    }

    if(selectedProducts.length === 0){
      alert('Products zero');
      return;
    }

    try {
      const invoiceData={
        customer,
        products: selectedProducts,
        totalAmount
      };
      console.log(invoiceData);

      const response = await axios.post(`http://localhost:4000/api/v1/invoiceRoutes/${business.businessId}/new`, invoiceData, {withCredentials: true});

      if(response.status === 200){
        setCustomer({ name: '', email: '', phonenumber: '' });
        setSelectedProducts([]);
        setTotalAmount(0);
        alert('Invoice created succesfully!');
        return; 
      }

    } catch (error) {
      console.log('Error creating invoice',error);
      alert('Error creating invoice. Please try again!');
      return;
    }
  };

  const onProductChange = (productName, field, value) => {
    setSelectedProducts((prev) => {
      const existingProduct = prev.find((p) => p.name === productName); 
      let updatedProducts;
  
      if (existingProduct) {
        updatedProducts = prev.map((p) => 
          p.name === productName
            ? { ...p, [field]: value, total: (field === "quantity" ? value : p.quantity) * (field === "price" ? value : p.price || 0) }
            : p
        );
      } else {
        const product = products.find((p) => p.name === productName);
        updatedProducts = [
          ...prev,
          { name: product.name, quantity: 1, price: 0, total: 0 },
        ];
      }
  
      const newTotal = updatedProducts.reduce((sum, p) => sum + (p.total || 0), 0);
      setTotalAmount(newTotal);
  
      return updatedProducts;
    });
  };
  

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));


  if (loading) { return <div>Loading....</div> }

  if (!business) { return <div>Business Details Not Found....</div> }
  return (
    <>
      <h1 className="text-center mt-2 pb-1 font-sans font-medium">Create new Invoice</h1>
      <div className='m-5 border border-gray'></div>

      <form onSubmit={handleSubmit}>

        <div>
          <h2 className='text-center mt-2 pb-1 font-sans'> Customer Details</h2>

          <div className='flex flex-row items-center justify-around'>
            <div className='m-5 px-2'>
              <label htmlFor="customerName" className="block text-xs font-medium text-gray-700"> Name </label>

              <input
                type="text"
                id="customername"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="John"
                className="mt-1 w-full rounded-md p-2 border-gray-200 shadow-sm sm:text-sm"
              />
            </div>

            <div className='m-5 px-2'>
              <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-700"> Phone Number </label>

              <input
                type="number"
                id="phonenumber"
                value={customer.phonenumber}
                onChange={(e) => setCustomer({ ...customer, phonenumber: e.target.value })}
                placeholder="+91 "
                className="mt-1 w-full rounded-md p-2 border-gray-200 shadow-sm sm:text-sm"
              />
            </div>

            <div className='m-5 px-2'>
              <label htmlFor="customeremail" className="block text-xs font-medium text-gray-700"> Email </label>

              <input
                type="email"
                id="UserEmail"
                placeholder="john@rhcp.com"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="mt-1 w-full rounded-md p-2 border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className='m-5 border border-black'></div>

        <div>
          <h2 className='text-center mt-2 pb-1 font-sans'> Select Products </h2>

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
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Available Quantity</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Select Quantity</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.name}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.name}</td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.quantity}</td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          <input
                            type="number"
                            min="1"
                            placeholder='Qty'
                            onChange={(e) => onProductChange(product.name, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-25 border p-1 mx-2 rounded-md border-black pe-10 shadow-sm sm:text-sm"
                          />
                      </td>
                      <td>
                        
                      <input
                            type="number"
                            placeholder='Price'
                            onChange={(e) => onProductChange(product.name, 'price', parseFloat(e.target.value) || 0)}
                            className="w-25 border p-1 rounded-md border-black pe-10 shadow-sm sm:text-sm"
                          />
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

        </div>

        <div className='m-5 border border-black'></div>

        <div className="text-right mr-10">
          <h3 className="text-lg font-bold">Total Amount: ${totalAmount.toFixed(2)}</h3>
          <button
            type="submit"
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-black"
          >
            Create Invoice
          </button>
        </div>

      </form>

    </>
  )
}

export default DashboardInvoice