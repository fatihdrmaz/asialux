import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'tr',
  localePrefix: 'as-needed',
  localeDetection: false, // Kullanıcı dil seçimine saygı; / → TR, /en → EN (tarayıcı diline göre yönlendirme yok)
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
