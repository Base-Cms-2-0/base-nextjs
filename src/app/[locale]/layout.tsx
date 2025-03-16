import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { StoreProvider } from '@/redux/storeProvider'
import { Roboto } from 'next/font/google'
import fs from 'fs'
import path from 'path'
import '@/assets/scss/main.scss'

const locales = ['en', 'vi']

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
})

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params

  if (!locales.includes(locale)) {
    notFound()
  }

  let messages
  try {
    const filePath = path.resolve(process.cwd(), `src/messages/${locale}.json`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    messages = JSON.parse(fileContent)
  } catch (error) {
    notFound()
  }

  return (
    <StoreProvider>
    <html lang={locale}>
      <body className={roboto.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
    </StoreProvider>
  )
}
