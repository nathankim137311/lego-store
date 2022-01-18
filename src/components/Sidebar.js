import React from 'react'
import { XIcon } from '@heroicons/react/solid'

export default function Sidebar() {
    return (
        <div className='fixed left-0 top-0 h-full bg-white text-black w-1/3'>
            <div className='flex flex-row justify-between items-center h-14 w-full border-b-3 border-yellow-300'>
                <h2 className='px-6'>MENU</h2>
                <button className='px-6'>
                    <XIcon className='w-6 h-6'/>
                </button>
            </div>
            <ul className='mt-2'>
                <li className='shadow-sm px-6 py-2 border-b-1 border-gray-200'>
                    <a className='text-sm' href="/home">HOME</a>
                </li>
                <li className='shadow-sm px-6 py-2 border-b-1 border-gray-200'>
                    <a className='text-sm' href="/shop">SHOP</a>
                </li>
                <li className='shadow-sm px-6 py-2 border-b-1 border-gray-200'>
                    <a className='text-sm' href="/watchlist">WATCHLIST</a>
                </li>
                <li className='shadow-sm px-6 py-2 border-b-1 border-gray-200'>
                    <a className='text-sm' href="/contact">CONTACT</a>
                </li>
                <li className='shadow-sm px-6 py-2 border-b-1 border-gray-200'>
                    <a className='text-xs' href="/shopping-bag">
                        Shopping Bag
                        (<small>0</small>)
                    </a>
                </li>
            </ul>
        </div>
    )
}