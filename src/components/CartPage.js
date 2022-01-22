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
                                <div className='xxs:flex xxs:flex-col xxs:justify-center xxs:items-center xxs:ml-2'>
                                    <h2 className='xxs:text-base'>
                                        <Link to={`/shop/${item.item_id}`}>{item.set}</Link>
                                    </h2>
                                    <div className='xxs:flex xxs:flex-row xxs:w-full xxs:justify-between'>
                                        <span className='xxs:text-sm'>Qty: {item.quantity}</span>
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
            {/* <div className='xxs:w-full xxs:h-fit xxs:mx-2 bg-red-500'>

            </div> */}
            <Navbar />
        </>
    )
}
