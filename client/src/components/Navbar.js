import React, { useState, useContext } from 'react'
import { ShoppingBagIcon, SearchIcon, MenuIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import legoLogo from '../png/Lego-logo.png'
import legoHead from '../png/legoHead.png'
import Sidebar from './Sidebar'
import { BagContext } from './BagContext'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [isActive, setActive] = useState(false); 
    const [isSearch, setSearch] = useState(false); 
    const { totalItemsValue } = useContext(BagContext); 
    const [totalItems] = totalItemsValue;

    const handleClick = () => {
        setActive(true);
    }

    const handleSearch = () => {
        setSearch(!isSearch);
    }

    return (
        <>
            <header className='fixed top-0 flex flex-row items-center xxs:h-14 md:h-16 lg:h-20 w-full xxs:bg-white lg:bg-yellow-300 xxs:border-b-2 xxs:border-yellow-300'>
                <nav className='w-full flex flex-row justify-between xxs:mx-2 lg:mx-6 2xl:max-w-8xl 2xl:mx-auto'>
                    <ul className='flex flex-row items-center'>
                        <li className='relative flex flex-col items-center mx-2 lg:hidden'>
                            <button onClick={ handleClick }>
                                <MenuIcon className='h-6 w-6'/>
                            </button>
                            <small className='text-xxs'>MENU</small>
                        </li>
                        <li>
                            <Link to='/'>
                                <img className='xxs:h-10 xxs:w-18 lg:h-14 lg:w-14' src={ legoLogo } alt="Lego logo" />
                            </Link>
                        </li>
                    </ul>
                    <ul className='flex flex-row items-center'>
                        <div className='xxs:hidden lg:flex flex-row items-center'>
                            <li className='mx-3 lg:text-base font-medium'>
                                <Link to='/shop'>SHOP</Link>
                            </li>
                            <li className='mx-3 lg:text-base font-medium'>
                                <Link to='/watchlist'>WATCHLIST</Link>
                            </li>
                            <li className='blue-btn mx-3 lg:text-base'>
                                <Link to='/contact'>Contact</Link>
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
                            <Link to='/dashboard'>
                                <div className='flex flex-row justify-center items-center p-2 xxs:bg-blue-300 lg:bg-white rounded-full'>
                                    <img className='xxs:h-5 xxs:w-5 lg:h-6 lg:w-6' src={ legoHead } alt="" />
                                </div>
                            </Link>
                        </li>
                        <li className='relative flex flex-row items-center justify-center xxs:mx-2 lg:mx-3'>
                            <Link className='flex flex-col items-center' to='/cart'>
                                <ShoppingBagIcon className='xxs:h-14 xxs:w-6 lg:h-14 lg:w-7'/>
                            </Link>
                            <small className='ml-1 xxs:text-xs lg:text-sm'>({totalItems})</small>
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
