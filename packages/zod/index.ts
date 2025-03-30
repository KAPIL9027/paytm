import zod from 'zod';

export const hdfcWebhookPaymentInput = zod.object({
    token: zod.string(),
    userId: zod.string(),
    amount: zod.string(),
    secret: zod.string()
})

export type hdfcWebhookPaymentType = zod.infer<typeof hdfcWebhookPaymentInput>;