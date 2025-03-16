'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Login() {
  const t = useTranslations('login'); // Hook để lấy nội dung đa ngôn ngữ
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Function to switch locale
  const switchLocale = (newLocale: string) => {
    const currentPathname = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPathname}`);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    // Add your login logic here
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen font-roboto">
      <div className="hidden md:flex md:w-1/2 bg-white flex-col items-center justify-center p-8">
        <div className="mb-6 flex items-center gap-3">
          <img
            src="https://brandlogos.net/wp-content/uploads/2022/07/gasgas-logo_brandlogos.net_eew9a.png"
            alt="Golden Bee Logo"
            className="w-12 h-12"
          />
          <h2 className="text-2xl font-bold text-gray-800">{t('storeTitle')}</h2>
        </div>
        <p className="text-center text-gray-700 text-lg mb-8 max-w-lg">
          {t('storeDescription')}
        </p>
        <img
          src="https://gasdonga.com.vn/images/1741078756097.png"
          alt="Illustration of people with charts"
          className="w-full max-w-2xl object-cover"
        />
      </div>

      <div
        className="w-full md:w-1/2 flex items-start md:items-center justify-center bg-cover bg-center bg-no-repeat min-h-[auto] md:min-h-screen relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1354565720/vector/hexagonal-geometric-seamless-pattern-vector-background-grid-with-editable-strokes.jpg?s=612x612&w=0&k=20&c=YWy1EaFNgqGfc8yUBK9nXN-DhqsNcSxHxXICDeJQC8Q=')",
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="w-full max-w-md mt-4 md:mt-0 lg:-mt-32 p-6 md:p-0 flex flex-col items-center justify-start md:justify-center z-10">
          <div className="w-full">
            <div className="text-center md:mt-0 mt-14 mb-6 md:mb-7">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 tracking-tight">
                {t('title')}
              </h1>
            </div>
            <Form
              name="login"
              className="w-full"
              initialValues={{ remember: true }}
              layout="vertical"
              size="large"
              requiredMark={false}
              onFinish={onFinish}
            >
              <Form.Item
                label={<span className="text-gray-700 font-medium">{t('emailLabel')}</span>}
                name="email"
                rules={[
                  { required: true, message: t('emailRequired') },
                  { type: 'email', message: t('emailInvalid') },
                ]}
                className="mb-5"
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder={t('emailPlaceholder')}
                  className="rounded-md py-2 px-4 text-gray-700"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-700 font-medium">{t('passwordLabel')}</span>}
                name="password"
                rules={[
                  { required: true, message: t('passwordRequired') },
                  { min: 8, message: t('passwordMinLength') },
                ]}
                className="mb-5"
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder={t('passwordPlaceholder')}
                  className="rounded-md py-2 px-4 text-gray-700"
                />
              </Form.Item>

              <Form.Item>
                <div className="flex flex-wrap items-center justify-between mb-4 mt-1 gap-3">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-500 bg-white border accent-red-500"
                      />
                      <span className="text-gray-700 hover:text-red-500 transition-colors">
                        {t('rememberMe')}
                      </span>
                    </label>
                  </Form.Item>

                  <Link
                    href="/auth/forgotPassword"
                    className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>

                <Button
                  type="primary"
                  danger
                  htmlType="submit"
                  className="w-full h-12 font-medium tracking-wide"
                  loading={loading}
                >
                  {t('submitButton')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}