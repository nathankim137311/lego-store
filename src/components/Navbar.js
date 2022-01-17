import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/outline';

export default function Navbar() {
    return (
        <header className='flex flex-row w-full h-16 justify-between items-center px-20 bg-yellow-400 text-black text-md'>
            <h1 className='font-bold text-lg'>Lego Store</h1>
            <nav>
                <ul className="flex flex-row justify-evenly items-center">
                    <li>
                        <a className='font-bold mx-7' href="/shop">Shop</a>
                    </li>
                    <li>
                        <a className='font-bold mx-7' href="/watchlist">Watchlist</a>
                    </li>
                    <li className='flex flex-row items-center bg-blue-500 rounded-2xl mx-4 py-1 text-white'>
                        <a className='font-bold px-4' href="/contact">Contact</a>
                    </li>
                    <li>
                        <a className='' href="/cart">
                            <ShoppingCartIcon className='h-7 w-7 mx-6'/> 
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
