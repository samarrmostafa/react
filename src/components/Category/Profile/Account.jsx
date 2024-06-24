import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { TbExchange } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import photooo from '../../../Assests/photooo.jpg';

const Account = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto border border-gray-300 rounded-lg p-5 shadow-lg bg-white">
        <div className="flex-1 pr-0 md:pr-5 mb-5 md:mb-0">
          <h2 className="text-3xl font-semibold mb-5 text-gray-800">My Profile</h2>
          <hr className="mb-5" />
          <div className="space-y-4">
            <button className="flex items-center p-3 w-full text-lg border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition duration-300">
              <TbExchange className="mr-2" />
              <Link to="/ChangePasswordpage">Change Password</Link>   
            </button>
            <button className="flex items-center p-3 w-full text-lg border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition duration-300">
              <TiDeleteOutline className="mr-2" />
              Deactivate Account
            </button>
            <button className="flex items-center p-3 w-full text-lg border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition duration-300">
              <RiDeleteBinLine className="mr-2" />
              Delete Account
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center pl-0 md:pl-5">
          <img src={photooo} alt="Profile" className="w-36 h-36 rounded-full object-cover border-4 border-gray-300 mb-5" />
          <h3 className="text-2xl font-semibold text-gray-800">Fady Kamel</h3>
        </div>
      </div>
    </div>
  );
}

export default Account;
