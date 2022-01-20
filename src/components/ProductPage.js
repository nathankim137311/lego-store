import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Navbar from './Navbar';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

export default function ProductPage() {
    const [product, setProduct] = useState([]);
    let params = useParams();
    const item_id = params.id;

    useEffect(() => {
        fetchProduct(item_id);
    }, []);

    const fetchProduct = async (id) => {
        let product = await fetch(`https://lego-star-wars-sets.p.rapidapi.com/api/products/${id}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "lego-star-wars-sets.p.rapidapi.com",
                "x-rapidapi-key": "76acaf4aaamshdc4d06215addb4ap16e33cjsn782c56471964"
            }
        });
        product = await product.json();
        setProduct(product);
    }
    return (
        <>
            <div className='flex flex-row mt-16 w-full p-4 text-sm'>
                <Link className='text-blue-400 mr-2' to='/shop'>
                    <h3>Shop &gt;</h3>
                </Link>
                <h3>{product.length === 0 ? console.log('loading...') : product[0].set}</h3>
            </div>
            {product.length === 0 ? console.log('loading...') : <Carousel product={product[0]} />}
            <Navbar />
        </>
    )
}
