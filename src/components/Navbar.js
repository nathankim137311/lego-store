import React, { useState } from 'react'
import { ShoppingBagIcon, SearchIcon, MenuIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import legoLogo from '../png/Lego-logo.png'
import legoHead from '../png/legoHead.png'
import Sidebar from './Sidebar'

export default function Navbar() {
    const [isActive, setActive] = useState(false); 
    const [isSearch, setSearch] = useState(false); 
    const handleClick = () => {
        setActive(true);
    }

    const handleSearch = () => {
        setSearch(!isSearch);
    }

    return (
        <>
            <header className='fixed top-0 flex flex-row items-center xs:h-14 md:h-16 lg:h-20 w-full xs:bg-white lg:bg-yellow-300 xs:border-b-2 xs:border-yellow-300 z-1'>
                <nav className='w-full flex flex-row justify-between xs:mx-6 md:mx-14 lg:mx-22 xl:mx-28'>
                    <ul className='flex flex-row items-center'>
                        <li className='relative flex flex-col items-center mx-2 lg:hidden'>
                            <button onClick={ handleClick }>
                                <MenuIcon className='h-6 w-6'/>
                            </button>
                            <small className='text-xxs'>MENU</small>
                        </li>
                        <li>
                            <a href="/">
                                <img className='xs:h-10 xs:w-18 lg:h-14 lg:w-24' src={ legoLogo } alt="Lego logo" />
                            </a>
                        </li>
                    </ul>
                    <ul className='flex flex-row items-center'>
                        <div className='xs:hidden lg:flex flex-row items-center'>
                            <li className='mx-3 lg:text-base font-medium'>
                                <a href="/shop">SHOP</a>
                            </li>
                            <li className='mx-3 lg:text-base font-medium'>
                                <a href="/watchlist">WATCHLIST</a>
                            </li>
                            <li className='blue-btn mx-3 lg:text-base'>
                                <a href="/contact">Contact</a>
                            </li>
                        </div>
                        <li className='flex flex-row items-center xs:mx-2 lg:mx-3'>
                            <button className={ isSearch ? 'hidden' : '' } onClick={ handleSearch }>
                                <div className='flex flex-row justify-center items-center p-2 xs:bg-yellow-300 lg:bg-white rounded-full'>
                                    <SearchIcon className='xs:h-5 xs:w-5 lg:h-6 lg:w-6' />
                                </div>
                            </button>
                            <SearchBar isSearch={ isSearch } handleSearch={ handleSearch } />
                        </li>
                        <li className='flex flex-row items-center justify-center xs:mx-2 lg:mx-3'>
                            <a href="/">
                                <div className='flex flex-row justify-center items-center p-2 xs:bg-blue-300 lg:bg-white rounded-full'>
                                    <img className='xs:h-5 xs:w-5 lg:h-6 lg:w-6' src={ legoHead } alt="" />
                                </div>
                            </a>
                        </li>
                        <li className='relative flex flex-row items-center justify-center xs:mx-2 lg:mx-3'>
                            <a className='flex flex-col items-center' href="/">
                                <ShoppingBagIcon className='xs:h-14 xs:w-6 lg:h-14 lg:w-7'/>
                            </a>
                            <small className='absolute bottom-0 xs:text-xs lg:text-sm'>0</small>
                        </li>
                    </ul>
                </nav>
            </header>
            <Sidebar isActive={ isActive } setActive={ setActive } />
        </>
    )
}

const SearchBar = (props) => {
    return (
        <div className={ props.isSearch ? 'search-bar' : 'hidden' }>
            <button>
                <SearchIcon className='h-5 w-5 mr-2' />
            </button>
            <input className='bg-white h-6' type="text" name="search" placeholder="Search..."/>
            <button onClick={ props.handleSearch }>
                <XIcon className='w-5 h-5 ml-2' />
            </button>
        </div>
    )
}
