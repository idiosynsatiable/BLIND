import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { checkoutRouter } from "./api/checkout.js";
import { webhookRouter } from "./api/webhook.js";
import { sponsorInquiryRouter } from "./api/sponsor-inquiry.js";
import { stripeCheckoutRouter } from "./api/stripe-checkout.js";
import { stripeWebhookRouter } from "./api/stripe-webhook.js";
import { healthRouter } from "./api/health.js";
import { getStripeClient } from "./lib/stripe.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize Stripe client and verify account
  try {
    await getStripeClient();
    console.log("[Server] Stripe account verified successfully");
  } catch (error) {
    console.error("[Server] Stripe initialization failed:", error);
    process.exit(1);
  }

  // API Routes
  app.use("/api", healthRouter);
  app.use("/api", checkoutRouter);
  app.use("/api", webhookRouter);
  app.use("/api", sponsorInquiryRouter);
  app.use("/api", stripeCheckoutRouter);
  app.use("/api", stripeWebhookRouter);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`API routes available at http://localhost:${port}/api/`);
  });
}

startServer().catch(console.error);
