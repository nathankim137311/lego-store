import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import starwarsLogo from '../png/starwars-logo.png'
import ProductCard from './ProductCard';

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
                    return <ProductCard product={product} />
                })}
            </div>
            <Navbar />
        </>
    )
}
