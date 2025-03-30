import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../../lib/auth'
import NavButton from '../../../../components/NavButton';
import { Card } from '@repo/ui/card';
import Versusbar from '@repo/ui/versusbar'
import WalletIcon from '../../../../components/icons/WalletIcon';
import db from '@repo/db/client'

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  function getFormattedDate() {
    const date = new Date();
  
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // Jan, Feb, etc.
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    const suffix = getDaySuffix(day);
  
    return `${day}${suffix} ${month} ${year} • ${hours}:${minutes}`;
  }

  const getBalance = async ()=>{
    const balance = await db.balance.findFirst({
      where: {
        userId: Number(session?.user?.id)
      }
    });
    return balance?.amount;
  }
  
  function getDaySuffix(day: number) {
    if (day >= 11 && day <= 13) return "th"; // Handle 11th, 12th, 13th
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }
  const getTransfers = async () => {
    const transfers = await db.user.findFirst({
      where: {
        id: Number(session?.user?.id),
      },
      select: {
        sentTransfers: true,
        receivedTransfers: true,
        OnRampTransaction: true,
      },
    });
    return transfers;
  };
  const getP2PTransactions = async ()=> {
    const p2pTransactions = await db.p2pTransfer.findMany({
      take: 5,
      where: {
        fromUserId: Number(session?.user?.id)
      },
      select: {
        amount: true,
        timestamp: true,
        ToUser: {
          select: {
            number: true
          }
        }
      }
    });
    return p2pTransactions.filter((txn:  {
      amount: number;
      timestamp: Date;
      ToUser: {
          number: string;
      };
  })=> txn.amount > 0)
  }
  let transactions = await getTransfers();
  let p2pTransactions = await getP2PTransactions();
  let userTransactions = transactions
    ? [...transactions?.receivedTransfers, ...transactions?.sentTransfers]?.map(
        (txn: any) => {
          return {
            amount: txn.amount,
            time: txn.timestamp,
            type: txn.fromUserId === Number(session?.user?.id) ? "Sent" : "Received",
            status: "Success",
          };
        }
      )
    : [];
  let onRampTransactions =
    transactions?.OnRampTransaction.map((txn:any) => {
      return {
        amount: txn.amount,
        time: txn.startTime,
        type: "Received",
        status: txn.status,
      };
    }) ?? [];
  let overallTransactions = [...userTransactions, ...onRampTransactions];
  const totalMoney = overallTransactions.reduce((partialSum:number,txn:any)=> partialSum + txn.amount,0)
  const moneyMade = overallTransactions.filter((txn:any)=> txn.type === "Received").reduce((partialSum:number,txn:any)=> partialSum + txn.amount,0);
  const balance: number | undefined = await getBalance();

  return (
    <div className="flex flex-col gap-16 p-8 w-full">
      <div>
      <h1 className="text-[#01002E] text-2xl md:text-3xl font-medium">Welcome {session?.user?.name}👌🏼</h1>
      <p className="text-sm font-normal text-[#8C8C8C]">{getFormattedDate()}</p>
      </div>
      <div style={{background: "linear-gradient(35deg, #0047FF, #7A5AF8)"}} className="rounded-xl p-5 text-white w-full ">
        <div className="flex flex-col gap-4">
          <h2 className="font-normal text-sm">Hi {session?.user?.name}, here is your balance:</h2>
          <p className="font-bold text-3xl">INR {balance!/100}</p>
          <div className="flex gap-4">
        <NavButton text={"Add Money"} href={"/transfer"}/>
        <NavButton text={"Send Money"} href={"/p2p"}/>
      </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        <Card title={"Overview"}>
          <div className="flex gap-2 items-center pb-8 pt-8">
            <WalletIcon width="102px" height="102px"/>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex w-full justify-between text-sm text-[#01002E]">
                <p className="font-normal">Cashflow</p>
                <p className="font-bold">INR {totalMoney/100}</p>
              </div>
              <div>
                <Versusbar totalMoney={totalMoney === 0 ? 1 : totalMoney} moneyMade={moneyMade === 0 ? 1 : moneyMade}/>
              </div>
              <p className="text-[11px] font-normal text-[#4F4F4F]">
                {totalMoney === 0 ? "You haven't made any transactions as of now" : moneyMade < (totalMoney - moneyMade) ? 'More money left than you made' : 'You are getting richer! keep it up!'}
              </p>
            </div>
          </div>
        </Card>
        <Card title={"Top Transactions"}>
          {!p2pTransactions ? (<div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>) : (
              <div className="pt-2">
              {p2pTransactions.map((t:any) => <div key={`${t.timestamp}`} className="flex justify-between">
                      <div>
                          <div className="text-sm">
                              Sent INR to {t.ToUser?.number}
                          </div>

                          <div className="text-slate-600 text-xs">
                              {t.timestamp.toDateString()}
                          </div>
                      </div>
                      <div className="flex flex-col justify-center">
                      {"-"} Rs {t.amount / 100}
                      </div>
      
                  </div>)}
            </div>
            )}
        </Card>
      </div>
    </div>
  )
}

export default Dashboard