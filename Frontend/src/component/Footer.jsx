import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* Left Side */}
        <div className="">
            <img src={assets.logo}  className='mb-5 w-40'/>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        {/* Middle Side */}
        <div className="">
            <h2 className='text-xl font-medium mb-5'>COMPANY</h2>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>HOME</li>
                <li>ABOUT US</li>
                <li>CONTACT US</li>
                <li>PRIVACY POLICY</li>
            </ul>
        </div>
        {/* Right Side */}
        <div className="">
            <h2 className='text-xl font-medium mb-5'>GET IN TOUCH</h2>

            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>03469069796</li>
                <li>alyahmedrbk@gmail.com</li>
            </ul>
        </div>
        </div>

        {/* Copyright Section */}
        <div>
            <hr />
            <p className='text-sm py-5 text-center'>Copyright © 2024 Prescripto - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer