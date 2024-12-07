import React, { useEffect, useState } from 'react'
import { useBusinessContext } from '../context/BusinessProvider';
import axios from 'axios';

const DashboardHistory = () => {

  const [invoices, setInvoices] = useState([]);
  const { business, loading } = useBusinessContext();

  useEffect(() => {
    if (business?.businessId) {
      fetchInvoices(business.businessId);
    }
  }, [business]);

  const fetchInvoices = async (businessId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/invoiceRoutes/${businessId}/invoices`, { withCredentials: true });
      
      setInvoices(response.data);
      console.log(invoices);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleViewPDF = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };


  if (loading) { return <div>Loading....</div> }

  if (!business) { return <div>Business Details Not Found....</div> }


  return (
    <div>
      <h1 className="text-center m-5 pb-5 font-sans font-medium">View Invoices</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Customer Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total Amount</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200 text-center">
            {invoices.map((invoice)=>{
              return (
              <tr key='invoice._id'>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{invoice.customer.name}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{invoice.totalamount}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <button className="inline-block rounded border border-white bg-red-600 px-12 py-3 text-sm font-medium text-white " onClick={()=>handleViewPDF(invoice.pdfInvoice)}>
                    View PDF
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardHistory