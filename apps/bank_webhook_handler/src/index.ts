import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import {hdfcWebhookPaymentInput,hdfcWebhookPaymentType} from '@repo/zod/schema';
import db from '@repo/db/client';
const app = express();
app.use(express.json());

app.post('/hdfcWebhook', async (req:any,res:any)=> {
    const paymentInformation: hdfcWebhookPaymentType= {
        token: req.body?.token,
        userId: req.body?.user_identifier,
        amount: req.body?.amount,
        secret: req.body?.secret
    }
    console.log(req);
    const {success} = hdfcWebhookPaymentInput.safeParse(paymentInformation);
    if(!success){
        return res.status(401).json({
            message: "Incorrect information provided!"
        })
    }
    if(paymentInformation.secret !== process.env.SECRET){
        return res.status(403).json({
            message: "Not Authorized!"
        })
    }

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)*100
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ]);

        return res.json({
            message: "Captured"
        })
    }
    catch(e){
        console.error(e);
        return res.status(411).json({
            message: "Error while processing webhook"
        })
    }


    

})

app.listen('3003',()=>{
    console.log('started at port 3003');
});