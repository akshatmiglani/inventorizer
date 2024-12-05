import React, { useState } from 'react'
import { motion } from 'framer-motion'
import one from '/one.png'
import two from '/two.png'
import three from '/three.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const imgIconStyle = "h-6 w-6";
const Onboarding = () => {

    const [currentStep, setStep] = useState(1);

    const [formData,setFormData]=useState({
        businessName:'',
        logo:null,
        email:'',
        address:'',
        gstNumber:'',
        password:'',
        products:null
    });

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    }

    const handleFileChange=(e)=>{
        setFormData({...formData,logo:e.target.files[0]});
    }

    const nextStep = () => {
        if (currentStep < 3) {
            setStep((prev) => prev + 1);
        } else {
            submitForm(); 
        }
    };

    const prevStep = () => { setStep((prev) => (prev > 1 ? prev - 1 : prev)) };

    const stepImages = {
        1: one,
        2: two,
        3: three,
    };


    const submitForm=async()=>{
        const formDataForSubmission=new FormData();
        
    }
    return <>
        <div className='flex flex-col items-center justify-center h-screen bg-gray-50 rounded-lg border-solid border-2'>
            <ToastContainer position="bottom-right" />
            <motion.div
                className='w-full max-w-2xl border-solid border-2 border-black p-8 rounded-lg shadow-lg '
                initial="hidden"
                animate="visible"
                variants={stepVariants}
            >
                <h2 className='text-3xl font-semibold text-center mb-6 flex justify-center items-center'>
                    <img className={imgIconStyle} src={stepImages[currentStep]} alt={`Step ${currentStep} Image`} /> <span className='p-3 text-xl'>of</span>  <img className={imgIconStyle} src={three} alt='Three Image' />
                </h2>

                {currentStep == 1 && (
                    <div>
                        <h3 className='text-center text-xl font-medium pb-5'>Business Details</h3>
                        <form>

                            <div className='mb-6'>
                                <label
                                    htmlFor="Business Name"
                                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black"
                                >
                                    <span className="text-xs font-medium text-gray-700"> Business Name </span>

                                    <input
                                        type="text"
                                        id="Business Name"
                                        value={formData.businessName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your business name:"
                                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    />
                                </label>
                            </div>
                            <div className='mb-6'>
                                <label
                                    htmlFor="Business Logo"
                                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black"
                                >
                                    <span className="text-xs font-medium text-gray-700"> Logo </span>

                                    <input
                                        type="file"
                                        id="Logo"
                                        placeholder="Upload logo"
                                        accept='.jpg,.jpeg,.png'
                                        onChange={handleFileChange}
                                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    />
                                </label>
                            </div>
                        </form>
                    </div>


                )}

                {currentStep == 2 && (
                    <div>
                        <h3 className='text-center text-xl font-medium pb-5'>Contact/Login Details</h3>
                        <form>
                            <div className='mb-4'>
                                <label
                                    htmlFor="Email"
                                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black"
                                >
                                    <span className="text-xs font-medium text-gray-700"> Email </span>

                                    <input
                                        type="email"
                                        id="Number"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your business email"
                                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    />
                                </label>
                            </div>

                            <div className='mb-6'>
                                <label
                                    htmlFor="password"
                                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black"
                                >
                                    <span className="text-xs font-medium text-gray-700"> Password </span>

                                    <input
                                        type="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    />
                                </label>
                            </div>

                            <div className='mb-6'>
                                <label
                                    htmlFor="GST Number"
                                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black"
                                >
                                    <span className="text-xs font-medium text-gray-700"> GST Number </span>

                                    <input
                                        type="text"
                                        id="GSTNum"
                                        value={formData.gstNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter your GST Number:"
                                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    />
                                </label>
                            </div>

                            <div className='mb-6'>
                                <label
                                    htmlFor="Address"
                                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black"
                                >
                                    <span className="text-xs font-medium text-gray-700"> Registered Business Address </span>

                                    <input
                                        type="text"
                                        id="Address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter your business addresss"
                                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    />
                                </label>
                            </div>
                        </form>
                    </div>


                )}

                {currentStep == 3 && (
                    <div>
                        <h3 className='text-center text-xl font-medium pb-5'>Import Products</h3>
                        <form>
                            <label
                                htmlFor="Products"
                                className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black"
                            >
                                <span className="text-xs font-medium text-gray-700"> Products </span>
                                <p className='text-xs text-red-500 mb-3'>Excel Sheet Guidelines: Name of Product | Quantity </p>
                                <input
                                    type="file"
                                    id="Products"
                                    accept='.xslx,.xls'
                                    onChange={handleFileChange}
                                    placeholder="Upload excel sheet of products (column name guidelines: Name of Product | Quantity )"
                                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                />
                            </label>
                        </form>
                    </div>


                )}

                <div className='flex justify-end mt-6'>
                    {currentStep > 1 && (
                        <button onClick={prevStep} className='bg-gray-300 px-5 m-2 py-2 rounded-lg text-white hover:bg-gray-400'>Back</button>
                    )}
                    <button onClick={nextStep} className='bg-green-500 px-5 m-2 py-2 rounded-lg text-white hover:bg-green-400'>{currentStep === 3 ? 'Submit' : 'Next'}</button>

                </div>

            </motion.div>
        </div>

    </>
}

export default Onboarding

