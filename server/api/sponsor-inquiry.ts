import { Router } from "express";

/**
 * POST /api/sponsor-inquiry
 * Handles sponsor inquiry form submissions.
 * 
 * Request body:
 * - name: string
 * - organization: string (optional)
 * - email: string
 * - message: string
 * 
 * Response:
 * - success: boolean
 */
export const sponsorInquiryRouter = Router();

sponsorInquiryRouter.post("/sponsor-inquiry", async (req, res) => {
  try {
    const { name, organization, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // TODO: In production, implement:
    // 1. Send email to sponsors@shineinthedarkness.org
    // 2. Log inquiry to database
    // 3. Send confirmation email to user
    // 4. Add spam protection (rate limiting, CAPTCHA)

    console.log("Sponsor inquiry received:", {
      name,
      organization,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Sponsor inquiry error:", error);
    return res.status(500).json({ error: "Failed to process inquiry" });
  }
});
