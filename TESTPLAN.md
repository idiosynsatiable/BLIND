# Shine in the Darkness — Test Plan

## Test Environment Setup

### Prerequisites

- Local dev server running (`pnpm dev`)
- Supabase project created and schema applied
- Stripe test account configured
- `.env.local` with test keys

### Test Data

- **Stripe Test Card (Success)**: `4242 4242 4242 4242`
- **Stripe Test Card (Decline)**: `4000 0000 0000 0002`
- **Test Email**: `test@example.com`
- **Test Password**: `TestPassword123!`

---

## Phase 1: Authentication

### Test 1.1 — Sign Up with Email

**Steps:**
1. Navigate to `/auth/signup` (or login page)
2. Enter email: `test@example.com`
3. Enter password: `TestPassword123!`
4. Click "Sign Up"

**Expected Result:**
- User is created in Supabase
- Confirmation email is sent (or auto-confirmed in test mode)
- User is redirected to dashboard or home page
- `useAuth()` hook returns user object

**Acceptance Criteria:**
- ✅ No errors in console
- ✅ User appears in Supabase Auth dashboard
- ✅ Session is stored in browser

---

### Test 1.2 — Sign In with Email

**Steps:**
1. Navigate to `/auth/login`
2. Enter email: `test@example.com`
3. Enter password: `TestPassword123!`
4. Click "Sign In"

**Expected Result:**
- User is authenticated
- User is redirected to dashboard
- `useAuth()` hook returns user object with session

**Acceptance Criteria:**
- ✅ No errors in console
- ✅ Session is active
- ✅ Authenticated pages are accessible

---

### Test 1.3 — Sign Out

**Steps:**
1. Sign in as test user
2. Click "Sign Out" button
3. Verify redirect to home page

**Expected Result:**
- Session is cleared
- User is logged out
- `useAuth()` hook returns null user

**Acceptance Criteria:**
- ✅ No errors in console
- ✅ Authenticated pages redirect to login
- ✅ Session is cleared from browser

---

## Phase 2: Subscription Status

### Test 2.1 — Free User Subscription Status

**Steps:**
1. Sign in as new user (no subscription)
2. Check `useSubscription()` hook

**Expected Result:**
- `isPremium` is `false`
- `status` is `"free"`
- Premium features are gated

**Acceptance Criteria:**
- ✅ `useSubscription()` returns correct status
- ✅ Premium content is not visible
- ✅ Premium gates show fallback UI

---

### Test 2.2 — Premium Gate Component

**Steps:**
1. Add `<PremiumGate>` component to a test page
2. Sign in as free user
3. Verify fallback is shown
4. Manually update subscription in Supabase to `status: 'active'`
5. Refresh page
6. Verify premium content is shown

**Expected Result:**
- Free users see fallback content
- Premium users see gated content
- Status changes are reflected immediately

**Acceptance Criteria:**
- ✅ Gates work correctly
- ✅ No console errors
- ✅ State updates on refresh

---

## Phase 3: Stripe Checkout

### Test 3.1 — Create Checkout Session

**Steps:**
1. Sign in as test user
2. Navigate to `/donate` or premium page
3. Click "Upgrade to Premium" button
4. Verify checkout session is created

**Expected Result:**
- API call to `/api/stripe-checkout` succeeds
- Session ID is returned
- User is redirected to Stripe Checkout

**Acceptance Criteria:**
- ✅ No 500 errors
- ✅ Stripe Checkout page loads
- ✅ Price is displayed correctly

---

### Test 3.2 — Successful Payment (Test Card)

