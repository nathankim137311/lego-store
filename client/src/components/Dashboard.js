import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export default function Dashboard() {
    const [loggedIn, setLoggedIn] = useState(false);

    const populateDashboard = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/dashboard', {
                method: 'GET',
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Accept': 'application/json'
                },
            });

        } catch (error) {   
            console.log(error);
        }
    }

    useEffect(() => {
        const verifyToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwt_decode(token);
                if (decodedToken) {
                    setLoggedIn(true); 
                    populateDashboard();
                } 
            }
        }

        verifyToken();
    }, []);

    if (!loggedIn) {
        return (
            <div>
                <h1>Not Authorized</h1>
            </div>
        )
    }

  return (
    <div>
        <h1>Welcome Back!</h1>
    </div>
  );
}
