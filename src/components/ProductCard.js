import React from 'react'
import { Link } from 'react-router-dom';

export default function ProductCard({ product, bag, setBag }) {
    const addToBag = () => {
        // push product to array if specific product doesn't exist else increment product quantity by one
        const bagItem = [...bag].find(item => item.item_id === product.item_id);

        if (bagItem !== undefined) {
            const newBag = [...bag].map(item => {
                if (item.item_id === product.item_id) {
                    item.quantity += 1; 
                }

                return item; 
            });
            setBag(newBag);
        } else {
            const newBag = [...bag];
            newBag.push(product);
            setBag(newBag); 
        }
    }

    return (
        <div className='flex flex-col items-center xl:my-2 2xl:my-12 xl:mx-2' key={product.item_id}>
            <Link className='flex flex-row items-center justify-center h-36 w-full pt-2' to={`/shop/${product.item_id}`}>
                <img className='w-full h-full object-contain' src={product.images[0].split('?')[0]} alt={product.set} />
            </Link>
            <div className='flex flex-col items-center w-full p-2'>
                <Link className='text-left h-20 w-full hover:underline' to={`/shop/${product.item_id}`}>
                    {product.set}
                </Link>
                {/* ratings determine text color over 3.5 green under 3.5 is orange under 2 is red */}
                <span className='text-left w-full'>{Math.round(product.rating * 10) / 10} / 5</span>
                <span className='text-left w-full font-semibold mt-2 mb-2'>${product.price}.99</span>
                <button 
                className='orange-btn mb-2'
                onClick={addToBag}
                >Add to Bag</button>
            </div>
        </div>
    )
}
