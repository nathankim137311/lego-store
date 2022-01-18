import React, { useState } from 'react'
import { ShoppingBagIcon, SearchIcon, MenuIcon } from '@heroicons/react/outline'
import legoLogo from '../png/Lego-logo.png'
import legoHead from '../png/legoHead.png'
import Sidebar from './Sidebar'

export default function Navbar() {
    const [isActive, setActive] = useState(false); 
    const handleClick = () => {
        setActive(true);
    }

    return (
        <>
            <header className='fixed top-0 flex flex-row items-center h-14 w-full bg-white border-b-2 border-yellow-300 z-1'>
                <nav className='w-full flex flex-row justify-between mx-6'>
                    <ul className='flex flex-row items-center'>
                        <li className='relative flex flex-col items-center mx-2'>
                            <button onClick={ handleClick }>
                                <MenuIcon className='h-6 w-6'/>
                            </button>
                            <small className='text-xxs'>MENU</small>
                        </li>
                        <li>
                            <a href="/">
                                <img className='h-10 w-18' src={ legoLogo } alt="Lego logo" />
                            </a>
                        </li>
                    </ul>
                    <ul className='flex flex-row items-center'>
                        <li className='flex flex-row items-center mx-2'>
                            <button><SearchIcon className='h-14 w-5' /></button>
                        </li>
                        <li className='flex flex-row items-center justify-center mx-2'>
                            <a href="/">
                                <img className='h-6 w-6' src={ legoHead } alt="" />
                            </a>
                        </li>
                        <li className='relative flex flex-row items-center justify-center mx-2'>
                            <a className='flex flex-col items-center' href="/">
                                <ShoppingBagIcon className='h-14 w-6'/>
                            </a>
                            <small className='absolute bottom-0 text-xs'>0</small>
                        </li>
                    </ul>
                </nav>
            </header>
            <Sidebar isActive={ isActive } setActive={ setActive } />
        </>
    )
}
