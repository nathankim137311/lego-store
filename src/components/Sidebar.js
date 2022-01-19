import React from 'react'
import { XIcon } from '@heroicons/react/solid'

export default function Sidebar( props ) {
    const handleClose = () => {
        props.setActive(false);
    }

    return (
        <>
            <div className={ props.isActive ? 'fade-screen opacity-50 transition-all ease-in-out duration-300 z-2 top-0' : 'hidden'}></div>
            <div className={ props.isActive ? 
            'fixed left-0 top-0 h-full xs:w-full sm:w-1/3 bg-white text-black z-3 transition-all ease-in-out duration-300' 
            : 
            'absolute xs:-left-1/2 sm:-left-1/3 top-0 h-full bg-white text-black w-1/3 z-3' }>
                <div className='sidebar-header'>
                    <h2 className='px-6'>MENU</h2>
                    <button className='px-6' onClick={ handleClose }>
                        <XIcon className='w-6 h-6'/>
                    </button>
                </div>
                <ul className='mt-2'>
                    <li className='sidebar-link'>
                        <a className='text-sm' href="/home">HOME</a>
                    </li>
                    <li className='sidebar-link'>
                        <a className='text-sm' href="/shop">SHOP</a>
                    </li>
                    <li className='sidebar-link'>
                        <a className='text-sm' href="/watchlist">WATCHLIST</a>
                    </li>
                    <li className='sidebar-link'>
                        <a className='text-sm' href="/contact">CONTACT</a>
                    </li>
                    <li className='sidebar-link'>
                        <a className='text-xs' href="/shopping-bag">
                            Shopping Bag
                            (<small>0</small>)
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}