'use client'

import { Form, Input, Button } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useCustomNotification } from '@/components/admin/notification/customNotification'
import { IMAGES } from '@/constants/admin/theme'
import { Link, useRouter } from "@/i18n/routing"
import Image from 'next/image'
import Cookies from 'js-cookie'

export default function Login() {
  const t = useTranslations('login')
  const [loading, setLoading] = useState(false)
  const { showNotification, contextHolder } = useCustomNotification()
  const router = useRouter()


  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const response = await fetch('https://uat-lotus-dreams.goldenbeeltd.top/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (result.status === 'success') {
        Cookies.set('token', result.data.access_token, { expires: 1, secure: true, sameSite: 'Strict' })

        if (values.remember) {
          Cookies.set('user', JSON.stringify(result.data.user), { expires: 7 })
        } else {
          Cookies.remove('user')
        }
        router.push('/dashboard')

      } else {
        console.error('Login failed:', result.message)
        showNotification({
          message: t('loginFailedTitle'),
          showProgress: true,
        })
      }
    } catch (error) {
      console.error('Error during login:', error)
      showNotification({
        message: t('errorTitle'),
        showProgress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="flex min-h-screen font-roboto">
      {contextHolder}
      <div className="hidden md:flex md:w-1/2 bg-white flex-col items-center justify-center p-8">
        <div className="mb-6 flex items-center gap-3">
          <Image
            src={IMAGES.LogoGas}
            alt="Logo Gas"
            width={48}
            height={48}
            priority
          />
          <h2 className="text-2xl font-bold text-gray-800">{t('storeTitle')}</h2>
        </div>
        <p className="text-center text-gray-700 text-lg mb-8 max-w-lg">
          {t('storeDescription')}
        </p>
        <Image
          src={IMAGES.GaoGas}
          alt="Illustration of people with charts"
          width={500}
          height={300}
          className="w-full max-w-2xl object-cover"
        />
      </div>

      <div
        className="w-full md:w-1/2 flex items-start md:items-center justify-center bg-cover bg-center bg-no-repeat min-h-[auto] md:min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url(${IMAGES.Istock})`,
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
  )
}
