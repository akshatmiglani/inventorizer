import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

export const BusinessContext= createContext();

export const useBusinessContext=()=>{
    return useContext(BusinessContext);
};

const BusinessProvider = ({children}) => {

    const [business,setBusiness] = useState(null);
    const [loadingBusiness,setLoading]= useState(true);

    const fetchBusinessDetails = async()=>{
        try{
            const response= await axios.get("http://localhost:4000/api/v1/businessRoutes/getDetails",{withCredentials:true});
            console.log("Business details fetched:", response.data);
            setBusiness(response.data);
        }catch(err){
            console.log('Error fetching business details',err);
            setBusiness(null);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchBusinessDetails();
    },[]);

    return (
        <BusinessContext.Provider value={{business,setBusiness,loadingBusiness}}>
            {children}
        </BusinessContext.Provider>
    )

}

export default BusinessProvider;