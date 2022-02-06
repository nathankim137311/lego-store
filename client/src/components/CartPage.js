import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { BagContext } from './BagContext';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

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

    return (
        <div className='bg-gray-100'>
            <h1 className='xxs:pt-24 xxs:w-full xxs:px-2 sm:px-4 lg:mx-6 2xl:mx-auto 2xl:max-w-8xl' >My Bag ({totalItems})</h1>
            <div className='xxs:p-1 xxs:mt-4 sm:flex sm:flex-row sm:mt-4 lg:mx-6 lg:p-0 2xl:mx-auto 2xl:max-w-8xl'>
                <ul className=' xxs:mx-2 sm:w-2/3'>
                    {bag.length === 0 ? <></> : <h3 className='xxs:text-green-600 xxs:font-medium xxs:text-sm xxs:px-4 xxs:py-4 xxs:bg-white'>Available now</h3>}
                    {bag.length === 0 ? <EmptyBag /> : bag.map(item => {
                        return (
                            <li key={item.item_id}>
                                <ItemDetails item={item} bag={bag} setBag={setBag} />
                            </li>
                        )
                    })}
                </ul>
                <div className='sm:flex sm:flex-col sm:w-1/3'>
                    <PromoCode />
                    <FreeShippingCard isShipping={isShipping} />
                    <OrderSummary totalItems={totalItems} orderValue={orderValue} isShipping={isShipping} cartTotal={cartTotal} />
                    <div className='xxs:hidden sm:flex sm:flex-col sm:items-center sm:bg-white sm:mx-2 sm:py-4 sm:mb-8 lg:mb-12'>
                        <button className='sm:my-2 sm:h-10 sm:w-4/5 sm:bg-orange-400 sm:rounded-md hover:bg-white hover:border-2 hover:border-orange-400 lg:h-12'>Express Checkout</button>
                        <button className='sm:my-2 sm:h-10 sm:w-4/5 sm:bg-blue-600 sm:text-white sm:rounded-md hover:bg-white hover:border-2 hover:border-blue-600 hover:text-black lg:h-12'>Checkout</button>
                    </div>
                </div>
            </div>
            <CheckoutCard cartTotal={cartTotal} bag={bag} isShipping={isShipping} />
            <Navbar />
            <Footer />
        </div>
    )
}

const ItemDetails = ({ item, bag, setBag }) => {
    const [edit, setEdit] = useState(false); 

    const deleteItem = (id) => {
        const newBag = [...bag].filter(item => item.item_id !== id); 
        setBag(newBag);  
    }

    const toggleEdit = () => {
        setEdit(!edit);
    }

    return (
        <div className='xxs:flex xxs:flex-col xxs:border-b-1 xxs:border-gray-300 xxs:bg-white'>
            <div className='xxs:flex xxs:flex-row xxs:justify-between xxs:py-4 xxs:px-2'>
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
                    <span 
                    className='xxs:text-sm xxs:text-blue-500 xxs:hover:cursor-pointer'
                    onClick={toggleEdit}
                    >{edit ? '' : '(Edit)'}</span>
                </div>
            </div>
            {edit 
            ? 
            <div className='xxs:w-auto xxs:flex xxs:flex-row xxs:justify-between xxs:items-center xxs:mx-3'>
                <QuantitySelector item={item} bag={bag} setBag={setBag} edit={edit} setEdit={setEdit} />
            </div> 
            : 
            <></>
            }
        </div>
    )
}

const QuantitySelector = ({ item, bag, setBag, edit, setEdit }) => {
    const [quantity, setQuantity] = useState(item.quantity); 

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

    const handleDone = () => {
        const newBag = [...bag]; 
        const index = newBag.findIndex(product => product.item_id === item.item_id);
        newBag[index].quantity = quantity;
        setBag(newBag);
        setEdit(false);    
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
            <span 
            className='xxs:text-sm xxs:text-blue-500 xxs:hover:cursor-pointer'
            onClick={handleDone}
            >
                {edit ? '(Done)' : ''}
            </span>
        </>
    )
}

const PromoCode = () => {
    return (
        <div className='xxs:mx-2 xxs:p-4 xxs:my-3 xxs:bg-white sm:mt-0'>
            <h2 className='lg:text-xl' >Enter a Promo Code</h2>
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
            <h2 className='xxs:py-2 xxs:border-b-1 xxs:border-gray-300 lg:text-xl'>Order Summary</h2>
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
                <span>${Math.round(cartTotal * 100) / 100}</span> 
            </div>
        </div>
    )
}

const FreeShippingCard = ({ isShipping }) => {
    if (isShipping === true) {
        return (
            <div className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:w-auto xxs:bg-green-100 xxs:px-6 xxs:py-4 xxs:my-3 xxs:mx-2'>
                <CheckCircleIcon className='xxs:h-8 xxs:w-8 xxs:text-green-500 xxs:mr-1 sm:h-12 sm:w-12'/>
                <span className='xxs:text-sm xxs:font-light sm:text-center'>Congratulations - you get FREE delivery!</span>
            </div>
        )
    } else return null
}

const CheckoutCard = ({ cartTotal, bag, isShipping }) => {
    const newBag = [...bag];
    newBag.push({
        set: 'Shipping',
        images: [],
        price: isShipping ? 0 : 9,
        quantity: 1, 
    });

    const redirectToCheckout = () => {
        fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: newBag,
            })
        }).then(res => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url
        }).catch(e => {
            console.error(e.error);
        });
    }

    return (
        <div className='xxs:fixed xxs:bottom-0 xxs:flex xxs:flex-col xxs:p-2 xxs:bg-white xxs:w-full xxs:border-t-1 xxs:border-gray-300 sm:hidden'>
            <div className='xxs:flex xxs:flex-row xxs:justify-between xxs:mt-2'>
                <span>Order Total</span>
                <span className='xxs:font-semibold'>${Math.round(cartTotal * 100) / 100}</span>
            </div>
            <div className='xxs:flex xxs:flex-row xxs:justify-between xxs:mt-4'>
                <button className='xxs:h-12 xxs:w-1/2 xxs:bg-blue-600 xxs:text-white xxs:text-center xxs:rounded-md xxs:mr-2 hover:text-black hover:bg-white hover:border-2 hover:border-blue-600 '>Express Checkout</button>
                <button className='xxs:h-12 xxs:w-1/2 xxs:bg-orange-400 xxs:rounded-md xxs:ml-2 hover:bg-white hover:border-2 hover:border-orange-400'
                onClick={redirectToCheckout}
                >Checkout</button>
            </div>
        </div>
    )
}

const EmptyBag = () => {
    let navigate = useNavigate();

    return (
        <div className='xxs:flex xxs:flex-col xxs:items-center xxs:bg-white xxs:py-4 xxs:px-2'>
            <h1 className='xxs:text-xl xxs:text-center'>You don't have anything in your bag</h1>
            <span className='xxs:text-center xxs:text-sm xxs:text-gray-600 xxs:my-4'>Sign in to see your bag and get shopping!</span>
            <button 
            className='xxs:my-2 xxs:h-12 xxs:w-1/4 xxs:text-white xxs:bg-blue-600 xxs:rounded'
            onClick={() => navigate('/login')}
            >
            Login
            </button>
            <Link className='xxs:my-1 xxs:font-light xxs:text-sm' to='/shop'>Start shopping {'>'}</Link>
        </div>
    )
}
