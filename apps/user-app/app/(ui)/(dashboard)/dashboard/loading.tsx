import React from 'react'
import SkeletonCard from '@repo/ui/skeletoncard'
import { Card } from '@repo/ui/card'

const loading = () => {
  return (
    <div className="flex flex-col gap-16 p-8 w-full">
    <div>
    <div className="w-full max-h-fit p-4">
  <div className="flex animate-pulse space-x-4">
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 w-64 rounded bg-gray-200"></div>
        <div className="h-2 w-32 rounded bg-gray-200"></div>
    </div>
  </div>
</div>
    </div>
    <div className="rounded-xl p-5 text-white w-full ">
     <SkeletonCard/>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      
      <Card title={"Overview"}>
        <div className="flex gap-2 items-center pb-8 pt-8">
        <SkeletonCard/>
        </div>
      </Card>
      <Card title={"Top Transactions"}>
        <SkeletonCard/>
      </Card>
    </div>
  </div>
  )
}

export default loading
