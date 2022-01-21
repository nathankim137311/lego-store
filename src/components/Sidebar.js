import React, { useContext } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { BagContext } from './BagContext';

export default function Sidebar( props ) {
    const {totalItemsValue} = useContext(BagContext); 
    const [totalItems] = totalItemsValue;

    const handleClose = () => {
        props.setActive(false);
    }

    return (
        <>
            <div className={ props.isActive ? 'fade-screen opacity-50 transition-all ease-in-out duration-300 z-2 top-0' : 'hidden'}></div>
            <div className={ props.isActive ? 
            'fixed left-0 top-0 h-full xxs:w-full sm:w-1/3 bg-white text-black z-3 transition-all ease-in-out duration-300' 
            : 
            'absolute xxs:-left-1/2 sm:-left-1/3 top-0 h-full bg-white text-black w-1/3 z-3' }>
                <div className='sidebar-header'>
                    <h2 className='px-6'>MENU</h2>
                    <button className='px-6' onClick={ handleClose }>
                        <XIcon className='w-6 h-6'/>
                    </button>
                </div>
                <ul className='mt-2'>
                    <li className='sidebar-link'>
                        <Link className='text-sm' to='/'>HOME</Link>
                    </li>
                    <li className='sidebar-link'>
                        <Link className='text-sm' to='/shop'>SHOP</Link>
                    </li>
                    <li className='sidebar-link'>
                        <Link className='text-sm' to='/watchlist'>WATCHLIST</Link>
                    </li>
                    <li className='sidebar-link'>
                        <Link className='text-sm' to='/contact'>CONTACT</Link>
                    </li>
                    <li className='sidebar-link'>
                        <Link className='text-xs' to='/shopping-bag'>
                            Shopping Bag
                            (<small>{totalItems}</small>)
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}