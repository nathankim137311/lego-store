import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import starwarsLogo from '../png/starwars-logo.png'
import ProductCard from './ProductCard';
import Footer from './Footer';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchProducts = async (page) => {
            if (page === 1) setLoading(true); 
            try {
                let data = await fetch(`https://lego-star-wars-sets.p.rapidapi.com/api/products?page=${page}&limit=20`, {
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
                    setLoading(false);
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

    if (loading) {
        return (
          <div className='xxs:absolute xxs:left-1/2 xxs:top-1/2 xxs:-translate-x-1/2 xxs:-translate-y-1/2'>
              <h1>Loading...</h1>
          </div>
        );
    }

    return (
        <> 
            <div className='xxs:mx-2 xxs:mt-16 lg:mx-6 md:mt-20 lg:mt-24 2xl:mt-32 2xl:max-w-8xl 2xl:mx-auto'>
                <img className='xxs:mb-2 xxs:mx-auto xxs:h-20 2xl:mb-10 2xl:h-24' src={ starwarsLogo } alt="Star Wars logo" />
                <div className='xxs:bg-gray-200 xxs:px-2 xxs:py-4 xxs:text-sm xxs:text-justify xxs:mb-6 sm:px-4 sm:py-6 sm:mb-8 lg:py-8 2xl:mx-auto lg:mb-14'>
                    <h2 className='xxs:text-xl xxs:font-semibold xxs:italic' >Star Wars</h2>
                    <p className='xxs:font-light' >Builders can join forces to build the iconic All-Stars from their favorite Star Wars movies. Control the action with the NEW Star Wars collection!</p>
                </div>
                <div className='xxs:grid xxs:grid-cols-2 xxs:w-auto xxs:mt-3 xxs:border-1 xxs:border-gray-200 lg:grid-cols-3 xl:grid-cols-4'>
                    {products.map(product => {
                        return <ProductCard key={product.item_id} product={product} />
                    })}
                </div>
            </div>
            <button className='xxs:w-full xxs:text-blue-600 xxs:mt-4 xxs:mb-8 sm:mt-8 sm:mb-16' onClick={loadMore}>Load More</button>
            <Navbar />
            <Footer /> 
        </>
    )
}
