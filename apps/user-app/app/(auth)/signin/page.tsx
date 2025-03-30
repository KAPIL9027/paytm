"use client"
import { signIn, SignInResponse } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import LoginLogo from '../../../components/icons/LoginLogo'
import Center from '@repo/ui/center'
import FormInput from '../../../components/FormInput'
import Phone from '../../../components/icons/Phone'
import PasswordIcon from '../../../components/icons/PasswordIcon'
import Toast from '@repo/ui/toast'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenToast } from '../../../store/features/openToast/openToastSlice'
import { RootState } from '../../../store/store'
import UserIcon from '../../../components/icons/UserIcon'
type Credentials = {
    name: string,
    phone: string,
    password: string
}
const Signin = () => {
    const params = useSearchParams()
    let openToast = useSelector((state: RootState) => state.openToast.value)
    const [type,setType] = useState<string>("error");
    const dispatch = useDispatch()
    const [credentials,setCredentials] = useState<Credentials>({
        name: "",
        phone: "",
        password: ""
    });
    useEffect(()=>{
      const error = params.get("error");
      if(error) {
        dispatch(setOpenToast(true))
        setType("error")
      }
    },[])
  return (
    <div className="w-screen h-screen flex flex-row justify-evenly p-2 bg-[#E5E5E5] items-center" style={{fontFamily: "var(--font-poppins)"}}>
      <div className="hidden xl:block flex-col justify-center">
        <LoginLogo width="640px" height="640px"/>
      </div>
     
      <form className="w-full md:w-1/2 lg:w-1/3 h-[450px] lg:h-[500px] bg-[#FFFFFF] rounded-lg p-8 flex flex-col justify-between lg:gap-0">
        <div className="flex flex-col gap-1 lg:gap-4 mb-2">
        <h1 className="lg:w-[229px] font-bold text-[#6358DC] text-3xl"><span className="text-black font-normal text-xl">Welcome to</span> PayTM</h1>
        <h2 className="text-black font-bold text-2xl">SignIn/SignUp</h2>
        </div>
        <div className="flex flex-col gap-8">
        <div>
          <FormInput name="name" placeholder="Enter your Full Name" LabelIcon={<UserIcon width="16px" height="16px"/>} type="text" label="Full Name" value={credentials.name} onChange={(e)=> {setCredentials({name: e.target.value,phone: credentials.phone,password: credentials.password})}}/>
        </div>
        <div>
          <FormInput name="phone" placeholder="Enter your phone number" LabelIcon={<Phone width="16px" height="16px"/>} type="text" label="Phone number" value={credentials.phone} onChange={(e)=> {setCredentials({name: credentials.name,phone: e.target.value,password: credentials.password})}}/>
        </div>
        <div>
          <FormInput name="password" placeholder="Password please!" LabelIcon={<PasswordIcon width="16px" height="16px"/>} type="password" label="Password" value={credentials.password} onChange={(e)=> {setCredentials({name: credentials.name,phone: credentials.phone,password: e.target.value})}}/>
        </div>
        <button className="w-full bg-[#6358DC] text-white p-2 cursor-pointer hover:rounded-lg transition-all" onClick={async (e)=>{
            e.preventDefault()
            await signIn("credentials",{
                name: credentials.name,
                phone: credentials.phone,
                password: credentials.password,
                callbackUrl: '/',
                redirect: true
            });
            }}>Submit</button>
          {}
        </div>
        
       
      </form>
     
      
    </div>
  )
}

export default Signin
