import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import "./globals.css"
// Danh sách các ngôn ngữ hỗ trợ
const locales = ['en', 'vi'];

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  // Kiểm tra locale có hợp lệ không
  if (!locales.includes(locale)) {
    notFound();
  }

  // Load file messages đồng bộ
  let messages;
  try {
    const filePath = path.resolve(process.cwd(), `src/messages/${locale}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    messages = JSON.parse(fileContent);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
