import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import starwarsLogo from '../png/starwars-logo.png'
import ProductCard from './ProductCard';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchProducts = async (page) => {
            try {
                // setLoading(true); 
                let data = await fetch(`https://lego-star-wars-sets.p.rapidapi.com/api/products?page=${page}&limit=10`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "lego-star-wars-sets.p.rapidapi.com",
                        "x-rapidapi-key": "76acaf4aaamshdc4d06215addb4ap16e33cjsn782c56471964"
                    }
                });
                data = await data.json();
                data.products.forEach(product => product.quantity = 1);
                // saves products fetched from API
                if (products.length !== 0) {
                    const mergedProducts = [...products, ...data.products];    
                    setProducts(mergedProducts);
                } else {
                    setProducts(data.products);
                }
            } catch (err) {
                console.log(err);
            }
        } 

        fetchProducts(page);
    }, [page]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1); 
    }

    return (
        <> 
            <img className='absolute top-24 left-1/2 -translate-x-1/2 xxs:h-20 xxs:w-34 sm:h-28 sm:w-44' src={ starwarsLogo } alt="Star Wars logo" />
            <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-full bg-gray-100 xxs:p-4 sm:px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-48'>
                <h2 className='xxs:text-left' >Star Wars</h2>
                <p className='xxs:text-justify'>Builders can join forces to build the iconic All-Stars from their favorite Star Wars movies. Control the action with the NEW Star Wars collection!</p>
            </div>
            <div className='absolute top-1/2 xxs:px-2 sm:px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-48 w-full grid xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'>
                {products.map(product => {
                    return <ProductCard key={product.item_id} product={product} />
                })}
                <button onClick={loadMore} >Load More</button>
            </div>
            <Navbar />
        </>
    )
}
