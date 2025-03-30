"use client"
import React, { useRef } from 'react'
import { RecoilRoot } from 'recoil'
import {SessionProvider} from 'next-auth/react'
import { AppStore, makeStore } from '../store/store'
import { Provider } from 'react-redux'

const Providers = ({children}: {children: React.ReactNode}) => {
  const storeRef = useRef<AppStore>(undefined)
  if(!storeRef.current) {
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>
    <SessionProvider>
    {children}
    </SessionProvider>
  </Provider>
}

export default Providers
