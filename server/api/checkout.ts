import { Router } from "express";

/**
 * POST /api/checkout
 * Creates a Stripe Checkout Session for donations.
 * 
 * Request body:
 * - amount: number (in dollars, e.g., 25 for $25)
 * 
 * Response:
 * - url: string (Stripe Checkout URL)
 */
export const checkoutRouter = Router();

checkoutRouter.post("/checkout", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // For MVP: Return a placeholder response
    // In production, integrate with Stripe SDK:
    // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({...});
    // return res.json({ url: session.url });

    const mockUrl = `https://checkout.stripe.com/pay/mock_${Date.now()}`;
    return res.json({ url: mockUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ error: "Checkout failed" });
  }
});
