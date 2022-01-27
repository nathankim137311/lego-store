import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Navbar from './Navbar';
import ProductDetails from './ProductDetails';
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function ProductPage() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false); 
    
    let params = useParams();
    const item_id = params.id;
    
    useEffect(() => {
        const fetchProduct = async (id) => {
            try {
                setLoading(true); 
                let product = await fetch(`https://lego-star-wars-sets.p.rapidapi.com/api/products/${id}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "lego-star-wars-sets.p.rapidapi.com",
                        "x-rapidapi-key": "76acaf4aaamshdc4d06215addb4ap16e33cjsn782c56471964"
                    }
                });
                product = await product.json();
                product[0].quantity = 1; 
                setProduct(product);
                setLoading(false); 
            } catch(err) {
                console.log(err); 
            }
        }

        fetchProduct(item_id);
    }, []); 

    if (loading) {
        return (
          <div className='xxs:absolute xxs:left-1/2 xxs:top-1/2 xxs:-translate-x-1/2 xxs:-translate-y-1/2'>
              <h1>Loading...</h1>
          </div>
        );
    }

    return (
        <>
            <div className='xxs:flex xxs:flex-row xxs:mt-16 xxs:w-full xxs:p-4 xxs:text-sm'>
                <Link className='xxs:text-blue-400 xxs:mr-2' to='/shop'>
                    <h3>Shop {'>'}</h3>
                </Link>
                <h3>{product.length === 0 ? <></> : product[0].set}</h3>
            </div>
            {product.length === 0 ? <></> : <ProductDetails product={product[0]} />}
            <Navbar />
            <Footer />
        </>
    )
}
