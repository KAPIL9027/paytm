import React, { ChangeEvent, useState } from 'react'
import Visible from './icons/Visible'
import Hidden from './icons/Hidden'

const FormInput = ({label,placeholder,value,LabelIcon,name,type,onChange}:{label: string, placeholder: string, type: string,value: string,name: string,LabelIcon: React.ReactNode,onChange: (e: ChangeEvent<HTMLInputElement>)=> void}) => {
  const [inputType,setInputType] = useState<string>(type);
  const onClick = ()=>{
    if(inputType === "password")
    setInputType("text")
    else
    setInputType("password")
  }
  return (
    <div className="w-full h-12 bg-[#ECECEC] flex gap-2 py-1 px-2 rounded-lg relative">
      <div className="flex flex-col justify-center">{LabelIcon}</div>
      <div className="w-full flex flex-col">
        <label className="text-[10px] font-normal text-[#2F2F2F]">{label}</label>
        <input placeholder={placeholder} className="text-black font-bold text-sm outline-none focus:outline-none" type={inputType} id={name} name={name} value={value} onChange={onChange} autoFocus={true}></input>
      </div>
      {inputType === "password" ? <div onClick={onClick} className="absolute top-5 right-2"><Visible width="12" height="12"/></div> : (name=== "password") ? <div onClick={onClick} className="absolute top-5 right-2"><Hidden width="12" height="12"/></div> : ''}
    </div>
  )
}

export default FormInput
