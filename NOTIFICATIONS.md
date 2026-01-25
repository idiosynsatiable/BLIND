# Custom Notification System

## Overview

The Shine in the Darkness website uses a custom, theme-aligned notification system built on Sonner toasts. Notifications are displayed as non-intrusive toasts that appear in the bottom-right corner (desktop) or bottom-center (mobile).

## Notification Types

### Success Notifications
- **Donation Completed**: "Donation received. Thank you for your support!"
- **Sponsor Inquiry Sent**: "Sponsor inquiry sent! We'll be in touch within 24 hours."
- **Auto-dismiss**: 4 seconds

### Error Notifications
- **Payment Failed**: "Payment failed. Please try again or contact support."
- **Network Error**: "Network error. Please check your connection and try again."
- **Unexpected Error**: "An unexpected error occurred. Please try again."
- **Inquiry Error**: "Unable to send inquiry. Please try again or email us directly."
- **Auto-dismiss**: 6 seconds

### Info Notifications
- **Checkout Redirect**: "Redirecting to secure checkout..."
- **Auto-dismiss**: 4 seconds

## Trigger Points

Notifications are triggered only at meaningful moments:

1. **Donation Page** (`/donate`)
   - Info: When user initiates checkout
   - Success: After successful Stripe session creation (redirects to Stripe)
   - Error: If payment fails or network error occurs

2. **Sponsors Page** (`/sponsors`)
   - Success: After sponsor inquiry form submission
   - Error: If form submission fails or network error occurs

## Design & Accessibility

### Visual Design
- **Background**: Rococo white (`oklch(0.98 0.001 0)`)
- **Text**: Slate grey (`oklch(0.235 0.015 65)`)
- **Accent**: Gilded gold (`oklch(0.7 0.08 70)`) for info notifications
- **CTA**: Warm coral (`oklch(0.577 0.245 27.325)`) for success/error
- **Border**: Left-side colored border (3px) for visual hierarchy
- **Max Width**: 360px (readable, non-intrusive)
- **Shadow**: Subtle depth (0 4px 12px rgba(0,0,0,0.08))

### Accessibility Features
- **Screen Reader Support**: `aria-live="polite"` on toast container
- **Color Independence**: Icons + text convey meaning (not color alone)
- **Reduced Motion**: Animations disabled for users with `prefers-reduced-motion`
- **Focus Management**: Close button is keyboard accessible
- **Max 2 Toasts**: Prevents notification spam
- **Clear Icons**: Lucide React icons for visual clarity

## Implementation

### Using Notifications

```typescript
import { donationNotifications, sponsorNotifications } from "@/lib/notifications";

// Donation notifications
donationNotifications.success();
donationNotifications.paymentFailed();
donationNotifications.checkoutRedirect();
donationNotifications.networkError();
donationNotifications.unexpectedError();

// Sponsor notifications
sponsorNotifications.inquirySent();
sponsorNotifications.inquiryError();
sponsorNotifications.networkError();
```

### Custom Notifications

For custom notifications, use the base functions:

```typescript
import { showSuccess, showError, showInfo } from "@/lib/notifications";

showSuccess("Custom success message");
showError("Custom error message");
showInfo("Custom info message");

// With options
showSuccess("Message", { duration: 5000 });
```

### Files

- **Utilities**: `client/src/lib/notifications.ts`
- **Styling**: `client/src/components/NotificationStyles.css`
- **Donate Page**: `client/src/pages/Donate.tsx`
- **Sponsors Page**: `client/src/pages/Sponsors.tsx`

## Testing

### Manual Testing

1. **Donation Success**
   - Navigate to `/donate`
   - Click any donation tier
   - Observe "Redirecting to secure checkout..." info toast
   - (In production, redirects to Stripe)

2. **Donation Error**
   - Simulate network error in browser DevTools
   - Click donation tier
   - Observe error notification

3. **Sponsor Inquiry Success**
   - Navigate to `/sponsors`
   - Fill out sponsor inquiry form
   - Submit
   - Observe success notification

4. **Sponsor Inquiry Error**
   - Simulate network error in browser DevTools
   - Submit form
   - Observe error notification

### Accessibility Testing

- **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
- **Keyboard**: Tab to close button, press Enter
- **Reduced Motion**: Enable in OS settings, verify animations are disabled
- **Color Contrast**: Verify text is readable (WCAG AA)

## Future Enhancements

- Email notifications for donations (transactional)
- SMS notifications (opt-in)
- Notification history/archive
- User notification preferences
- Push notifications (web)
