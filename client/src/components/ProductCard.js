import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BagContext } from './BagContext';

export default function ProductCard({ product }) {
    const {bagArr, totalItemsValue} = useContext(BagContext); 
    const [bag, setBag] = bagArr;
    const [totalItems, setTotalItems] = totalItemsValue;
    const [limit, setLimit] = useState(false); 

    useEffect(() => {
        const sumQauntity = () => {
            if (bag.length !== 0) {
                const total = [...bag].reduce((prev, curr) => prev + curr.quantity, 0);
                setTotalItems(total); 
            } 
        }

        sumQauntity();
    }, [totalItems, bag, setTotalItems])

    const addToBag = () => {
        const bagItem = [...bag].find(item => item.item_id === product.item_id);

        if (bagItem === undefined) {
            const newBag = [...bag];
            newBag.push(product);
            setBag(newBag);
        } else {
            const newBag = [...bag].map(item => {
                if (item.item_id === product.item_id) {
                    // if item quantity is not 3 then add 1
                    if (item.quantity !== 3) item.quantity += 1; 
                    // if quantity is 3 then disable button 
                    else setLimit(true);
                }
    
                return item; 
            });
            setBag(newBag);
        }
    }

    return (
        <div className='xxs:flex xxs:flex-col xxs:items-center xxs:border-1' key={product.item_id}>
            <Link className='xxs:flex xxs:flex-row xxs:items-center xxs:justify-center xxs:h-36 xxs:w-full xxs:pt-2 sm:h-52 sm:my-8' to={`/shop/${product.item_id}`}>
                <img className='xxs:w-full xxs:h-full xxs:object-contain' src={product.images[0].split('?')[0]} alt={product.set} />
            </Link>
            <div className='xxs:flex xxs:flex-col xxs:items-center xxs:w-full xxs:p-2'>
                <Link className='xxs:text-left xxs:h-20 xxs:w-full xxs:font-medium hover:underline' to={`/shop/${product.item_id}`}>
                    {product.set}
                </Link>
                {/* ratings determine text color over 3.5 green under 3.5 is orange under 2 is red */}
                <span className='xxs:text-left xxs:w-full'>{Math.round(product.rating * 10) / 10} / 5</span>
                <span className='xxs:text-left xxs:w-full xxs:font-semibold xxs:mt-2 xxs:mb-2'>${product.price}.99</span>
                <button 
                className={limit ? 'limit-btn': 'orange-btn mb-2 sm:h-14'}
                onClick={addToBag}
                >{limit ? 'Limit Reached' : 'Add to Bag'}</button>
            </div>
        </div>
    )
}
