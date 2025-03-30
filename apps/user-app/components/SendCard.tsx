"use client"
import {Button} from "@repo/ui/button";
import {Card} from "@repo/ui/card";
import TextInput from "@repo/ui/textinput";
import {useState} from "react"
import { p2pTransfer } from "../lib/actions/p2pTransfer";
import Toast from "@repo/ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setOpenToast } from "../store/features/openToast/openToastSlice";

const SendCard = () => {
    const [number,setNumber] = useState("");
    const [amount,setAmount] = useState("");
    const [type,setType] = useState("");
    const openToast = useSelector((state: RootState)=> state.openToast.value);
    const [msg, SetMsg] = useState("")
    const dispatch = useDispatch()
  return (
    <div className="p-4">
        {openToast && <Toast type={type} message={msg} close={()=>{dispatch(setOpenToast(false))}}/>}
        <Card title="Send">
            <div className="min-w-62 pt-2">
                <TextInput placeholder={"Number"} label="Number" onChange={(value)=> {
                    setNumber(value)
                }}/>
                <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                    setAmount(value)
                }}/>
                <div className="pt-4 flex justify-center">
                    <Button onClick={async ()=> {
                        try{
                            if(Number(amount) <= 0) {
                                setType("error");
                                SetMsg("Amount cannot lesser or equal to zero.")
                                dispatch(setOpenToast(true))
                                return;
                            }
                            if(!number || !(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(number))) {
                                setType("error");
                                SetMsg("Please enter a valid number!");
                                dispatch(setOpenToast(true))
                                return;
                            }
                            const data = await p2pTransfer(number,Number(amount)*100);
                            if(data?.message){
                                setType("error");
                                SetMsg("One or Both the users don't exist!");
                            }
                            else
                            {
                                setType("success");
                                SetMsg("Successfully transfered the money!");
                            }
                            dispatch(setOpenToast(true))
                        }
                        catch(e){
                            setType("error");
                            SetMsg("Insufficient Balance!")
                            dispatch(setOpenToast(true))
                        }
                       
                    }}>Send</Button>
                </div>
            </div>
        </Card>
    </div>
  )
}

export default SendCard
