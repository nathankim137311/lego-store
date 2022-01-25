import React, { useState, useContext, useEffect } from 'react'
import { PlusIcon, MinusIcon, CakeIcon, OfficeBuildingIcon, HashtagIcon } from '@heroicons/react/outline'
import starwarsLogo from '../png/starwars-logo.png'
import { BagContext } from './BagContext';

export default function ProductDetails({ product }) {
    const {bagArr, totalItemsValue} = useContext(BagContext); 
    const [bag, setBag] = bagArr;
    const [totalItems, setTotalItems] = totalItemsValue; 

    const images = product.images.map(image => image.split('?')[0]);

    useEffect(() => {
        const sumQauntity = () => {
            if (bag.length !== 0) {
                const total = [...bag].reduce((prev, curr) => prev + curr.quantity, 0);
                setTotalItems(total); 
            } 
            else setTotalItems(0);
        }

        sumQauntity();
    }, [bag, totalItems, setTotalItems]);

    return (
        <div className='xxs:p-4 xxs:mt-2 lg:mt-0 lg:pt-0 sm:p-6 lg:w-full lg:px-32'>
            <div className='xxs:flex xxs:flex-col lg:flex lg:flex-row'>
                <div className='lg:flex lg:flex-row lg:justify-center lg:items-center bg-white lg:h-78 xxs:w-full xxs:max-w-3xl lg:max-w-6xl lg:border-t-1 lg:border-gray-300'>
                    <img className='w-full h-full xxs:object-contain lg:w-4/6 lg:my-16' src={images[0]} alt="" />
                </div>
                <div className='xxs:mt-3 lg:mt-0 lg:border-t-1 lg:border-gray-300 lg:pt-4 lg:w-1/2'>
                    <div className='flex flex-row justify-between'>
                        <h1 className='xxs:text-xl sm:text-2xl sm:font-medium'>{product.set}</h1>
                        <img className='xxs:h-16 xxs:w-28' src={starwarsLogo} alt="" />
                    </div>
                    <h2 className='xxs:text-xl sm:text-2xl lg:mt-12 font-bold'>${product.price}.99</h2>
                    <small className='text-sm'>{product.availability}</small> 
                    <h2>Rating: {Math.round(product.rating * 10) / 10} / 5</h2>
                    <QuantitySelector product={product} bag={bag} setBag={setBag} /> 
                </div>
            </div>
            <ProductInfo ages={product.ages} pieces={product.pieces} item={product.item_id} />
        </div>
    )
}

const QuantitySelector = ({ product, bag, setBag }) => {
    const [quantity, setQuantity] = useState(product.quantity); 

    const handleIncrement = () => {
        if (quantity < 3) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
        else alert('Limit three per customer');
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const addToBag = () => {
        if (bag.length === 0) {
            const newBag = [...bag]; 
            product.quantity = quantity;
            newBag.push(product); 
            setBag(newBag); 
        } else {
            const newBag = [...bag]; 
            const index = newBag.findIndex(item => item.item_id === product.item_id);
            newBag[index].quantity = quantity;
            setBag(newBag);
        }
    }

    return (
        <>
            <div className='flex flex-row justify-start w-fit rounded-md border-1 border-gray-300 my-4'>
                <button 
                className='flex flex-row justify-center items-center h-12 w-12'
                onClick={handleDecrement}
                >
                    <MinusIcon className='h-4 w-4' />
                </button>
                <div className='flex flex-row justify-center items-center w-24 border-x-1 border-gray-300'>
                    <span>{quantity}</span>
                </div>
                <button 
                className='flex flex-row justify-center items-center h-12 w-12'
                onClick={handleIncrement}
                >
                    <PlusIcon className='h-4 w-4' />
                </button>
            </div>
            <button className='orange-btn' onClick={addToBag}>
                Add to Bag
            </button>
        </>
    )
}

const ProductInfo = ({ ages, pieces, item }) => {
    return (
        <div className='grid grid-cols-3 mt-4 py-2 border-y-1 border-gray-300'>
            <div className='flex flex-col items-center'>
                <CakeIcon className='h-10 w-10 text-gray-500 my-2'/>
                <span>{ages}</span>
                <small>Ages</small>
            </div>
            <div className='flex flex-col items-center'>
                <OfficeBuildingIcon className='h-10 w-10 text-gray-500 my-2'/>
                <span>{pieces}</span>
                <small>Pieces</small>
            </div>
            <div className='flex flex-col items-center'>
                <HashtagIcon className='h-10 w-10 text-gray-500 my-2'/>
                <span>{item.toString().slice(0,5)}</span>
                <small>Item</small>
            </div>
        </div>
    )
}
