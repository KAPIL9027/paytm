import React from 'react'
import SidebarItem from './SidebarItem'
import HomeIcon from './icons/HomeIcon'
import TransferIcon from './icons/TransferIcon'
import TransactionsIcon from './icons/TransactionIcon'
import P2PTransferIcon from './icons/P2PTransferIcon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import {setValue} from '../store/features/openModal/openModalSlice';
const Hamburger = () => {
  const openModal = useSelector((state: RootState)=> state.openModal.value)
  const dispatch = useDispatch()
  const handleOnClick = ()=>{dispatch(setValue(false))}
  return (
    <div className={`${openModal ? 'block' : 'hidden'} fixed top-0 left-0 z-10 bg-white w-full min-h-screen flex flex-col justify-center items-center`}>
    <div onClick={handleOnClick} className="-ml-10">
    <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
    <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Transfer" />
    <SidebarItem href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" />
    <SidebarItem href={"/p2p"} icon={<P2PTransferIcon />} title="P2P Transfer" />
    </div>
    <div className="fixed right-4 top-4 text-[#6a51a6] cursor-pointer" onClick={handleOnClick}>X</div>
</div>
  )
}

export default Hamburger
