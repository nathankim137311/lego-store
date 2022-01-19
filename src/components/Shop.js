import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import starwarsLogo from '../png/starwars-logo.png'
import { v4 as uuidv4 } from 'uuid';

export default function Shop() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        let products = await fetch("https://lego-star-wars-sets.p.rapidapi.com/api/products?page=1&limit=8", 
            {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "lego-star-wars-sets.p.rapidapi.com",
                "x-rapidapi-key": "76acaf4aaamshdc4d06215addb4ap16e33cjsn782c56471964"
                }
            })
        products = await products.json();
        setProducts(products.products);
    }

    return (
        <>
            <img className='absolute top-24 left-1/2 -translate-x-1/2 xs:h-20 xs:w-34' src={ starwarsLogo } alt="Star Wars logo" />
            <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-full bg-gray-100 xs:p-4'>
                <h2 className='xs:text-left' >Star Wars</h2>
                <p className='xs:text-justify'>Builders can join forces to build the iconic All-Stars from their favorite Star Wars movies. Control the action with the NEW Star Wars collection!</p>
            </div>
            <div className='absolute top-1/2 p-2 w-full grid xs:grid-cols-2'>
                {products.map(product => {
                    return (
                        <div className='flex flex-col items-center' key={uuidv4()}>
                            <a className='flex flex-row items-center justify-center h-36 w-full pt-2' href="">
                                <img className='w-full h-full object-contain' src={product.images[0].split('?')[0]} alt={product.set} />
                            </a>
                            <div className='flex flex-col items-center w-full p-2'>
                                <a className='text-left h-14 w-full' href="">{product.set}</a>
                                <span className='text-left w-full'>{Math.round(product.rating * 10) / 10} / 5</span>
                                <span className='text-left w-full font-semibold mt-2 mb-2'>${product.price}.99</span>
                                <button className='h-12 w-full bg-orange-400 rounded-md text-sm font-medium mb-2'>Add to Bag</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Navbar />
        </>
    )
}
