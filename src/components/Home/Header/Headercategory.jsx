import React from 'react'
import { Link } from 'react-router-dom'
import { BsLaptop } from "react-icons/bs";
import { LuBedDouble } from "react-icons/lu";
import { FaDog } from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import { FiSlack } from "react-icons/fi";
function Headerslice() {
  return (
    <div className='flex'> 
 <ul className=' flex gap-[200px] text-1/2xl  text-black font mt-[12px] ml-[180px] '>
 <Link to ='/Allcategorypage'><BsLaptop className=' ml-[-30px] text-orange-500' /> <li className='hover:text-orange-500 mt-[-20px]'>Electronics</li></Link> 
 <Link to ='/Allcategorypage'><LuBedDouble className=' ml-[-30px] text-orange-500'  /><li className='hover:text-orange-500  mt-[-20px]'>Furniture</li></Link>
 <Link to ='/Allcategorypage'><FaDog className=' ml-[-28px] text-orange-500'/><li className='hover:text-orange-500 mt-[-20px]'>Pets</li></Link>
 <Link to ='/Allcategorypage'><GiLipstick className=' ml-[-30px] text-orange-500'/><li className='hover:text-orange-500 mt-[-20px]'>Fashoins&beautey</li></Link>
 <Link to ='/Allcategorypage'>< FiSlack className=' ml-[-30px] text-orange-500' /><li className='hover:text-orange-500 mt-[-20px]'>more category</li></Link>
 
 </ul>
     
</div> 
  )
}
export default Headerslice;