**Steps:**
1. In Stripe Checkout:
   - Email: `test@example.com`
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/25`
   - CVC: `123`
2. Click "Pay"
3. Wait for redirect

**Expected Result:**
- Payment succeeds
- User is redirected to `/donate/success`
- Subscription record is created in Supabase
- `useSubscription()` returns `isPremium: true`

**Acceptance Criteria:**
- ✅ Success page displays
- ✅ Supabase shows `status: 'active'`
- ✅ Stripe shows successful charge
- ✅ Premium features are now accessible

---

### Test 3.3 — Failed Payment (Test Card)

**Steps:**
1. In Stripe Checkout:
   - Card: `4000 0000 0000 0002` (decline card)
   - Other fields: same as 3.2
2. Click "Pay"
3. Observe error

**Expected Result:**
- Payment is declined
- Error message is displayed
- User is NOT redirected to success page
- Subscription is NOT created

**Acceptance Criteria:**
- ✅ Error message is clear
- ✅ No subscription created
- ✅ Stripe shows failed charge

---

### Test 3.4 — Cancelled Checkout

**Steps:**
1. Navigate to Stripe Checkout
2. Click "Back" or close the page
3. Verify redirect to `/donate/cancel`

**Expected Result:**
- User is redirected to cancel page
- No charge is made
- No subscription is created

**Acceptance Criteria:**
- ✅ Cancel page displays
- ✅ No charge in Stripe
- ✅ No subscription in Supabase

---

## Phase 4: Stripe Webhooks

### Test 4.1 — Webhook Signature Verification

**Steps:**
1. Send POST request to `/api/stripe-webhook` with invalid signature:
   ```bash
   curl -X POST http://localhost:3000/api/stripe-webhook \
     -H "stripe-signature: invalid" \
     -d '{"type": "checkout.session.completed"}'
   ```

**Expected Result:**
- Request is rejected with 400 error
- Error message: "Webhook signature verification failed"
- No database changes

**Acceptance Criteria:**
- ✅ Invalid signatures are rejected
- ✅ No data corruption
- ✅ Security is maintained

---

### Test 4.2 — Webhook Event: checkout.session.completed

**Steps:**
1. Complete a successful payment (Test 3.2)
2. Check Stripe Dashboard → Webhooks → Recent deliveries
3. Verify webhook was delivered

**Expected Result:**
- Webhook is delivered
- Subscription record is created/updated in Supabase
- `status` is set to `"active"`
- `stripe_customer_id` is stored

**Acceptance Criteria:**
- ✅ Webhook delivery shows 200 response
- ✅ Supabase record is created
- ✅ All fields are populated correctly

---

### Test 4.3 — Webhook Event: customer.subscription.updated

**Steps:**
1. In Stripe Dashboard:
   - Go to Customers
   - Find test customer
   - Click on subscription
   - Change billing cycle anchor or other setting
2. Verify webhook is delivered

**Expected Result:**
- Webhook is delivered
- Supabase subscription record is updated
- `updated_at` timestamp is current

**Acceptance Criteria:**
- ✅ Webhook delivery shows 200 response
- ✅ Supabase record is updated
- ✅ Timestamp is recent

---

### Test 4.4 — Webhook Event: customer.subscription.deleted

**Steps:**
1. In Stripe Dashboard:
   - Go to Customers → test customer
   - Click subscription
   - Click "Cancel subscription"
   - Confirm cancellation
2. Verify webhook is delivered

**Expected Result:**
- Webhook is delivered
- Supabase subscription `status` is set to `"canceled"`
- `useSubscription()` returns `isPremium: false`

**Acceptance Criteria:**
- ✅ Webhook delivery shows 200 response
- ✅ Supabase status is updated
- ✅ Premium access is revoked

---

### Test 4.5 — Webhook Event: invoice.payment_failed

**Steps:**
1. In Stripe Dashboard:
   - Go to Customers → test customer
   - Go to Invoices
   - Find an invoice
   - Manually trigger payment failure (or wait for automatic retry)
2. Verify webhook is delivered

**Expected Result:**
- Webhook is delivered
- Supabase subscription `status` is set to `"past_due"`
- User is notified (optional)

**Acceptance Criteria:**
- ✅ Webhook delivery shows 200 response
- ✅ Supabase status is updated to past_due
- ✅ No console errors

---

## Phase 5: End-to-End Flow

### Test 5.1 — Complete User Journey

**Steps:**
1. Sign up as new user
2. Verify free status
3. Click "Upgrade to Premium"
4. Complete checkout with test card
5. Verify success page
6. Refresh page
7. Verify premium status persists
8. Access premium features

**Expected Result:**
- All steps complete without errors
- User transitions from free to premium
- Premium features are accessible
- Status persists across page refreshes

**Acceptance Criteria:**
- ✅ No console errors
- ✅ All pages load correctly
- ✅ Database state is consistent
- ✅ Premium gates work correctly

---

### Test 5.2 — Multiple Users

**Steps:**
1. Create 3 test users
2. User 1: Free (no subscription)
3. User 2: Premium (completed checkout)
4. User 3: Premium → Canceled
5. Verify each user has correct status

**Expected Result:**
- Each user's status is independent
- Free users cannot see premium content
- Premium users can see premium content
- Canceled users revert to free

**Acceptance Criteria:**
- ✅ No data leakage between users
- ✅ RLS policies work correctly
- ✅ Status is accurate for each user

---

## Phase 6: Error Handling

### Test 6.1 — Missing Environment Variables

**Steps:**
1. Remove `STRIPE_PRICE_ID` from `.env.local`
2. Try to create checkout session
3. Observe error

**Expected Result:**
- Checkout fails with clear error message
- Error is logged
- User is informed

**Acceptance Criteria:**
- ✅ Error message is helpful
- ✅ No 500 errors
- ✅ Graceful degradation

---

### Test 6.2 — Database Connection Error

**Steps:**
1. Disconnect Supabase (or use invalid key)
2. Try to fetch subscription status
3. Observe error handling

**Expected Result:**
- Error is caught and logged
- User sees fallback UI
- App doesn't crash

**Acceptance Criteria:**
- ✅ No white screen of death
- ✅ Error is logged
- ✅ User experience is graceful

---

### Test 6.3 — Network Timeout

**Steps:**
1. Simulate slow network (DevTools → Network → Slow 3G)
2. Try to create checkout session
3. Observe timeout handling

**Expected Result:**
- Request times out gracefully
- User sees error message
- Retry is possible

**Acceptance Criteria:**
- ✅ No hanging requests
- ✅ Clear error message
- ✅ Retry mechanism works

---

## Test Execution Checklist

- [ ] Phase 1: Authentication (3 tests)
- [ ] Phase 2: Subscription Status (2 tests)
- [ ] Phase 3: Stripe Checkout (4 tests)
- [ ] Phase 4: Stripe Webhooks (5 tests)
- [ ] Phase 5: End-to-End Flow (2 tests)
- [ ] Phase 6: Error Handling (3 tests)

**Total Tests**: 19

---

## Regression Testing

After any code changes, run:

1. **Quick Smoke Test** (5 min):
   - Sign up
   - Sign in
   - Check free status
   - Start checkout
   - Cancel checkout

2. **Full Test Suite** (30 min):
   - All tests above

3. **Production Validation** (after deploy):
   - Test with real Stripe account (if applicable)
   - Verify webhook delivery
   - Check production logs

---

## Known Issues & Workarounds

| Issue | Workaround |
|-------|-----------|
| Webhook not delivering | Check endpoint is publicly accessible |
| Subscription not updating | Verify service role key is set |
| Checkout redirects to error | Check STRIPE_PRICE_ID is correct |

---

## Sign-Off

- [ ] All tests passed
- [ ] No console errors
- [ ] No database errors
- [ ] Webhooks delivering successfully
- [ ] Ready for production

**Tester**: ________________  
**Date**: ________________  
**Notes**: ________________
