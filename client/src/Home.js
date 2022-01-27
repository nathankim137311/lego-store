import './home.css';
import Navbar from './components/Navbar';
import millennium from './png/millennium.png';
import Footer from './components/Footer';
import starwarsLogo from './png/starwars-logo.png'
import { Link } from 'react-router-dom';
import darthVader from './jpg/darthvader.jpg';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [previewItems, setPreviewItems] = useState([]);
  const [loading, setLoading] = useState(false); 

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
      <div>
        <div className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:mt-20 xxs:mb-6 xxs:px-2'>
          <img className='xxs:w-36' src={starwarsLogo} alt="" />
          <Link className='xxs:w-fit xxs:h-10 xxs:p-2 xxs:rounded-full xxs:bg-white xxs:border-2 xxs:border-black xxs:mx-1 xxs:text-sm hover:underline' to='/shop'>Products</Link>
          <Link className='xxs:w-fit xxs:h-10 xxs:p-2 xxs:rounded-2xl xxs:bg-black xxs:text-white xxs:mx-1 xxs:text-sm hover:underline' to='#'>About</Link>
        </div>
        <img src={darthVader} alt="" />
        <div className='xxs:flex xxs:flex-col xxs:items-center xxs:bg-black xxs:text-white xxs:py-6 xxs:px-10 xxs:w-auto'>
          <h3 className='xxs:text-center xxs:pb-4 xxs:text-lg'>LEGO® Star Wars™: This is how we play!</h3>
          <p className='xxs:text-center xxs:text-sm'>Playing can go beyond building. Step outside of the expected and create your own LEGO® Star Wars™ masterpieces. Whether you’re an inspiring painter, a photographer or a filmmaker, you can make your own out-of-this-galaxy creations.</p>
          <button className='xxs:h-10 xxs:bg-white xxs:text-black xxs:w-1/2 xxs:mt-6 xxs:rounded hover:bg-black hover:text-white'>Learn more {'>'}</button>
        </div>
        <div className='xxs:flex xxs:flex-row xxs:items-center xxs:mx-2 xxs:text-left xxs:py-4 xxs:px-4 xxs:text-lg'>
          <span>Launch into the LEGO® Star Wars™ universe!</span>
          <Link className='xxs:text-sm xxs:text-blue-500' to='/shop'>View more {'>'}</Link>
        </div>
        <div>
          <ul className='xxs:overflow-x-scroll xxs:snap-x xxs:snap-mandatory xxs:flex xxs:flex-row xxs:pl-8 scrollbar-auto scrollbar-thumb-blue-700 scrollbar-track-blue-300'>
            {previewItems.map(item => {
              return (
                <ItemThumbnail item={item} />
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
  return (
    <div className='xxs:flex xxs:flex-col xxs:px-2 xxs:py-4 xxs:snap-center xxs:snap-always'>
      <div className='xxs:flex xxs:flex-row xxs:justify-center xxs:items-center xxs:h-56 xxs:w-56 xxs:border-1 xxs:border-gray-300 xxs:py-2'>
        <img className='xxs:max-w-full xxs:max-h-full' src={item.images[0].split('?')[0]} alt="" />
      </div>
      <div className='xxs:flex xxs:flex-col'>
        <h3 className='xxs:text-left xxs:mt-2 xxs:h-14'>{item.set}</h3>
        <div className='xxs:flex xxs:flex-row xxs:justify-between'>
          <div className='xxs:flex xxs:flex-col'>
            <span>{Math.round(item.rating * 10) / 10} / 5</span>
            <span className='xxs:font-semibold'>${item.price}.99</span>
          </div>
          <button className='xxs:bg-orange-400 xxs:rounded xxs:px-2 xxs:ml-2 xxs:text-sm xxs:font-medium hover:xxs:bg-white hover:border-2 hover:border-orange-400'>Add to Bag</button>
        </div>
      </div>
    </div>   
  )
}
