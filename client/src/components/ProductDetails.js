import React, { useState, useContext, useEffect } from 'react'
import { PlusIcon, MinusIcon, CakeIcon, OfficeBuildingIcon, HashtagIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import starwarsLogo from '../png/starwars-logo.png'
import { BagContext } from './BagContext';

export default function ProductDetails({ product }) {
    const {bagArr, totalItemsValue} = useContext(BagContext); 
    const [bag, setBag] = bagArr;
    const [totalItems, setTotalItems] = totalItemsValue; 

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
        <div className='xxs:p-4 lg:px-6 lg:flex lg:flex-row lg:justify-between lg:mb-10 lg:max-w-8xl lg:mx-auto'>
            <div className='xxs:flex xxs:flex-col lg:w-3/5'>
                <ImgSlider images={product.images} />
                <div className='xxs:mt-2 lg:hidden'>
                    <div className='xxs:flex xxs:flex-row xxs:justify-between'>
                        <h1 className='xxs:text-xl sm:text-2xl'>{product.set}</h1>
                        <img className='xxs:h-16 xxs:w-28' src={starwarsLogo} alt="" />
                    </div>
                    <h2 className='xxs:text-xl xxs:font-bold sm:text-2xl'>${product.price}.99</h2>
                    <small className='xxs:text-sm'>{product.availability}</small> 
                    <h2>Rating: {Math.round(product.rating * 10) / 10} / 5</h2>
                    <QuantitySelector product={product} bag={bag} setBag={setBag} /> 
                </div>
            </div>
            <div className='lg:w-2/5'>
                <div className='xxs:mt-2 xxs:hidden lg:block'>
                    <div className='xxs:flex xxs:flex-row xxs:justify-between'>
                        <h1 className='xxs:text-xl sm:text-2xl'>{product.set}</h1>
                        <img className='xxs:h-16 xxs:w-28' src={starwarsLogo} alt="" />
                    </div>
                    <h2 className='xxs:text-xl xxs:font-bold sm:text-2xl'>${product.price}.99</h2>
                    <small className='xxs:text-sm'>{product.availability}</small> 
                    <h2>Rating: {Math.round(product.rating * 10) / 10} / 5</h2>
                    <QuantitySelector product={product} bag={bag} setBag={setBag} /> 
                </div>
                <ProductInfo ages={product.ages} pieces={product.pieces} item={product.item_id} />
            </div>
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
            <div className='xxs:flex xxs:flex-row xxs:items-center xxs:justify-start'>
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
                <span className='xxs:text-sm xxs:w-24 xxs:text-center xxs:font-light'>Limit 3</span>
            </div>
            <button className='orange-btn xxs:w-1/2 xxs:h-14 lg:mt-6' onClick={addToBag}>
                Add to Bag
            </button>
        </>
    )
}

const ProductInfo = ({ ages, pieces, item }) => {
    return (
        <div className='xxs:mt-4 xxs:py-2 xxs:border-y-1 xxs:border-gray-300 lg:mt-16'>
            <div className='xxs:grid xxs:grid-cols-3 my-6'>
                <div className='xxs:flex xxs:flex-col xxs:items-center'>
                    <CakeIcon className='xxs:h-10 sm:h-20 xxs:w-10 xxs:text-gray-500 xxs:my-2'/>
                    <span className='sm:text-2xl'>{ages}</span>
                    <small>Ages</small>
                </div>
                <div className='xxs:flex xxs:flex-col xxs:items-center xxs:border-x-1 xxs:border-gray-300'>
                    <OfficeBuildingIcon className='xxs:h-10 sm:h-20 xxs:w-10 xxs:text-gray-500 xxs:my-2'/>
                    <span className='sm:text-2xl'>{pieces}</span>
                    <small>Pieces</small>
                </div>
                <div className='xxs:flex xxs:flex-col xxs:items-center'>
                    <HashtagIcon className='xxs:h-10 sm:h-20 xxs:w-10 xxs:text-gray-500 xxs:my-2'/>
                    <span className='sm:text-2xl'>{item.toString().slice(0,5)}</span>
                    <small>Item</small>
                </div>
            </div>
        </div>
    )
}

const ImgSlider = ({ images }) => {
    const [imgPos, setImgPos] = useState(0); 

    const decrementIndex = () => {
        if (imgPos !== 0) setImgPos(prevIndex => prevIndex - 1);
    }

    const incrementIndex = () => {
        if (imgPos !== images.length - 1) setImgPos(prevIndex => prevIndex + 1);
    }

    return (
        <div className='xxs:flex xxs:flex-col xxs:justify-center xxs:items-center xxs:w-auto'>
            <div className='xxs:h-full xxs:flex xxs:flex-row xxs:justify-center xxs:items-center sm:max-w-xl lg:max-w-4xl lg:h-152 lg:px-10'>
                <img className='xxs:w-full xxs:max-h-full object-contain' src={images[imgPos].split('?')[0]} alt="" />
            </div>
            <div className='xxs:flex xxs:flex-row xxs:justify-center xxs:w-full xxs:py-2 xxs:mt-2'>
                <button onClick={decrementIndex}>
                    <ChevronLeftIcon className='xxs:h-8 xxs:w-8 xxs:bg-white xxs:rounded-full xxs:mr-2 lg:h-10 lg:w-10'/>
                </button>
                {images.map((image, index) => {
                    return (
                        <button key={index} onClick={() => setImgPos(index)}>
                            <div className={index === imgPos ? 'xxs:h-2 xxs:w-2 xxs:mx-0.5 xxs:rounded-full xxs:bg-orange-600 lg:h-3 lg:w-3' : 'xxs:h-2 xxs:w-2 xxs:mx-0.5 xxs:rounded-full xxs:bg-black lg:h-3 lg:w-3'}>
                            </div>
                        </button>
                    )
                })}
                <button onClick={incrementIndex}>
                    <ChevronRightIcon className='xxs:h-8 xxs:w-8 xxs:bg-white xxs:rounded-full xxs:ml-2 lg:h-10 lg:w-10' />
                </button>
            </div>
        </div>
    )
}
