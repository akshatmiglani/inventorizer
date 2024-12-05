import React,{useState} from 'react'

import {motion} from 'framer-motion'

const stepVariants={
    hidden: { }
}
const Onboarding = () => {
  
    const [currentStep,setStep]=useState(1);
    
    const nextStep=()=>{setStep((prev)=>(prev<3?prev+1:prev))};
    const prevStep=()=>{setStep((prev)=>(prev>1?prev-1:prev))};
    return <>

    </>
}

export default Onboarding