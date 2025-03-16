'use client';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
export default function Home() {
  const t = useTranslations('common');
  
  return (
    <div>
      <LanguageSwitcher />
    </div>
  );
}