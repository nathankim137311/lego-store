import React from 'react'
import { PlusIcon, MinusIcon, CakeIcon, OfficeBuildingIcon, HashtagIcon } from '@heroicons/react/outline'
import starwarsLogo from '../png/starwars-logo.png'

export default function Carousel( props ) {
    const images = props.product.images.map(image => image.split('?')[0]);

    return (
        <div className='p-4 mt-2'>
            <div className='bg-white h-72 w-full'>
                <img className='w-full h-full object-contain' src={images[0]} alt="" />
            </div>
            <div>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-xl'>{props.product.set}</h1>
                    <img className='xs:h-16 xs:w-28' src={starwarsLogo} alt="" />
                </div>
                <h2 className='text-xl font-bold'>${props.product.price}.99</h2>
                {/* different colors for availability add later */}
                <h2>{props.product.availability}</h2> 
                <h2>Rating: {Math.round(props.product.rating * 10) / 10} / 5</h2>
                <QuantitySelector /> 
                <button className='orange-btn'>Add to Bag</button>
                <ProductDetail ages={props.product.ages} pieces={props.product.pieces} item={props.product.item_id} />
            </div>
        </div>
    )
}

const QuantitySelector = () => {
    return (
        <div className='flex flex-row justify-start w-fit rounded-md border-1 border-gray-300 my-4'>
            <button className='flex flex-row justify-center items-center h-12 w-12'>
                <MinusIcon className='h-4 w-4' />
            </button>
            <div className='flex flex-row justify-center items-center w-24 border-x-1 border-gray-300'>
                <span>1</span>
            </div>
            <button className='flex flex-row justify-center items-center h-12 w-12'>
                <PlusIcon className='h-4 w-4' />
            </button>
        </div>
    )
}

const ProductDetail = ({ ages, pieces, item }) => {
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
