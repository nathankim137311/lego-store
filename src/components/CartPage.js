import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { BagContext } from './BagContext';
import { TrashIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';

export default function CartPage() {
    const {bagArr, totalItemsValue} = useContext(BagContext); 
    const [bag, setBag] = bagArr;
    const [totalItems, setTotalItems] = totalItemsValue;
    // total 
    const [orderValue, setOrderValue] = useState(0); 
    const [isShipping, setIsShipping] = useState(false); 
    const [cartTotal, setCartTotal] = useState(0); 

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

    useEffect(() => {
        const sumPrice = () => {
            const newOrderValue = [...bag].reduce((prev, curr) => prev + (curr.quantity * (curr.price + 1)), 0) - 0.01;
            if (newOrderValue > 50) setIsShipping(true); // if customer spends more than 50 dollars, free shipping
            else setIsShipping(false); 
            setOrderValue(newOrderValue);
        };
        
        sumPrice(); 
    }, [bag, orderValue]);

    useEffect(() => {
        const total = () => {
            const shippingCost = (isShipping ? 0 : 9.99); // shipping is a flat rate of 9.99
            setCartTotal(orderValue + shippingCost);
        }
        total();
    }, [bag, isShipping, orderValue]);

    const deleteItem = (id) => {
        const newBag = [...bag].filter(item => item.item_id !== id); 
        setBag(newBag);  
    }

    return (
        <>
            <h1 className='xxs:mt-20 xxs:w-full xxs:px-2' >My Bag ({totalItems})</h1>
            <div className='xxs:p-1 xxs:mt-4 xxs:bg-gray-100'>
                <ul className='xxs:bg-white xxs:mx-2'>
                    <h3 className='xxs:text-green-600 xxs:font-medium xxs:text-sm xxs:px-4 xxs:py-4'>Available now</h3>
                    {bag.map(item => {
                        return (
                            <li className='xxs:flex xxs:flex-row xxs:justify-between xxs:py-4 xxs:border-b-1 xxs:border-gray-300' key={item.item_id}>
                                {/* {'xxs:border-b-1 xxs:border-gray-300'} */}
                                <div className='xxs:flex xxs:flex-row xxs:w-4/5 xxs:justify-between'>
                                    <div className='xxs:w-24'>
                                        <img className='xxs:h-auto' src={item.images[0].split('?')[0]} alt={item.set} />
                                    </div>
                                    <div className='xxs:flex xxs:flex-col xxs:justify-center xxs:items-between xxs:w-3/5 xxs:ml-4'>
                                        <h2 className='xxs:text-sm'>
                                            <Link to={`/shop/${item.item_id}`}>{item.set}</Link>
                                        </h2>
                                        <div className='xxs:flex xxs:flex-row'>
                                            <span className='xxs:text-sm xxs:mr-2 xxs:text-gray-500'>Qty: {item.quantity}</span>
                                            <span className='xxs:font-semibold xxs:text-sm'>${item.price}.99</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='xxs:flex xxs:flex-col xxs:items-center xxs:justify-between xxs:w-1/5
                                xxs:my-1'>
                                    <button onClick={() => deleteItem(item.item_id)}>
                                        <TrashIcon className='xxs:w-6 xxs:text-blue-500'/>
                                    </button>
                                    <span className='xxs:text-sm xxs:text-blue-500 xxs:hover:cursor-pointer'>(Edit)</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <PromoCode />
                <FreeShippingCard isShipping={isShipping} />
                <OrderSummary totalItems={totalItems} orderValue={orderValue} isShipping={isShipping} cartTotal={cartTotal} />
            </div>
            <CheckoutCard cartTotal={cartTotal} />
            <Navbar />
        </>
    )
}

const PromoCode = () => {
    return (
        <div className='xxs:mx-2 xxs:p-4 xxs:my-3 xxs:bg-white'>
            <h2>Enter a Promo Code</h2>
            <p className='xxs:text-sm xxs:my-4 xxs:rounded-md xxs:text-gray-700'>Got a VIP Discount Code? You'll enter that later when you're checking out!</p>
            <div className='xxs:flex xxs:flex-row xxs:h-12'>
                <input className='xxs:w-3/4 xxs:px-4 xxs:rounded-l-md xxs:border-1 xxs:border-gray-300' type="text" placeholder='Enter Code' />
                <button className='xxs:w-1/4 xxs:border-r-1 xxs:rounded-r-md xxs:border-blue-600 xxs:border-1 xxs:text-sm'>Apply</button>
            </div>
        </div>
    )
}

const OrderSummary = ({ totalItems, orderValue, isShipping, cartTotal }) => {
    return (
        <div className='xxs:mx-2 xxs:p-4 xxs:my-3 xxs:bg-white'>
            <h2 className='xxs:py-2 xxs:border-b-1 xxs:border-gray-300'>Order Summary</h2>
            <p className='xxs:text-sm xxs:my-2 xxs:rounded-md xxs:text-gray-700'>Enter a ZIP code to estimate tax and delivery</p>
            <div className='xxs:flex xxs:flex-row xxs:h-12 xxs:my-4'>
                <input className='xxs:w-3/4 xxs:px-4 xxs:rounded-l-md xxs:border-1 xxs:border-gray-300' type="text" placeholder='Example: 98012' />
                <button 
                className='xxs:w-1/4 xxs:border-r-1 xxs:rounded-r-md xxs:border-blue-600 xxs:border-1 xxs:text-sm'>Apply</button>
            </div>
            <div className='xxs:flex xxs:flex-row xxs:w-full xxs:justify-between xxs:my-2'>
                <span>Order value ({totalItems}) items</span>
                <span>${totalItems === 0 ? 0 : orderValue}</span>
            </div>
            <div className='xxs:flex xxs:flex-row xxs:w-full xxs:justify-between xxs:my-2'>
                <span>Shipping cost</span>
                <span>{isShipping ? 'Free' : `$${9.99}`}</span>
            </div>
            <div className='xxs:flex xxs:flex-row xxs:w-full xxs:justify-between xxs:my-2 xxs:font-semibold xxs:text-lg xxs:py-4'>
                <span>Total</span>
                {/* a hack way to only display the first 5 characters of price */}
                <span>${Math.round(cartTotal * 100) / 100}</span> 
            </div>
        </div>
    )
}

const FreeShippingCard = ({ isShipping }) => {
    if (isShipping === true) {
        return (
            <div className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:w-auto xxs:bg-green-100 xxs:px-6 xxs:py-4 xxs:my-3 xxs:mx-2'>
                <CheckCircleIcon className='xxs:h-8 xxs:w-8 xxs:text-green-500 xxs:mr-1'/>
                <span className='xxs:text-sm xxs:font-light'>Congratulations - you get FREE delivery!</span>
            </div>
        )
    } else return null
}

const CheckoutCard = ({ cartTotal }) => {
    return (
        <div className='xxs:fixed xxs:bottom-0 xxs:flex xxs:flex-col xxs:p-2 xxs:bg-white xxs:w-full xxs:border-t-1 xxs:border-gray-300'>
            <div className='xxs:flex xxs:flex-row xxs:justify-between xxs:mt-2'>
                <span>Order Total</span>
                <span className='xxs:font-semibold'>${cartTotal}</span>
            </div>
            <div className='xxs:flex xxs:flex-row xxs:justify-between xxs:mt-4'>
                <button className='xxs:h-12 xxs:w-1/2 xxs:bg-blue-600 xxs:text-white xxs:text-center xxs:rounded-md xxs:mr-2 hover:text-black hover:bg-white hover:border-2 hover:border-blue-600 '>Express Checkout</button>
                <button className='xxs:h-12 xxs:w-1/2 xxs:bg-orange-400 xxs:rounded-md xxs:ml-2 hover:bg-white hover:border-2 hover:border-orange-400 '>Checkout</button>
            </div>
        </div>
    )
}
