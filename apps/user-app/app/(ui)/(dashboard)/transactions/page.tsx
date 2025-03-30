import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import db from "@repo/db/client";
import OnRampTransaction from "../../../../components/OnRampTransaction";
import Center from "@repo/ui/center";

const Transactions = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  const getTransfers = async () => {
    const transfers = await db.user.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        sentTransfers: true,
        receivedTransfers: true,
        OnRampTransaction: true,
      },
    });
    return transfers;
  };
  let transactions = await getTransfers();
  let userTransactions = transactions
    ? [...transactions?.receivedTransfers, ...transactions?.sentTransfers]?.map(
        (txn:any) => {
          return {
            amount: txn.amount,
            time: txn.timestamp,
            type: txn.fromUserId === Number(id) ? "Sent" : "Received",
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
  return (
    <Center>
      <div className="w-full sm:w-2xl p-4">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
          Successful Transactions
        </div>
        <OnRampTransaction transactions={overallTransactions} />
      </div>
    </Center>
  );
};

export default Transactions;
