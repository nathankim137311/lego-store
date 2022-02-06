import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsTwitter, BsYoutube, BsInstagram } from 'react-icons/bs'
import legoLogo from '../png/lego-star-wars-logo.png'

export default function Footer() {
  return (
      <footer className='xxs:w-auto xxs:text xxs:py-4 xxs:bg-blue-900 text-white'>
          <div className='xxs:flex xxs:flex-col xxs:mx-4 2xl:max-w-8xl 2xl:mx-auto'>
            <img className='xxs:block xxs:w-48 xxs:h-auto xxs:mb-4 xxs:mt-4'src={legoLogo} alt="" />
            <h3 className='xxs:text-xl xxs:my-2'>Follow Us</h3>
            <ul className='xxs:flex xxs:flex-row xxs:my-4'>
                <li>
                    <Link to='#'>
                        <BsFacebook className='xxs:h-10 xxs:w-10 xxs:mx-2' />
                    </Link>
                </li>
                <li>
                    <Link to='#'>
                        <BsTwitter className='xxs:h-10 xxs:w-10 xxs:mx-2' />
                    </Link>
                </li>
                <li>
                    <Link to='#'>
                        <BsInstagram className='xxs:h-10 xxs:w-10 xxs:mx-2' />
                    </Link>
                </li>
                <li>
                    <Link to='#'>
                        <BsYoutube className='xxs:h-10 xxs:w-10 xxs:mx-2' />
                    </Link>
                </li>
            </ul>
            <ul className='xxs:mb-10 xxs:text-sm'>
                <li className='xxs:flex xxs:flex-row xxs:justify-between xxs:w-4/5 xxs:my-3'>
                    <Link to='#'>Privacy Policy</Link>
                    <Link to='#'>Cookies</Link>
                </li>
                <li className='xxs:flex xxs:flex-row xxs:justify-between xxs:w-4/5 xxs:my-3'>
                    <Link to='#'>Legal Notice</Link>
                    <Link to='#'>Terms of Use</Link>
                </li>
                <li className='xxs:flex xxs:flex-row xxs:justify-between xxs:w-4/5 xxs:my-3'>
                    <Link to='#'>Digital Wellbeing</Link>
                    <Link to='#'>Accessibility</Link>
                </li>
            </ul>
            <p><small>LEGO System A/S, DK-7190 Billund, Denmark. Must be 18 years or older to purchase online. LEGO, the LEGO logo, the Minifigure, DUPLO, LEGENDS OF CHIMA, NINJAGO, BIONICLE, MINDSTORMS and MIXELS are trademarks and copyrights of the LEGO Group. ©2021 The LEGO Group. All rights reserved. Use of this site signifies your agreement to the terms of use.</small></p>
          </div>
      </footer>
  );
}
