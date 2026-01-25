# Deployment Checklist: Shine in the Darkness

## Pre-Deployment Security & Privacy

### Stripe Integration
- [ ] Set `STRIPE_PUBLIC_KEY` (publishable key)
- [ ] Set `STRIPE_SECRET_KEY` (secret key)
- [ ] Set `STRIPE_WEBHOOK_SECRET` (webhook signing secret)
- [ ] Enable Stripe test mode for staging
- [ ] Configure webhook endpoint in Stripe dashboard: `https://yourdomain.com/api/webhook`
- [ ] Verify webhook signature verification in `server/api/webhook.ts`
- [ ] Test donation flow end-to-end with test card

### Environment Variables
- [ ] Set `APP_URL` to production domain
- [ ] Set `NODE_ENV=production`
- [ ] Verify no secrets are committed to git
- [ ] Use environment variable manager (Vercel, Netlify, etc.)

### Privacy & Compliance
- [ ] Review Privacy Policy for accuracy
- [ ] Review Terms of Service for accuracy
- [ ] Ensure GDPR compliance (data minimization, consent)
- [ ] Verify no PII is logged to console
- [ ] Test that contact forms do not expose email addresses

### Accessibility
- [ ] Run Lighthouse accessibility audit
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Verify keyboard navigation works on all pages
- [ ] Check focus states are visible
- [ ] Verify color contrast meets WCAG AA
- [ ] Test with reduced motion enabled

### Performance
- [ ] Run Lighthouse performance audit
- [ ] Verify images are optimized
- [ ] Check bundle size
- [ ] Test on slow 3G connection

## Deployment Steps

### Option 1: Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Option 2: Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy

### Option 3: Self-Hosted
1. Build: `pnpm build`
2. Start: `NODE_ENV=production node dist/index.js`
3. Set environment variables before starting
4. Use process manager (PM2, systemd) for persistence

## Post-Deployment

- [ ] Verify all pages load correctly
- [ ] Test donation flow with test Stripe card
- [ ] Verify webhook is receiving events
- [ ] Check analytics are tracking
- [ ] Monitor error logs
- [ ] Test on multiple devices and browsers

## Monitoring

- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Set up uptime monitoring
- [ ] Set up email alerts for critical errors
- [ ] Review logs regularly

## Test Stripe Cards (Stripe Test Mode)

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

Use any future date for expiry and any 3-digit CVC.

## Rollback Plan

If issues occur after deployment:
1. Identify the issue
2. Fix in development
3. Test thoroughly
4. Redeploy
5. Verify fix in production

## Security Best Practices

- [ ] Never commit secrets to git
- [ ] Use HTTPS only
- [ ] Enable CORS only for trusted domains
- [ ] Rate limit API endpoints
- [ ] Log all donation transactions
- [ ] Rotate Stripe keys regularly
- [ ] Monitor for suspicious activity
