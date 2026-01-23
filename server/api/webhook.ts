import { Router } from "express";

/**
 * POST /api/webhook
 * Handles Stripe webhook events (payment_intent.succeeded, etc).
 * 
 * Stripe sends webhooks with signature verification.
 * In production:
 * 1. Verify webhook signature using Stripe SDK
 * 2. Handle payment_intent.succeeded event
 * 3. Log donation to database or email service
 * 4. Send confirmation email to donor
 */
export const webhookRouter = Router();

webhookRouter.post("/webhook", async (req, res) => {
  try {
    const event = req.body;

    // TODO: Verify Stripe signature
    // const sig = req.headers["stripe-signature"];
    // const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("Payment succeeded:", event.data.object);
        // TODO: Log donation, send confirmation email
        break;
      case "payment_intent.payment_failed":
        console.log("Payment failed:", event.data.object);
        // TODO: Handle failed payment
        break;
      default:
        console.log("Unhandled event type:", event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ error: "Webhook failed" });
  }
});
