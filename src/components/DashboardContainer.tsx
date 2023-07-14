import { ReactElement, useReducer } from 'react'
import { Link, useParams } from 'react-router-dom';
import { checkIfActive, redirectUrl } from '../utils/apps.utils';
import { useClickOutside } from "../hooks/useClickOutside";
import { clearSessionStorage } from '../hooks';
import { WalletIcon, MenuIcon, ProviderIcon, Settings } from './icons';
import HomeIcon from './icons/Home';
import { Button } from './Button';
import Modal from './Modal';

export default function DashboardContainer({ children }: PropTypes) {
  const initState = { logoutModal: false, sideBarState: true }

  const { slug } = useParams();

  const toggleSideBar = () => updateModals({ sideBarState: !modals.sideBarState });

  const sideBarNode = useClickOutside(() => {
    toggleSideBar()
  }, 'sidebar-btn')

  const [modals, updateModals] = useReducer((prev: typeof initState, next: Partial<typeof initState>): typeof initState => {
    return { ...prev, ...next }
  }, initState)

  const toggleConfirmLogout = () => updateModals({ logoutModal: !modals.logoutModal })

  const logoutUser = () => {
    clearSessionStorage()
    redirectUrl("/app/sign_in")
  }

  return (
    <div className='flex bg-slate-100'>
      <div className={`flex flex-shrink-0 flex-col justify-between md:sticky fixed inset-y-0 left-0 transform ${modals.sideBarState ? '-translate-x-full' : ''} md:translate-x-0 transition duration-200 ease-in-out top-0 h-screen bg-slate-100 z-10`} ref={sideBarNode}>
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
        <div className='my-10 flex flex-col px-5 py-3'>
          <Button size='non-full' onClick={toggleConfirmLogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className='flex flex-col w-0 flex-1 overflow-hidden bg-white'>
        <span onClick={toggleSideBar} id="sidebar-btn" className="md:hidden pl-5 pt-4"><MenuIcon /></span>
        {children}
      </div>
      <Modal isShown={modals.logoutModal} onClose={toggleConfirmLogout}>
        <>
          <p className='text-center'>Are you sure you want to logout?</p>
          <div className='flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-2 mt-5'>
            <Button onClick={logoutUser} loading={false}>Yes</Button>
            <Button variant='outline' onClick={toggleConfirmLogout}>No, take me back.</Button>
          </div>
        </>
      </Modal>
    </div>
  )
}

interface PropTypes {
  children?: ReactElement;
}