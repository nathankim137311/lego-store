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
        <div className='xxs:p-4 xxs:mt-2'>
            <div className='xxs:flex xxs:flex-col'>
                <div className='xxs:bg-white xxs:w-full xxs:max-w-3xl'>
                    <img className='xxs:w-full xxs:h-full xxs:object-contain' src={images[0]} alt="" />
                </div>
                <div className='xxs:mt-3'>
                    <div className='xxs:flex xxs:flex-row xxs:justify-between'>
                        <h1 className='xxs:text-xl'>{product.set}</h1>
                        <img className='xxs:h-16 xxs:w-28' src={starwarsLogo} alt="" />
                    </div>
                    <h2 className='xxs:text-xl xxs:font-bold'>${product.price}.99</h2>
                    <small className='xxs:text-sm'>{product.availability}</small> 
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
            <div className='xxs:flex xxs:flex-row xxs:justify-start xxs:w-fit xxs:rounded-md xxs:border-1 xxs:border-gray-300 xxs:my-4'>
                <button 
                className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:h-12 xxs:w-12'
                onClick={handleDecrement}
                >
                    <MinusIcon className='xxs:h-4 xxs:w-4' />
                </button>
                <div className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:w-24 xxs:border-x-1 xxs:border-gray-300'>
                    <span>{quantity}</span>
                </div>
                <button 
                className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:h-12 xxs:w-12'
                onClick={handleIncrement}
                >
                    <PlusIcon className='xxs:h-4 xxs:w-4' />
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
        <div className='xxs:grid xxs:grid-cols-3 xxs:mt-4 xxs:py-2 xxs:border-y-1 xxs:border-gray-300'>
            <div className='xxs:flex xxs:flex-col xxs:items-center'>
                <CakeIcon className='xxs:h-10 xxs:w-10 xxs:text-gray-500 xxs:my-2'/>
                <span>{ages}</span>
                <small>Ages</small>
            </div>
            <div className='xxs:flex xxs:flex-col xxs:items-center'>
                <OfficeBuildingIcon className='xxs:h-10 xxs:w-10 xxs:text-gray-500 xxs:my-2'/>
                <span>{pieces}</span>
                <small>Pieces</small>
            </div>
            <div className='xxs:flex xxs:flex-col xxs:items-center'>
                <HashtagIcon className='xxs:h-10 xxs:w-10 xxs:text-gray-500 xxs:my-2'/>
                <span>{item.toString().slice(0,5)}</span>
                <small>Item</small>
            </div>
        </div>
    )
}
