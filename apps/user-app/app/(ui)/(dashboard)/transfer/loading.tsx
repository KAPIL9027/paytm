import React from 'react'
import SkeletonCard from '@repo/ui/skeletoncard'
import { Card } from '@repo/ui/card'
const loading = () => {
  return (
    <div className="w-screen p-2">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
        <div>
          <Card title="Add Money">
          <SkeletonCard />
          </Card>
          
        </div>
        <div>
        <Card title="Balance">
        <SkeletonCard />
        </Card>
          <div className="pt-4">
          <Card title="Recent Transactions">
          <SkeletonCard />
          </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default loading
