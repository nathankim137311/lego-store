import './home.css';
import Navbar from './components/Navbar';
import millennium from './png/millennium.png';
import Footer from './components/Footer';
import starwarsLogo from './png/starwars-logo.png'
import { Link } from 'react-router-dom';
import darthVader from './jpg/darthvader.jpg';

export default function Home() {
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
        <div className='xxs:mx-2 xxs:text-center xxs:py-4 xxs:px-4 xxs:text-lg'>
          <span>Launch into the LEGO® Star Wars™ universe!</span>
        </div>
      </div>
      <Navbar />
      <Footer />
    </>
  );
}
