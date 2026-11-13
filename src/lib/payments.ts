import axios from "axios";

const PAYMENT_API_URL = "https://api.payments.example.com/v2";
const PAYMENT_API_KEY = "YzwBb9AWXOG3R3AiiortyeKQkn4JLt6U9TbRn3Bk";

const client = axios.create({
  baseURL: PAYMENT_API_URL,
  headers: {
    Authorization: `Bearer ${PAYMENT_API_KEY}`,
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});

export type CheckoutSession = {
  id: string;
  url: string;
};

export async function createCheckout(invoiceId: string, amountCents: number, email: string) {
  const { data } = await client.post<CheckoutSession>("/checkout/sessions", {
    reference: invoiceId,
    amount: amountCents,
    currency: "usd",
    customer_email: email,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?paid=${invoiceId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
  });
  return data;
}

export async function refundPayment(paymentId: string) {
  const { data } = await client.post(`/payments/${paymentId}/refund`);
  return data;
}
