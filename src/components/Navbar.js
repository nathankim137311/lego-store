import React, { useState, useContext } from 'react'
import { ShoppingBagIcon, SearchIcon, MenuIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import legoLogo from '../png/Lego-logo.png'
import legoHead from '../png/legoHead.png'
import Sidebar from './Sidebar'
import { BagContext } from './BagContext'

export default function Navbar() {
    const [isActive, setActive] = useState(false); 
    const [isSearch, setSearch] = useState(false); 
    const {bagArr} = useContext(BagContext); 
    const [bag] = bagArr;

    const handleClick = () => {
        setActive(true);
    }

    const handleSearch = () => {
        setSearch(!isSearch);
    }

    return (
        <>
            <header className='fixed top-0 flex flex-row items-center xxs:h-14 md:h-16 lg:h-20 w-full xxs:bg-white lg:bg-yellow-300 xxs:border-b-2 xxs:border-yellow-300'>
                <nav className='w-full flex flex-row justify-between xxs:mx-4 md:mx-14 lg:mx-22 xl:mx-28'>
                    <ul className='flex flex-row items-center'>
                        <li className='relative flex flex-col items-center mx-2 lg:hidden'>
                            <button onClick={ handleClick }>
                                <MenuIcon className='h-6 w-6'/>
                            </button>
                            <small className='text-xxs'>MENU</small>
                        </li>
                        <li>
                            <a href="/">
                                <img className='xxs:h-10 xxs:w-18 lg:h-14 lg:w-24' src={ legoLogo } alt="Lego logo" />
                            </a>
                        </li>
                    </ul>
                    <ul className='flex flex-row items-center'>
                        <div className='xxs:hidden lg:flex flex-row items-center'>
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
                        <li className='flex flex-row items-center xxs:mx-2 lg:mx-3'>
                            <button className={ isSearch ? 'hidden' : '' } onClick={ handleSearch }>
                                <div className='flex flex-row justify-center items-center p-2 xxs:bg-yellow-300 lg:bg-white rounded-full'>
                                    <SearchIcon className='xxs:h-5 xxs:w-5 lg:h-6 lg:w-6' />
                                </div>
                            </button>
                            <SearchBar isSearch={ isSearch } handleSearch={ handleSearch } />
                        </li>
                        <li className='flex flex-row items-center justify-center xxs:mx-2 lg:mx-3'>
                            <a href="/">
                                <div className='flex flex-row justify-center items-center p-2 xxs:bg-blue-300 lg:bg-white rounded-full'>
                                    <img className='xxs:h-5 xxs:w-5 lg:h-6 lg:w-6' src={ legoHead } alt="" />
                                </div>
                            </a>
                        </li>
                        <li className='relative flex flex-row items-center justify-center xxs:mx-2 lg:mx-3'>
                            <a className='flex flex-col items-center' href="/">
                                <ShoppingBagIcon className='xxs:h-14 xxs:w-6 lg:h-14 lg:w-7'/>
                            </a>
                            {/* change bag.length here maybe */}
                            <small className='ml-1 xxs:text-xs lg:text-sm'>({bag.length})</small>
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
