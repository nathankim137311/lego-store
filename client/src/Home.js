import './home.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import starwarsLogo from './png/starwars-logo.png'
import { Link, useNavigate } from 'react-router-dom';
import darthVader from './jpg/darthvader.jpg';
import React, { useEffect, useState, useContext } from 'react';
import { BagContext } from './components/BagContext';

export default function Home() {
  const [previewItems, setPreviewItems] = useState([]);
  const [loading, setLoading] = useState(false); 
  
  let navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let data = await fetch('https://lego-star-wars-sets.p.rapidapi.com/api/products?page=1&limit=5', {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "lego-star-wars-sets.p.rapidapi.com",
              "x-rapidapi-key": "76acaf4aaamshdc4d06215addb4ap16e33cjsn782c56471964"
          }
      });
      data = await data.json();
      data.products.forEach(product => product.quantity = 1);

      setPreviewItems(data.products);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='xxs:absolute xxs:left-1/2 xxs:top-1/2 xxs:-translate-x-1/2 xxs:-translate-y-1/2'>
          <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className='xxs:flex xxs:flex-col xl:items-center'>
        <div className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:mt-20 xxs:mb-6 xxs:px-2 lg:mt-28'>
          <img className='xxs:w-36 sm:w-44 sm:mr-2' src={starwarsLogo} alt="Star wars logo" />
          <button 
          className='xxs:w-fit xxs:h-10 xxs:p-2 xxs:rounded-full xxs:bg-white xxs:border-2 xxs:border-black xxs:mx-1 xxs:text-sm hover:underline sm:h-12 sm:w-24 sm:mr-2' 
          onClick={() => navigate('/shop')}
          >Products
          </button>
          <button 
          className='xxs:w-fit xxs:h-10 xxs:p-2 xxs:rounded-2xl xxs:bg-black xxs:text-white xxs:mx-1 xxs:text-sm hover:underline sm:h-12 sm:w-20'
          onClick={() => navigate('#')}
          >About
          </button>
        </div>
        <div className='xxs:mx-4 sm:flex sm:flex-row lg:mx-6 lg:w-auto 2xl:w-384'>
          <div className='sm:w-3/5 max-w-4xl' >
            <img className='w-full h-full sm:object-cover sm:object-left' src={darthVader} alt="Darth Vader and Luke Skywalker dueling on Cloud City" />
          </div>
          <div className='xxs:flex xxs:flex-col xxs:items-center xxs:bg-black xxs:text-white xxs:py-6 xxs:px-10 xxs:w-auto sm:w-2/5'>
            <h3 className='xxs:w-full xxs:text-center xxs:pb-4 xxs:text-lg xl:text-2xl'>LEGO® Star Wars™: This is how we play!</h3>
            <p className='xxs:text-center xxs:text-sm sm:text-left xl:w-4/5 xl:text-left xl:text-lg xl:py-6'>Playing can go beyond building. Step outside of the expected and create your own LEGO® Star Wars™ masterpieces. Whether you’re an inspiring painter, a photographer or a filmmaker, you can make your own out-of-this-galaxy creations.</p>
            <button className='xxs:h-10 xxs:bg-white xxs:text-black xxs:w-1/2 xxs:mt-6 xxs:rounded hover:bg-black hover:text-white sm:w-full xl:w-4/5 xl:text-lg'>Learn more {'>'}</button>
          </div>
        </div>
        <div className='xxs:flex xxs:flex-row xxs:items-center xxs:mx-2 xxs:text-left xxs:py-4 xxs:px-4 xxs:text-lg sm:justify-center sm:mt-10 xl:mx-6'>
          <span className='xl:text-xl'>Launch into the LEGO® Star Wars™ universe!</span>
          <Link className='xxs:text-sm xxs:text-blue-500 smd:ml-4' to='/shop'>View more {'>'}</Link>
        </div>
        <div className='xxs:px-4 xxs:pb-3 xxs:mb-10 xxs:w-auto'>
          <ul className='xxs:overflow-x-scroll xxs:snap-x xxs:snap-mandatory xxs:flex xxs:flex-row xxs:pl-8 xxs:scrollbar xl:pl-0'>
            {previewItems.map(item => {
              return (
                <li key={item.item_id} >
                  <ItemThumbnail item={item} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <Navbar />
      <Footer />
    </>
  );
}

const ItemThumbnail = ({ item }) => {
  const [limit, setLimit] = useState(false);
  const {bagArr, totalItemsValue} = useContext(BagContext); 
  const [bag, setBag] = bagArr;
  const [totalItems, setTotalItems] = totalItemsValue;

  useEffect(() => {
    const sumQauntity = () => {
        if (bag.length !== 0) {
            const total = [...bag].reduce((prev, curr) => prev + curr.quantity, 0);
            setTotalItems(total); 
        } 
    }

    sumQauntity();
  }, [bag, totalItems, setTotalItems]);

  const addToBag = (item) => {
    const bagItem = [...bag].find(product => product.item_id === item.item_id);

    // if item not found
    if (bagItem === undefined) {
      const newBag = [...bag];
      newBag.push(item);
      setBag(newBag);
    } else {
      const newBag = [...bag].map(product => {
        if (product.item_id === bagItem.item_id) {
          if (product.quantity !== 3) product.quantity += 1;
          else setLimit(true);
        }

        return item;
      });

      setBag(newBag);
    }
  }

  return (
    <div className='xxs:flex xxs:flex-col xxs:px-2 xxs:py-4 xxs:snap-center xxs:snap-always 2xl:mx-4'>
      <Link to={`/shop/${item.item_id}`}>
        <div className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:h-56 xxs:w-56 xxs:border-1 xxs:border-gray-300 xxs:py-2 xl:h-60 xl:w-60'>
          <img className='xxs:max-w-full xxs:max-h-full' src={item.images[0].split('?')[0]} alt={item.set} />
        </div>
      </Link>
      <div className='xxs:flex xxs:flex-col'>
        <Link to={`/shop/${item.item_id}`}>
          <h3 className='xxs:text-left xxs:mt-2 xxs:h-14'>{item.set}</h3>
        </Link>
        <div className='xxs:flex xxs:flex-row xxs:justify-between'>
          <div className='xxs:flex xxs:flex-col'>
            <span>{Math.round(item.rating * 10) / 10} / 5</span>
            <span className='xxs:font-semibold'>${item.price}.99</span>
          </div>
          <button 
          className={limit ? 'xxs:bg-gray-600 xxs:rounded xxs:px-2 xxs:ml-2 xxs:text-sm xxs:font-medium xxs:text-white' : 'xxs:bg-orange-400 xxs:rounded xxs:px-2 xxs:ml-2 xxs:text-sm xxs:font-medium hover:xxs:bg-white hover:border-2 hover:border-orange-400'}
          onClick={() => addToBag(item)}
          >{limit ? 'Limit reached' : 'Add to Bag'}</button>
        </div>
      </div>
    </div>   
  )
}
