'use client'

import { Layout, theme as antdTheme, ConfigProvider } from 'antd'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { ImageStatic } from '@/constants/admin/theme'
import Sidebar from '@/components/admin/layout/sidebar'
import MainHeader from '@/components/admin/layout/mainHeader'
import MainBreadcrumb from '@/components/admin/layout/mainBreadcrumb'
import Image from 'next/image'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { Content } = Layout
    const [collapsed, setCollapsed] = useState(false)
    const { mytheme } = useSelector((state: RootState) => state.theme)
    const themeConfig = {
        algorithm:
            mytheme === 'dark'
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm,
    }

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <Image
                    src={ImageStatic.Logo}
                    alt="Logo"
                    width={150}
                />
            </div>
        )
    }

    return (
        <ConfigProvider theme={themeConfig}>
            <Layout className={`${mytheme === 'light' ? 'light' : 'dark'} h-screen`}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout>
                    <MainHeader collapsed={collapsed} setCollapsed={setCollapsed} />
                    <MainBreadcrumb />
                    <Content className={`${mytheme === 'light' ? 'bg-white' : 'bg-neutral-900'} m-3 p-2 rounded-md`}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}