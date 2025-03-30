import SendCard from "../../../../components/SendCard";
import OnRampTransaction from "../../../../components/OnRampTransaction";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

const getTransfers = async () => {
  const session = await getServerSession(authOptions);
  const transfers: any = await db.user.findFirst({
    where: {
      id: Number(session?.user?.id),
    },
    select: {
      sentTransfers: true,
      receivedTransfers: true,
    },
  });
  return transfers;
};
const P2PTransfer = async () => {
  const transfers = await getTransfers();
  const session = await getServerSession(authOptions);
  const transfersArray = [
    ...transfers.sentTransfers,
    ...transfers.receivedTransfers,
  ];

  return (
    
    <div className="w-screen md:grid md:gap-4 lg:grid-cols-2 p-4">
      <div>
        <SendCard />
      </div>
      <div className="p-4">
        <OnRampTransaction
          transactions={transfersArray?.map((tx) => {
            return {
              time: tx.timestamp,
              amount: tx.amount,
              type: tx.fromUserId === session?.user?.id ? "Received" : "Sent",
            };
          })}
        />
      </div>
    </div>
  );
};

export default P2PTransfer;
