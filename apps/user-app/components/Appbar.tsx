"use client"
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Appbar from '@repo/ui/appbar'
import React from 'react'
import HamburgerIcon from './icons/HamburgerIcon';
import { setValue } from '../store/features/openModal/openModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Hamburger from './Hamburger';

const AppbarClient = () => {

    const session = useSession();
    const openModal = useSelector((state: RootState) => state.openModal.value)
    const dispatch = useDispatch()
    const router = useRouter();
    const onClick: (e: Event)=> void = (e: Event)=>{
      dispatch(setValue(!openModal))
    }
  return (
    <div>
      <Appbar user={session.data?.user} handleClick={onClick} hamburgerIcon={<HamburgerIcon/>} onSignin={signIn} onSignout={async ()=> {
        await signOut({redirect: true,callbackUrl: '/api/auth/signin'})
        router.push('/api/auth/signin')
      }}/>
      <Hamburger/>
    </div>
  )
}

export default AppbarClient
