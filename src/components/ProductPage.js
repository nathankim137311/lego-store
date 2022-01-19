import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Navbar from './Navbar';

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
            <h1 className='absolute top-24 left-1/2 -translate-x-1/2'>{product[0].set}</h1>
            <Navbar />
        </>
    )
}
