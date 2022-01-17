import React from 'react'
import { ShoppingCartIcon, SearchIcon } from '@heroicons/react/outline'
import legoLogo from '../png/Lego-logo.png'

export default function Navbar() {
    return (
        <header className='fixed top-0 flex flex-row w-full h-20 justify-between items-center px-28 bg-yellow-400 text-black text-md'>
            <div className='flex flex-row items-center'>
                <a href="/">
                    <img src={ legoLogo } className='h-14 w-22 mx-4' alt="Lego logo" />
                </a>
                <button className='mx-1'>
                    <SearchIcon className='h-8 w-8 px-1 py-1 bg-white text-black rounded-full' />
                </button>
            </div>
            <nav>
                <ul className="flex flex-row justify-evenly items-center">
                    <li>
                        <a className='font-medium mx-4 hover:underline underline-offset-8 decoration-2' href="/shop">SHOP</a>
                    </li>
                    <li>
                        <a className='font-medium mx-7 hover:underline underline-offset-8 decoration-2' href="/watchlist">WATCHLIST</a>
                    </li>
                    <li>
                        <BlueBtn text={ 'contact' } />
                    </li>
                    <li className='relative'>
                        <a href="/cart">
                            <ShoppingCartIcon className='h-7 w-7 mx-3 my-1'/> 
                        </a>
                        <div className='flex flex-row justify-center items-center absolute top-0 right-1 h-4 w-4 rounded-full bg-red-600 text-white'>
                            <small>0</small>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

const BlueBtn = ({ text }) => {
    return <a className='blue-btn' href="/contact">{ text }</a>
}; 
