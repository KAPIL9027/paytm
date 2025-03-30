import { JSX } from "react";
import SidebarItem from "../../../components/SidebarItem";
import HomeIcon from "../../../components/icons/HomeIcon";
import TransferIcon from "../../../components/icons/TransferIcon";
import TransactionsIcon from "../../../components/icons/TransactionIcon";
import P2PTransferIcon from "../../../components/icons/P2PTransferIcon";

export default function Layout({
    children
}: {
    children: React.ReactNode
}) : JSX.Element{
    return (
        <div className="flex">
            <div className="hidden sm:block w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
                <div>
                <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
                <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Transfer" />
                <SidebarItem href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" />
                <SidebarItem href={"/p2p"} icon={<P2PTransferIcon />} title="P2P Transfer" />
                </div>
            </div>
            {children}
        </div>
    )
}






