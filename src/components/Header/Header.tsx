import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <div className="navbar bg-gray-300">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-gray-700 flex items-center">
            <img 
              src="https://w7.pngwing.com/pngs/511/97/png-transparent-ul-northbrook-manufacturing-organization-certification-others-miscellaneous-company-text-thumbnail.png" 
              alt="logo" 
              className="w-10 rounded-lg"
            />
            Users List
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle hover:bg-gray-100">
              <div className="indicator">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item">
                </span>
              </div>
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost btn-circle avatar mr-4"
            >
              <div className="w-10 rounded-full">
                <img 
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" 
                /> 
              </div>
            </div>
            <ul 
              tabIndex={0} 
              className=" bg-gray-200 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-44"
            >
              <li>
                <a className="justify-between hover:bg-gray-100">
                  Profile
                </a>
              </li>
              <li>
                <a className="hover:bg-gray-100">
                  Settings
                </a>
              </li>
              <li>
                <Link 
                  to={'/'} 
                  className="hover:bg-gray-100"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
