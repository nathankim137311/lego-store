import React, { useState, useEffect, useContext } from 'react'
import Navbar from './Navbar'
import starwarsLogo from '../png/starwars-logo.png'
import ProductCard from './ProductCard';
import { BagContext } from './BagContext';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const {bagArr, totalItemsValue} = useContext(BagContext); 
    const [bag, setBag] = bagArr;
    // get and set price total of all items in bag
    const [totalItems, setTotalItems] = totalItemsValue;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            let products = await fetch("https://lego-star-wars-sets.p.rapidapi.com/api/products?page=1&limit=8", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "lego-star-wars-sets.p.rapidapi.com",
                    "x-rapidapi-key": "76acaf4aaamshdc4d06215addb4ap16e33cjsn782c56471964"
                }
            });
            products = await products.json();
            products.products.forEach(product => product.quantity = 1);
            // saves products fetched from API
            setProducts(products.products);
        } catch (err) {
            console.log(err);
        }
    } 

    return (
        <> 
            {/* delete this later  */}
            {bag.length === 0 ? console.log('no items in bag...') : console.log(bag)}
            <img className='absolute top-24 left-1/2 -translate-x-1/2 xxs:h-20 xxs:w-34 sm:h-28 sm:w-44' src={ starwarsLogo } alt="Star Wars logo" />
            <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-full bg-gray-100 xxs:p-4 sm:px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-48'>
                <h2 className='xxs:text-left' >Star Wars</h2>
                <p className='xxs:text-justify'>Builders can join forces to build the iconic All-Stars from their favorite Star Wars movies. Control the action with the NEW Star Wars collection!</p>
            </div>
            <div className='absolute top-1/2 xxs:px-2 sm:px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-48 w-full grid xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'>
                {products.map(product => {
                    return <ProductCard product={product} bag={bag} setBag={setBag} />
                })}
            </div>
            <Navbar />
        </>
    )
}
