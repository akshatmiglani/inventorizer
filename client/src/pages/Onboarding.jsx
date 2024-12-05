import React, { useState } from 'react'

import { motion } from 'framer-motion'
import one from '/one.png'
import two from '/two.png'
import three from '/three.png'
const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const imgIconStyle = "h-6 w-6";
const Onboarding = () => {

    const [currentStep, setStep] = useState(1);

    const nextStep = () => { setStep((prev) => (prev < 3 ? prev + 1 : prev)) };
    const prevStep = () => { setStep((prev) => (prev > 1 ? prev - 1 : prev)) };

    const stepImages = {
        1: one,
        2: two,
        3: three,
      };
    
    return <>
        <div className='flex flex-col items-center justify-center h-screen bg-gray-50 rounded-lg border-solid border-2'>
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
                                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                />
                            </label>
                        </div>
                        </form>
                    </div>


                )}

                {currentStep == 2 && (
                    <div>
                        <h3 className='text-center text-xl font-medium pb-5'>Contact Details</h3>
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
                                    placeholder="Enter your business email"
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
                                    placeholder="Upload excel sheet of products (column name guidelines: Name of Product | Quantity )"
                                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                />
                            </label>
                        </form>
                    </div>


                )}

                <div className='flex justify-betweeen mt-6'>
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

