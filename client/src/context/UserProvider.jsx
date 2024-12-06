import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/userRoutes/me', {
                withCredentials: true,
            });
            setUser(response.data);

        } catch (err) {
            console.error('Error fetching user details:', err);
            setUser(null);
        } finally {
            setLoading(false);
        }


    }

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {
            fetchUser();  
        } else {
            setLoading(false);  
        }
    }, []); 

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );

}

export default UserProvider