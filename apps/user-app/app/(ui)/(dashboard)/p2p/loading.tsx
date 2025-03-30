import React from 'react'
import SkeletonCard from '@repo/ui/skeletoncard'
import { Card } from '@repo/ui/card'
const loading = () => {
  return (
    <div className="w-screen md:grid md:gap-4 lg:grid-cols-2 p-4">
      <div className="mt-4">
        <Card title="Send Money">
        <SkeletonCard />
        </Card>
      </div>
      <div className="p-4">
      <Card title="Recent Transactions">
      <SkeletonCard />
      </Card>
      </div>
    </div>
  )
}

export default loading
