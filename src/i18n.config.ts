import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Đảm bảo locale có giá trị mặc định nếu không có
  const safeLocale = locale || 'en';
  
  try {
    return {
      messages: (await import(`./messages/${safeLocale}.json`)).default,
      locale: safeLocale // Thêm dòng này để trả về locale
    };
  } catch (error) {
    console.error(`Could not load messages for locale ${safeLocale}`, error);
    // Fallback to default locale
    return {
      messages: (await import('./messages/en.json')).default,
      locale: 'en' // Fallback locale
    };
  }
});