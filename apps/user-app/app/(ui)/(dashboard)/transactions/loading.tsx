import React from 'react'
import SkeletonCard from '@repo/ui/skeletoncard'
import { Card } from '@repo/ui/card'
const loading = () => {
  return (
    <div className="mx-auto my-10">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
          Successful Transactions
        </div>
        <Card title="Recent Transactions">
        <SkeletonCard/>
        </Card>
        
    </div>
    
  )
}

export default loading
