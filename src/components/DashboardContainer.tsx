import { ReactElement, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { checkIfActive } from '../utils/apps.utils';
import { useClickOutside } from "../hooks/useClickOutside";

import { WalletIcon, MenuIcon, ProviderIcon, Settings } from './icons';
import HomeIcon from './icons/Home';

export default function DashboardContainer({ children }: PropTypes) {
  const [sideBarState, toggleSideBarState] = useState<boolean>(true);

  const { slug } = useParams();

  const sideBarNode = useClickOutside(() => {
    toggleSideBarState(true)
  }, 'sidebar-btn')

  const toggleSideBar = () => toggleSideBarState(!sideBarState);


  return (
    <div className='flex bg-slate-100'>
      <div className={`flex flex-shrink-0 flex-col justify-between md:sticky fixed inset-y-0 left-0 transform ${sideBarState ? '-translate-x-full' : ''} md:translate-x-0 transition duration-200 ease-in-out top-0 h-screen bg-slate-100 z-10`} ref={sideBarNode}>
        <div className='flex flex-col w-56'>
          <div className='pl-7 pt-5'>
            <h3 className='text-xl font-semibold'>Soyoyo</h3>
            <span>Hi, Oye</span>
          </div>
          <div className='py-5 px-4 mt-3'>
            <ul className='flex flex-col gap-3'>
              <li>
                <Link to={`/app/home/${slug}`} className={`flex flex-row gap-2 w-full items-center hover:bg-gray-200 ${checkIfActive(`/app/home/${slug}`) ? "bg-gray-200 font-semibold" : ""} hover:font-semibold rounded px-3 py-2 transition-all duration-200`}>
                  <HomeIcon />
                  <span className="text-[0.9rem]">Home</span>
                </Link>
              </li>
              <li>
                <Link to={`/app/payment_page/${slug}`} className={`flex flex-row gap-2 w-full items-center hover:bg-gray-200 ${checkIfActive(`/app/payment_page/${slug}`) ? "bg-gray-200 font-semibold" : ""} hover:font-semibold rounded px-3 py-2 transition-all duration-200`}>
                  <WalletIcon />
                  <span className="text-[0.9rem]">Pages</span>
                </Link>
              </li>
              <li>
                <Link to={`/app/providers/${slug}`} className={`flex flex-row gap-2 w-full items-center hover:bg-gray-200 ${checkIfActive(`/app/providers/${slug}`) ? "bg-gray-200 font-semibold" : ""} hover:font-semibold rounded px-3 py-2 transition-all duration-200`}>
                  <ProviderIcon />
                  <span className="text-[0.9rem]">Providers</span>
                </Link>
              </li>
              <li>
                <Link to={`/app/settings/${slug}`} className={`flex flex-row gap-2 w-full items-center hover:bg-gray-200 ${checkIfActive(`/app/settings/${slug}`) ? "bg-gray-200 font-semibold" : ""} hover:font-semibold rounded px-3 py-2 transition-all duration-200`}>
                  <Settings />
                  <span className="text-[0.9rem]">Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='px-5 py-3 mb-4 mx-5 bg-gray-200 rounded text-center font-semibold'>
          Version 1.0
        </div>
      </div>
      <div className='flex flex-col w-0 flex-1 overflow-hidden bg-white'>
        <span onClick={toggleSideBar} id="sidebar-btn" className="md:hidden pl-5 pt-4"><MenuIcon /></span>
        {children}
      </div>
    </div>
  )
}

interface PropTypes {
  children?: ReactElement;
}