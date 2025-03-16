'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IMAGES } from '@/constants/client/Theme';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: 'EN', flag: IMAGES.flagEn || '/flags/gb.png' },
    { code: 'vi', name: 'VI', flag: IMAGES.flagVi || '/flags/vn.png' },
  ];

  const [isToggled, setIsToggled] = useState(locale === 'vi');

  useEffect(() => {
    setIsToggled(locale === 'vi');
  }, [locale]);

  const switchLocale = (newLocale: string) => {
    const currentPathname = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPathname}`);
  };

  const handleToggle = () => {
    const newLocale = isToggled ? 'en' : 'vi';
    setIsToggled(!isToggled);
    switchLocale(newLocale);
  };

  return (
    <div className="flex justify-end p-4">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={isToggled}
          onChange={handleToggle}
          className="peer sr-only"
        />
        <div
          className="peer flex h-8 items-center gap-4 rounded-full bg-orange-600 px-4 after:absolute after:left-1 after:h-6 after:w-16 after:rounded-full after:bg-white/40 after:transition-all after:content-[''] peer-checked:bg-red-500  peer-checked:after:translate-x-full peer-focus:outline-none dark:border-slate-600 dark:bg-slate-700 text-sm text-white"
        >
          <div className="flex items-center space-x-2">
            <Image
              src={languages[0].flag}
              alt={`${languages[0].name} flag`}
              width={20}
              height={20}
              className="object-contain rounded-full"
            />
            <span>{languages[0].name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Image
              src={languages[1].flag}
              alt={`${languages[1].name} flag`}
              width={20}
              height={20}
              className="object-contain rounded-full"
            />
            <span>{languages[1].name}</span>
          </div>
        </div>
      </label>
    </div>
  );
}