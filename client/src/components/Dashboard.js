import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Dashboard() {
    // Loading page
    const [isLoading, setIsLoading] = useState(false);
    
    let navigate = useNavigate();

    const authorizeUser = async () => {
        try {
            const response = await fetch('/api/dashboard', {
                method: 'GET',
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                }
            });

            const data = await response.json();

            if (data.error) {
                setIsLoading(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }

            if (data.message) {
                console.log(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const verifyToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwt_decode(token);
                if (decoded) authorizeUser();
            }
        }

        verifyToken();
    }, []);

    if (isLoading) {
        return (
            <div className='xxs:absolute xxs:top-1/2 xxs:left-1/2 xxs:-translate-y-1/2 xxs:-translate-x-1/2 xxs:px-4'>
                <h1 className='xxs:font-bold xxs:text-3xl xxs:text-center'>Login credentials invalid.</h1>
            </div>
        )
    }
    
    return (
        <>
            <div className='xxs:px-4 xxs:mt-14 sm:mt-20 sm:max-w-5xl sm:mx-auto'>
                <div className='xxs:py-2'>
                    <span className='xxs:text-sm'><Link className='xxs:text-blue-500' to='/home'>Home</Link> {'>'} My Dashboard</span>
                </div>
                <h1 className='xxs:text-xl xxs:my-4'>My Dashboard</h1>
                <LegoVipCard />
                <h1 className='xxs:text-xl xxs:mb-4 xxs:mt-6'>Latest Order</h1>
                <div className='xxs:bg-gray-100 xxs:p-6 xxs:py-8 xxs:flex xxs:flex-col xxs:items-center'>
                    <span>You currently have no open orders.</span>
                    <button 
                    onClick={() => navigate('/shop')}
                    className='xxs:p-3 xxs:bg-black xxs:text-white xxs:mt-6 xxs:rounded-md hover:bg-gray-100 hover:text-black sm:w-1/2'>Start Shopping</button>
                </div>
                <h1 className='xxs:text-xl xxs:mb-4 xxs:mt-6'>Personal & Address Details</h1>
                <div className='xxs:bg-gray-100 xxs:p-6 xxs:py-8 xxs:mb-16 xxs:flex xxs:flex-col xxs:items-center'>
                    <span className='xxs:text-sm xxs:text-gray-800'>Update your LEGO Account or Address details</span>
                    <button className='xxs:bg-blue-500 xxs:text-white xxs:p-3 xxs:w-full xxs:rounded-md xxs:mt-4 hover:bg-gray-100 hover:text-black hover:border-1 hover:border-blue-500 sm:w-1/2'>View Account Details</button>
                </div>
            </div>
            <Navbar />
            <Footer />
        </>
    );
}

const LegoVipCard = () => {
    return (
        <div className='xxs:bg-blue-700 xxs:rounded-lg xxs:p-4 xxs:flex xxs:flex-col xxs:items-center'>
            <h2 className='xxs:text-white xxs:text-xl xxs:text-center xxs:px-4'>Get rewarded with LEGO VIP</h2>
            <button className='xxs:bg-white xxs:mt-5 xxs:py-3 xxs:w-full xxs:rounded-md sm:w-1/2'>Join VIP</button>
        </div>
    );
}