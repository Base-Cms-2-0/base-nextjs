import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // Danh sách ngôn ngữ được hỗ trợ
  locales: ['en', 'vi'],
  
  // Ngôn ngữ mặc định
  defaultLocale: 'en'
});
 
export const config = {
  // Áp dụng middleware cho tất cả đường dẫn trừ các đường dẫn ngoại trừ
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};