import React, { useEffect } from 'react'

let timerId: any = undefined;
const toast = ({type,message,close}:{type: string,message:string,close:()=> void}) => {
    useEffect(()=>{
        clearTimeout(timerId)
        timerId = setTimeout(()=>{
            close()
        },10000)
        return ()=> clearTimeout(timerId)

    },[type,message])
  return (
    <div className={`flex justify-between items-center w-[95%] md:w-[50vw] p-3 text-sm font-normal rounded-md z-10 fixed top-3 left-1/2 transform -translate-x-1/2 ${type === 'success' ? 'bg-green-400' : 'bg-red-500'} text-white text-lg`}>
        <h1>{message}</h1>
        <span className="cursor-pointer" onClick={close}>X</span>
    </div>
  )
}

export default toast
