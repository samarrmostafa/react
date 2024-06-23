import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/Styles";
import facebook from '../../Assests/facebook.png';
import twitter from '../../Assests/twitter.png';
import google from '../../Assests/google.png';
import logo from '../../Assests/logo.png';
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "../context/context";

function Sign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState("");
  const cookie = new Cookies();
  const user = useContext(User);
  const [visible, setVisible] = useState(false);

  async function submit(e) {
    e.preventDefault();
    try {
      let res = await axios.post("https://etafqna-api.onrender.com/api/v1/auth/signup", {
        name: name,
        email: email,
        password: password,
        passwordConfirm: confirm,
        phone: number,
      });
      console.log(res);
      const token = res.data.token;
      console.log(token);
      cookie.set("Bearer", token, { path: "/" });
      const userDetails = res.data.data.user;
      user.setAuth({ token, userDetails });
      window.location.href = "/";
    } catch (err) {
      if (err.response && err.response.status === 500) {
        console.log("Internal Server Error. Please try again later.");
      } else {
        console.log("Error:", err.message);
      }
    }
  }

  return (
    <div className="w-full h-screen flex items-start mt-[-40px]">
      <div className="relative w-1/2 h-[1150px] flex flex-col mt-[-150px] bg-gray-200">
        <div className="my-auto text-center flex flex-col">
          <img className="logo-image flex p-0 my-3 " src={logo} alt="logo" />
          <p className="text-center text-2xl font-bold ml-[-57px] text-gray-900 my-3">
            Your Best Gate To <br /> Buy, Sell, Donate & Exchange <br /> Whatever You Need
          </p>
        </div>
      </div>
      <div className="w-1/2 h-full flex flex-col mt-[-10px]">
        <div className="flex flex-col sm:px-20">
          <h5 className="my-16 text-center text-3xl font-extrabold text-gray-900">Sign Up</h5>
          <form onSubmit={submit} className="space-y-7 flex flex-col w-full">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Enter Your Name..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border  border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter Your Email Address..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="number"
                autoComplete="tel"
                placeholder="Enter Your Phone Number..."
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password..."
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
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
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                Password Confirmation
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="confirm"
                  placeholder="Confirm Your Password..."
                  autoComplete="current-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
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
            </div>

            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-orange-600 focus:ring-blue-orange border-gray-300 rounded-lg"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700"
              >
                Sign Up
              </button>
              <p className="my-3 block text-center text-gray-400">
                By clicking Signup or Login<br />I agree to <span className="text-orange-600">ETFA2NA'S</span> terms of service and privacy policy
              </p>
              <p className="my-4 text-center text-gray-400">
              <p className="ml-[-203px] mt-[-29px]"> _______________ </p><span className="absolute mt-[-19px] ml-[-5px]">OR</span> <p  className="ml-[220px] mt-[-26px]" >______________</p> 
              </p>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4 className="my-  text-center mt-[-30px] ml-[-203px]">Already have an account?</h4>
              <Link to="/login" className="text-orange-600 pl-2 ml-[330px] underline">
                Log in
              </Link>
            </div>
            <div className="social-media-icon justify-center mt-[20px] ml-[30px] ">
              <ul className=" flex gap-5 ml-[95px]w-[180px] h-[100px] ml-[40px] " >
                <li><img src={google} alt="Google" className=" cursor-pointer" /></li>
                <li><img src={facebook} alt="Facebook" className=" cursor-pointer" /></li>
                <li><img src={twitter} alt="Twitter" className=" cursor-pointer" /></li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sign;
