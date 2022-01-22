import React, { useContext } from 'react'
import Navbar from './Navbar'
import { BagContext } from './BagContext';
import { TrashIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';

export default function CartPage() {
    const {bagArr, totalItemsValue} = useContext(BagContext); 
    const [bag, setBag] = bagArr;
    const [totalItems, setTotalItems] = totalItemsValue;

    return (
        <>
            <h1 className='xxs:mt-20 xxs:w-full xxs:px-2' >My Bag ({totalItems})</h1>
            <ul className='xxs:p-1 xxs:mt-4'>
                <h3 className='xxs:text-green-600 xxs:font-medium xxs:text-sm xxs:px-4 xxs:py-4'>Available now</h3>
                {bag.map(item => {
                    return (
                        <li className='xxs:flex xxs:flex-row xxs:justify-between xxs:mx-1 xxs:py-4 xxs:border-y-1 xxs:border-gray-300' key={item.item_id}>
                            <div className='xxs:flex xxs:flex-row xxs:w-4/5'>
                                <div className='xxs:w-24'>
                                    <img className='xxs:h-auto' src={item.images[0].split('?')[0]} alt={item.set} />
                                </div>
                                <div className='xxs:flex xxs:flex-col xxs:justify-center xxs:items-center xxs:ml-4'>
                                    <h2 className='xxs:text-sm'>
                                        <Link to={`/shop/${item.item_id}`}>{item.set}</Link>
                                    </h2>
                                    <div className='xxs:flex xxs:flex-row xxs:w-full'>
                                        <span className='xxs:text-sm xxs:mr-2'>Qty: {item.quantity}</span>
                                        <span className='xxs:font-semibold xxs:text-sm'>${item.price}.99</span>
                                    </div>
                                </div>
                            </div>
                            <div className='xxs:flex xxs:flex-col xxs:items-center xxs:justify-between xxs:w-1/5
                            xxs:my-1'>
                                <button onClick={() => console.log('button clicked!')}>
                                    <TrashIcon className='xxs:w-6 xxs:text-blue-500'/>
                                </button>
                                <span className='xxs:text-sm xxs:text-blue-500 xxs:hover:cursor-pointer'>(Edit)</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <PromoCode />
            <OrderSummary />
            <Navbar />
        </>
    )
}

const PromoCode = () => {
    return (
        <div className='xxs:mx-2 xxs:p-4'>
            <h2>Enter a Promo Code</h2>
            <p className='xxs:text-sm xxs:my-4 xxs:rounded-md xxs:text-gray-700'>Got a VIP Discount Code? You'll enter that later when you're checking out!</p>
            <div className='xxs:flex xxs:flex-row xxs:h-12'>
                <input className='xxs:w-3/4 xxs:px-4 xxs:rounded-l-md xxs:border-1 xxs:border-gray-300' type="text" placeholder='Enter Code' />
                <button className='xxs:w-1/4 xxs:border-r-1 xxs:rounded-r-md xxs:border-blue-600 xxs:border-1 xxs:text-sm' >Apply</button>
            </div>
        </div>
    )
}

const OrderSummary = ({ totalItems }) => {
    const orderValue = 100;
    const total = 349.99;  
    const isShipping = true; 
    return (
        <div className='xxs:mx-2 xxs:p-4'>
            <h2 className='xxs:py-2 xxs:border-b-1 xxs:border-gray-300'>Order Summary</h2>
            <p className='xxs:text-sm xxs:my-2 xxs:rounded-md xxs:text-gray-700'>Enter a ZIP code to estimate tax and delivery</p>
            <div className='xxs:flex xxs:flex-row xxs:h-12 xxs:my-4'>
                <input className='xxs:w-3/4 xxs:px-4 xxs:rounded-l-md xxs:border-1 xxs:border-gray-300' type="text" placeholder='Example: 98012' />
                <button className='xxs:w-1/4 xxs:border-r-1 xxs:rounded-r-md xxs:border-blue-600 xxs:border-1 xxs:text-sm' >Apply</button>
            </div>
            <div className='xxs:flex xxs:flex-row xxs:w-full xxs:justify-between xxs:my-2'>
                <span>Order value items</span>
                <span>${orderValue}</span>
            </div>
            <div className='xxs:flex xxs:flex-row xxs:w-full xxs:justify-between xxs:my-2'>
                <span>Shipping cost</span>
                <span>{isShipping ? 'Free' : `$${9.99}`}</span>
            </div>
            <div className='xxs:flex xxs:flex-row xxs:w-full xxs:justify-between xxs:my-2 xxs:font-semibold xxs:text-lg'>
                <span className=''>Total</span>
                <span>{total}</span>
            </div>
        </div>
    )
}
