import zod from "zod"
export const paymentData = zod.object({
    user_identifier: zod.string(),
    amount: zod.string(),
    webhookUrl: zod.string()
});
