import {Card} from "@repo/ui/card"

import React from 'react'

const OnRampTransaction = ({
    transactions
} : {
    transactions: {
        time: Date,
        amount: number,
        status?: string,
        provider?: string,
        type?: string
    }[]
}) => {
    if(!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
  return (
    <Card title="Recent Transactions">
        <div className="pt-2">
        {transactions.map(t => <div key={`${t.time}`} className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {t.type ? t.type : 'Received'} INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                {t.type ? t.type === 'Received' ? '+' : '-' : '+'} Rs {t.amount / 100}
                </div>

            </div>)}
      </div>
    </Card>
    
  )
}

export default OnRampTransaction
