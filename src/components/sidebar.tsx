"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import nookies from 'nookies';
import { readTokenFromCookie } from '@/utils/auth';
import { TbLogout } from 'react-icons/tb';
import { RxHamburgerMenu } from "react-icons/rx";
import './sidebar.css';

const routes = [
  {
    displayName: 'Home',
    href: '/home',
    icon: '/icons8-accueil-50.png',
    coachAccess: true,
  },
  {
    displayName: 'Coaches',
    href: '/coaches',
    icon: '/icons8-entraîneur-64.png',
    coachAccess: false,
  },
  {
    displayName: 'Customers',
    href: '/customers',
    icon: '/icons8-utilisateur-sexe-neutre-50.png',
    coachAccess: true,
  },
  {
    displayName: 'Astro',
    href: '/astro',
    icon: '/icons8-été-48.png',
    coachAccess: true,
  },
  {
    displayName: 'Statistics',
    href: '/statistics',
    icon: '/icons8-graphique-50.png',
    coachAccess: false,
  },
  {
    displayName: 'Tips',
    href: '/tips',
    icon: '/icons8-question-mark-60.png',
    coachAccess: true,
  },
  {
    displayName: 'Events',
    href: '/events',
    icon: '/icons8-événement-48.png',
    coachAccess: true,
  },
  {
    displayName: 'Clothing',
    href: '/clothes',
    icon: '/icons8-clothes-60.png',
    coachAccess: true,
  },
];

export default function Sidebar({ onCollapseChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const token = readTokenFromCookie();

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
    onCollapseChange(); // Notify parent component about the state change
  };

  const handleLogout = () => {
    nookies.destroy(null, 'JWT');
    router.push('/login');
  };

  return (
    <div className={`bg-white h-screen ${isCollapsed ? 'w-20' : 'w-64'} ${isCollapsed ? 'items-center' : ''} border border-gray-200 shadow-md rounded-lg p-8 fixed flex flex-col justify-between transition-width duration-300 ease-in-out`}>
      <button
        onClick={handleCollapseToggle}
        className="focus:outline-none text-black w-fit"
      >
        <RxHamburgerMenu size={28}/>
      </button>
      <div className="flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="logo"
          width={isCollapsed ? 50 : 150}
          height={isCollapsed ? 50 : 150}
          className={`mx-auto max-w-none ${isCollapsed ? 'my-2 logo-icon-collapsed' : 'logo-icon'} duration-300`} 
        />
      </div>
      <div className="mt-8 div-items">
        {routes.map((route, index) => (
          (route.coachAccess || token?.work !== 'Coach') && (
            <div key={index} className="mb-2">
              <button
                onClick={() => router.push(route.href)}
                className={`text-blue-500 flex items-center group transition-transform transform ${isCollapsed ? '' : 'hover:translate-x-2'} hover:scale-110 duration-300 ease-in-out py-5 link-items`}
              >
                <Image
                  src={route.icon}
                  alt={route.displayName}
                  width={24}
                  height={24}
                  className={`small-screen-icon ${isCollapsed ? '' : 'mr-4'} group-hover:scale-110 transition-transform duration-300 ease-in-out max-w-none`}
                />
                {!isCollapsed && (
                  <p className="small-screen-text text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 ease-in-out">
                    {route.displayName}
                  </p>
                )}
              </button>
              <hr className="border-t-2 border-gray-200" />
            </div>
          )
        ))}
      </div>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className={`w-full bg-red-500 text-white ${isCollapsed ? 'p-2' : 'py-2 px-4'} rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors transform hover:scale-105 duration-300 ease-in-out`}
        >
          <TbLogout />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </div>
  );
}
