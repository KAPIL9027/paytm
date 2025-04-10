import { NextResponse } from "next/server";
import { paymentData } from "../../../lib/zodSchema";
import axios from 'axios';
import '../../envConfig.ts'
import jwt from 'jsonwebtoken';
export const POST = async (request: Request)=>{
    const data = await request.json();
    const {success} = paymentData.safeParse(data);
    console.log('data',data)
    if(!success){
        return NextResponse.json({
            message: "Incorrect data provided!"
        },{
            status: 403
        })
    }
    const token = jwt.sign(data,process.env.JWT_SECRET!);
    const response: { message: string} = await axios.post(process.env.NEXT_PUBLIC_WEBHOOK_URL!,{
        user_identifier: data.user_identifier,
       amount: data.amount,
       token,
       secret: process.env.WEBHOOK_SECRET!
   });
    if(response.message === 'Captured')
        return NextResponse.json({
            message: "Success"
        })
    return NextResponse.json({
        message: "Something went wrong!"
    })
    
    
}