# Shine in the Darkness — Auth + Stripe Premium Integration Runbook

## Overview

This runbook covers setup, configuration, and deployment of the integrated Auth + Stripe Premium system for Shine in the Darkness.

## 1. Environment Variables

### Required Environment Variables

Create a `.env.local` file in the project root with the following:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# Application
VITE_APP_URL=http://localhost:3000
APP_URL=http://localhost:3000
```

### Environment Variable Descriptions

| Variable | Type | Description |
|----------|------|-------------|
| `VITE_SUPABASE_URL` | Public | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Public | Supabase anonymous key (for client) |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Supabase service role key (server only) |
| `VITE_STRIPE_PUBLIC_KEY` | Public | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Secret | Stripe secret key (server only) |
| `STRIPE_WEBHOOK_SECRET` | Secret | Stripe webhook signing secret |
| `STRIPE_PRICE_ID` | Public | Stripe subscription price ID |
| `VITE_APP_URL` | Public | Application URL (for redirects) |
| `APP_URL` | Secret | Application URL (server-side) |

## 2. Supabase Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the project URL and anon key to `.env.local`
4. Generate a service role key from Settings → API

### Run Schema Migration

1. Go to Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy and paste the contents of `SCHEMA.sql`
4. Execute the query

This creates:
- `subscriptions` table (tracks user subscription status)
- `donations` table (tracks donation history)
- Row Level Security (RLS) policies
- Indexes for performance

### Enable Auth

1. Go to Authentication → Providers
2. Enable Email provider
3. Configure email templates (optional)

## 3. Stripe Setup

### Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Create an account and verify email
3. Go to Dashboard → API keys
4. Copy the publishable key (starts with `pk_`) to `VITE_STRIPE_PUBLIC_KEY`
5. Copy the secret key (starts with `sk_`) to `STRIPE_SECRET_KEY`

### Create Subscription Price

1. Go to Products → Create product
2. Name: "Shine Premium"
3. Add a price:
   - Billing period: Monthly
   - Price: $9.99 (or your desired amount)
   - Currency: USD
4. Copy the Price ID (starts with `price_`) to `STRIPE_PRICE_ID`

### Configure Webhook

1. Go to Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.com/api/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

## 4. Local Development

### Install Dependencies

```bash
pnpm install
```

### Start Dev Server

```bash
pnpm dev
```

The app will run at `http://localhost:3000`.

### Test Stripe Checkout (Test Mode)

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Expiry: Any future date
CVC: Any 3-digit number

## 5. Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy

### Deploy to Other Platforms

For Netlify, Railway, or other platforms:
1. Set environment variables in platform dashboard
2. Set build command: `pnpm build`
3. Set start command: `pnpm start`

### Update Stripe Webhook

After deployment, update the webhook endpoint in Stripe:
1. Go to Developers → Webhooks
2. Edit the endpoint
3. Change URL to: `https://your-production-domain.com/api/stripe-webhook`

## 6. Monitoring

### Check Stripe Webhooks

1. Go to Developers → Webhooks
2. Click on your endpoint
3. View recent deliveries and responses

### Check Supabase Logs

1. Go to Supabase Dashboard → Logs
2. Filter by API or Database
3. Look for errors in webhook handlers

### Check Application Logs

For Vercel: Dashboard → Deployments → Logs
For other platforms: Check platform-specific logging

## 7. Troubleshooting

### Webhook Not Triggering

1. Verify webhook endpoint is accessible from the internet
2. Check `STRIPE_WEBHOOK_SECRET` is correct
3. Verify events are selected in Stripe dashboard
4. Check application logs for errors

### Subscription Not Updating

1. Verify `SUPABASE_SERVICE_ROLE_KEY` is set
2. Check Supabase RLS policies allow service role
3. Verify `subscriptions` table exists and has correct schema
4. Check application logs for database errors

### Checkout Not Working

1. Verify `STRIPE_PUBLIC_KEY` and `STRIPE_PRICE_ID` are set
2. Check browser console for errors
3. Verify Stripe account is in test mode (for testing)
4. Check Stripe dashboard for failed charges

## 8. Security Checklist

- [ ] All secrets are in `.env.local` (not committed to git)
- [ ] `.env.local` is in `.gitignore`
- [ ] Supabase RLS policies are enabled
- [ ] Stripe webhook signature is verified
- [ ] API keys are rotated regularly
- [ ] HTTPS is enforced in production
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled on API routes

## 9. Maintenance

### Regular Tasks

- Monitor Stripe dashboard for failed payments
- Check Supabase logs for errors
- Review webhook delivery logs
- Test checkout flow monthly

### Backup

- Export Supabase data regularly
- Keep Stripe API keys secure
- Document any customizations

## 10. Support

For issues:
1. Check application logs
2. Check Stripe dashboard
3. Check Supabase dashboard
4. Review this runbook
5. Contact support for your platform
