import React, { useState } from 'react';
import { PrivacyCookies } from './Register';
import legoLogo from '../png/Lego-logo.png';
import boxerMinifig from '../png/boxerMinifig.png';
import { XIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { BsFacebook, BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
    const [email, setEmail] = useState(null); 
    const [password, setPassword] = useState(null);

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const user = {
                email,
                password,
            }

            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(user),
            });
            
            const data = await response.json(); 
            console.log(data.status);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <AccountHeader />
            <div className='xxs:bg-gray-100 xxs:px-4 xxs:pt-8 xxs:pb-4'>
                <img src={boxerMinifig} alt="Minifigure surfing" />
                <form className='xxs:mt-4 xxs:flex xxs:flex-col xxs:items-center' onSubmit={loginUser}>
                    <label className='xxs:text-sm xxs:mt-4 xxs:mb-2 block xxs:font-light xxs:w-full' htmlFor="email">Email address</label>
                    <input 
                        className='input-field'
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='example@domain.com' 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className='xxs:text-sm xxs:mt-4 xxs:mb-2 block xxs:font-light xxs:w-full' htmlFor="password">Password</label>
                    <input 
                        className='input-field'
                        type='password' 
                        id='password' 
                        name='password' 
                        placeholder='********' 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='confirm-btn xxs:bg-blue-500 xxs:text-white' >Log in</button>
                </form>
                <div className='xxs:flex xxs:flex-col xxs:items-center'>
                    <span className='xxs:text-sm xxs:font-light' >Don't have a LEGO Account?</span>
                    <Link className='xxs:text-sm xxs:text-blue-500' to='/register'>Create account</Link>
                </div>
                <div className='xxs:mt-8'>
                    <button className='xxs:flex xxs:flex-row xxs:items-center xxs:h-12 xxs:w-full xxs:my-2 xxs:rounded xxs:text-white xxs:bg-blue-600'>
                        <BsFacebook className='xxs:h-6 xxs:w-6 xxs:ml-3 xxs:mr-5 xxs:text-white' />
                        <span>Continue with Facebook</span>
                    </button>
                    <button className='xxs:flex xxs:flex-row xxs:items-center xxs:h-12 xxs:w-full xxs:my-2 xxs:rounded xxs:text-black xxs:bg-white xxs:border-1 xxs:border-gray-500'>
                        <FcGoogle className='xxs:h-6 xxs:w-6 xxs:ml-3 xxs:mr-5 xxs:text-white' />
                        <span>Continue with Google</span>
                    </button>
                    <button className='xxs:flex xxs:flex-row xxs:items-center xxs:h-12 xxs:w-full xxs:my-2 xxs:rounded xxs:text-white xxs:bg-black'>
                        <BsApple className='xxs:h-6 xxs:w-6 xxs:ml-3 xxs:mr-5 xxs:text-white' />
                        <span>Continue with Apple ID</span>
                    </button>
                </div>
            </div>
            <PrivacyCookies />
        </>
  )
}

const AccountHeader = () => {
    return (
        <header className='xxs:relative xxs:w-full xxs:bg-yellow-300 xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:py-3'>
            <img className='xxs:h-8' src={legoLogo} alt="lego logo" />
            <h1 className='xxs:text-xl xxs:font-bold xxs:tracking-wide'>Account</h1>
            <Link to='/'>
                <XIcon className='xxs:h-9 xxs:w-9 xxs:absolute xxs:right-2 xxs:top-1/2 -translate-y-1/2' />
            </Link>
        </header>
    )
}