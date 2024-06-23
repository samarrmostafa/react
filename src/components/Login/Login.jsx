import { useState,useContext } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/Styles";
import facebook from '../../Assests/facebook.png';
import twiter from '../../Assests/twitter.png';
import google from '../../Assests/google.png';
import logo from '../../Assests/logo.png';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from "universal-cookie";
import { User } from "../context/context";
function Login() {
  const [isLoading, setIsLoading] = useState(false); 
  const cookie = new Cookies();
  const user = useContext(User);
  const text = `Welcom To`;
  const pVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: .1,
      },
    },
  };
  const spanvarins = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  
 
 
  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://etafqna-api.onrender.com/api/v1/auth/login", {
        email: email,
        password: password
      });
      const token = res.data.token;      // Assuming you have cookie and user context set up
      cookie.set("Bearer", token, { path: "/" });
      const userDetails = res.data.user;
      user.setAuth({ token, userDetails });
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
 
    <div className='w- full h-screen flex items-start '>
      <div className=" relative w-1/2 h-full flex flex-col bg-gray-200">
        <div className="my-[130px] align-baseline text-center flex flex-col">
  {/* start animation */}
          <motion.h2
          initial="hidden" animate="visible"
           className="text-4xl text-black ml-[-70px] font-extrabold my-1"  variants={pVariants}>
          {text.split("").map((char,index)=>(
          <motion.span key={index} variants={spanvarins} >
            {char}
            </motion.span>
            ))}</motion.h2>
             {/* end animation */}
          <img  className='logo-image flex  p-0 my-3'src={logo}alt='logo'/>
          <motion.p 
 
          className="p-0 text-center text-2xl font-bold text-gray-900 my-3 ml-[-70px]">
 
            Your Best Gate To <br/> Buy,Sell,Donate & Exchange <br/>Whateever You need</motion.p>
        </div>
      </div>
      {/* email */}
 
      <div className=' w-1/2 h-full flex flex-col  '>
        <div className=' flex flex-col sm:px-20'>
          <h5 className=" p-0 my-[50px]  text-center text-3xl font-extrabold text-gray-900">
            <span> Log in</span>
          </h5>
          <form onSubmit={submitLogin} className='space-y-7 flex flex-col w-full h-full'>
            <div>
              <label htmlFor='email' className="block text-sm font-meduim text-gray-700">
                Email
              </label>
              <div className='mt'>
                <input type="email" name='email' autoComplete='email' placeholder="Enter Your Email Adress..."
                  required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border  border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm' />
              </div>
            </div>
            {/*end email */}
            {/* password */}
            <div>
              <label htmlFor='password' className="block text-sm font-meduim text-gray-700">
                Password
              </label>
              <div className='mt-1 relative'>
                <input
                  type={visible ? "text" : "password"}
                  name='password' placeholder="Enter Your Password..."
                  autoComplete='current-password'
                  required value={password}
                  onChange={(e) => setPassword(e.target.value)}
 
                  className='appearance-none block w-full px-3 py-2 border mt-[-3px] border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm' />
 
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              {/*end  password */}
            </div>
            {/* create button */}
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-orange-600 focus:ring-blue-orange border-gray-300 rounded-lg"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/fogetpassword"
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700"
              >
                Log in
              </button>
              <p className="my-3 block text-center text-gray-400"> By clicking Signup or Login<br />Iagree to <span className="text-orange-600">ETFA2NA'S</span> terms of service and privacy policy </p>
              <p className="my-1 block text-center  text-gray-400">  ____________________OR ____________________</p>
            </div>
            <div className={`${styles.noramlFlex} w-full  `}>
              <h4 className=" my-2 block text-center" >Don't have any account?</h4>
              <Link to="/Sign" className="text-orange-600 pl-2">
              Sign Up
              </Link>
            </div>
 
            <div>
              <ul className="social-media-icon">
                <li><img src={google} alt="face book" /></li>
                <li><img src={facebook} alt="face book" /></li>
                <li><img src={twiter} alt="face book" /></li>
              </ul>
            </div>
 
 
          </form>
 
        </div>
      </div>
 
    </div>
 
  )
}
 
export default Login