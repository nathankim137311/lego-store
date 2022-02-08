import React, { useState } from 'react';
import { PrivacyCookies } from './Register';
import legoLogo from '../png/Lego-logo.png';
import boxerMinifig from '../png/boxerMinifig.png';
import { XIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom';
import { BsFacebook, BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
    const [email, setEmail] = useState(null); 
    const [password, setPassword] = useState(null);
    // Form error
    const [error, setError] = useState(null); 
    const [errorMsg, setErrorMsg] = useState(''); 
    // Form success
    const [successMsg, setSuccessMsg] = useState('');
    // Loading 
    const [isLoading, setIsLoading] = useState(false); 

    let navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const user = {
                email,
                password,
            }

            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(user),
            });

            const data = await response.json(); 

            // if user logs in successfully
            if (data.status) {
                // scroll to top
                window.scrollTo({
                    top: 0, 
                    behavior: 'smooth'
                });
                localStorage.setItem('token', data.token); // store token in localStorage
                setSuccessMsg('Successfully logged in!');
                setIsLoading(true);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
                setError(false);
            } 

            // if there are any errors
            if (data.error) {
                // scroll to top
                window.scrollTo({
                    top: 0, 
                    behavior: 'smooth'
                });
                setErrorMsg(data.error); 
                setError(true);  
            }

        } catch(err) {
            console.log(err);
        }
    }

    if (isLoading) {
        return (
          <div className='xxs:absolute xxs:left-1/2 xxs:top-1/2 xxs:-translate-x-1/2 xxs:-translate-y-1/2'>
              <h1>Loading...</h1>
          </div>
        );
    }

    return (
        <div className='bg-gray-100'>
            <div className='md:border-4 md:border-white md:w-fit md:mx-auto' >
                <AccountHeader />
                {error === false && <SuccessMessage message={successMsg} />}
                {error === true && <ErrorMessage message={errorMsg} />}
                <div className='xxs:bg-gray-100 xxs:px-4 xxs:pt-8 xxs:pb-4 md:w-124 md:px-8'>
                    <div>
                        <img className='w-full h-full max-w-xs xxs:mx-auto' src={boxerMinifig} alt="Minifigure surfing" />
                    </div>
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
                        <button 
                            className='confirm-btn xxs:bg-blue-500 xxs:text-white' 
                            onClick={loginUser}
                            >
                            Log in
                        </button>
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
            </div>
            <PrivacyCookies />
        </div>
  )
}

const AccountHeader = () => {
    return (
        <header className='xxs:relative xxs:w-full xxs:bg-yellow-300 xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:py-3 md:w-124 md:mx-auto'>
            <img className='xxs:mr-4 xxs:h-8 md:h-10' src={legoLogo} alt="lego logo" />
            <h1 className='xxs:text-xl xxs:font-bold xxs:tracking-wide md:text-2xl'>Account</h1>
            <Link to='/'>
                <XIcon className='xxs:h-9 xxs:w-9 xxs:absolute xxs:right-2 xxs:top-1/2 -translate-y-1/2' />
            </Link>
        </header>
    )
}

const ErrorMessage = ({ message }) => {
    return (
        <div className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:px-2 xxs:py-4 xxs:bg-red-200'>
            <ExclamationCircleIcon className='xxs:h-6 xxs:w-6 xxs:mx-1 xxs:text-red-600' />
            <span className='xxs:text-red-800 xxs:text-sm xxs:mx-1'>{message}</span>
        </div>
    )
}

const SuccessMessage = ({ message }) => {
    return (
        <div className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:px-2 xxs:py-4 xxs:bg-green-200'>
            <CheckCircleIcon className='xxs:h-6 xxs:w-6 xxs:mx-1 xxs:text-green-600' />
            <span className='xxs:text-black xxs:text-sm xxs:mx-1'>{message}</span>
        </div>
    )
}