/* Registration forms (opened as real links so they also work inside embeds and in-app browsers) */
export const CUSTOMER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfA9t_b6cnSxpMT8fppdjBO7LEdNcywQ4yk-FOhqI7ZbZ0mUQ/viewform';
export const RESTAURANT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeoIkCtvlZ7ef5-6ntaV9SksmEHxNVXvj1Efgots7ZFuycRIw/viewform';

/* PAS Partner (merchant) app in the stores */
export const MERCHANT_APP_IOS_URL = 'https://apps.apple.com/in/app/pick-at-store-merchant/id6758596562';
export const MERCHANT_APP_ANDROID_URL = 'https://play.google.com/store/apps/details?id=io.pickatstore.merchant';

/** 'ios' | 'android' | 'desktop' — iPads that report as a Mac are treated as iOS */
export function detectPlatform() {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return 'ios';
  return 'desktop';
}

export const PLATFORM = detectPlatform();

/** Where "Register restaurant" goes: the partner app on phones, the Google Form on computers */
export const RESTAURANT_REGISTER_URL =
  PLATFORM === 'ios' ? MERCHANT_APP_IOS_URL
    : PLATFORM === 'android' ? MERCHANT_APP_ANDROID_URL
      : RESTAURANT_FORM_URL;

export const RESTAURANT_REGISTER_LABEL =
  PLATFORM === 'ios' ? 'Register restaurant in the PAS Partner app on the App Store'
    : PLATFORM === 'android' ? 'Register restaurant in the PAS Partner app on Google Play'
      : 'Register your restaurant on Google Forms';
