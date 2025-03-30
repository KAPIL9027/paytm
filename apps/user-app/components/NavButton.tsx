"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import ChevronRight from './icons/ChevronRight'

const NavButton = ({text,href}: {text: string,href: string}) => {
    const router = useRouter()
  return (
    <button className="flex items-center px-[15px] gap-1 md:px-11 md:gap-2 w-[120px] h-[33px] md:w-[193px] md:h-[53px] bg-[#0038D9] text-xs md:text-sm font-medium rounded-lg cursor-pointer" onClick={()=> {router.push(href)}}><span>{text}</span><span>{<ChevronRight width="12px" height="12px"/>}</span></button>
  )
}

export default NavButton
