import { toast } from "sonner";

/**
 * Custom Notification System
 * Theme-aligned toasts with accessibility support.
 * Specifications:
 * - Success/Info: 4 seconds auto-dismiss
 * - Error: 6 seconds auto-dismiss
 * - Max 2 concurrent toasts
 * - Bottom-right (desktop), bottom-center (mobile)
 * - Accessible via aria-live="polite"
 */

export type NotificationType = "success" | "error" | "info";

interface NotificationOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Show success notification
 * Use for: donation completed, sponsor inquiry sent
 */
export function showSuccess(message: string, options?: NotificationOptions) {
  toast.success(message, {
    duration: options?.duration ?? 4000,
    position: "bottom-right",
    className: "notification-success",
    action: options?.action,
  });
}

/**
 * Show error notification
 * Use for: payment failed, network error, unexpected error
 */
export function showError(message: string, options?: NotificationOptions) {
  toast.error(message, {
    duration: options?.duration ?? 6000,
    position: "bottom-right",
    className: "notification-error",
    action: options?.action,
  });
}

/**
 * Show info notification
 * Use for: redirecting to checkout, loading states
 */
export function showInfo(message: string, options?: NotificationOptions) {
  toast.info(message, {
    duration: options?.duration ?? 4000,
    position: "bottom-right",
    className: "notification-info",
    action: options?.action,
  });
}

/**
 * Donation notifications
 */
export const donationNotifications = {
  success: () => showSuccess("Donation received. Thank you for your support!"),
  paymentFailed: () => showError("Payment failed. Please try again or contact support."),
  checkoutRedirect: () => showInfo("Redirecting to secure checkout..."),
  networkError: () => showError("Network error. Please check your connection and try again."),
  unexpectedError: () => showError("An unexpected error occurred. Please try again."),
};

/**
 * Sponsor notifications
 */
export const sponsorNotifications = {
  inquirySent: () =>
    showSuccess("Sponsor inquiry sent! We'll be in touch within 24 hours."),
  inquiryError: () =>
    showError("Unable to send inquiry. Please try again or email us directly."),
  networkError: () => showError("Network error. Please check your connection and try again."),
};
