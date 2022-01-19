import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div className='flex flex-col items-center' key={uuidv4()}>
            <Link className='flex flex-row items-center justify-center h-36 w-full pt-2' to='/'>
                <img className='w-full h-full object-contain' src={product.images[0].split('?')[0]} alt={product.set} />
            </Link>
            <div className='flex flex-col items-center w-full p-2'>
                <Link className='text-left h-14 w-full' to='/'>
                    {product.set}
                </Link>
                <span className='text-left w-full'>{Math.round(product.rating * 10) / 10} / 5</span>
                <span className='text-left w-full font-semibold mt-2 mb-2'>${product.price}.99</span>
                <button className='h-12 w-full bg-orange-400 rounded-md text-sm font-medium mb-2'>Add to Bag</button>
            </div>
        </div>
    )
}
