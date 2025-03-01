import React from 'react'
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
const Navbar = () => {
    const navitems=[
        "Home","Shop","track order","about","contact"
    ]
  return (
    <nav className='w-full bg-transparent flex justify-end fixed top-0 gap-6 uppercase p-6 z-30'>
        {navitems.map((item,i)=>(
            <a href="" className='hover:underline underline-offset-1 font-montserrat font-normal text-md'>{item}</a>
        ))}
        <IoCartOutline className='text-lg text-white cursor-pointer'></IoCartOutline>
        <FiUser className='text-lg text-white cursor-pointer'></FiUser>
    </nav>
  )
}

export default Navbar