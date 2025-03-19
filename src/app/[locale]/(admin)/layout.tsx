'use client'

import { Layout, theme as antdTheme, ConfigProvider } from 'antd'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { IMAGES } from '@/constants/admin/theme'
import Sidebar from '@/components/admin/layout/sidebar'
import MainHeader from '@/components/admin/layout/mainHeader'
import MainBreadcrumb from '@/components/admin/layout/mainBreadcrumb'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { Content } = Layout
    const [collapsed, setCollapsed] = useState(false)
    const { mytheme } = useSelector((state: RootState) => state.theme)
    const [isClient, setIsClient] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsClient(true)
        document.documentElement.setAttribute('data-theme', mytheme === 'light' ? 'light' : 'dark')
        const timer = setTimeout(() => setIsLoading(false), 1500)
        return () => clearTimeout(timer) // Cleanup
    }, [mytheme])

    const getCSSVariable = (variable: string) =>
        getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
    const themeConfig = {
        token: {
            colorPrimary: getCSSVariable('--yellow-500') || '#FFC800',
        },
        algorithm:
            mytheme === 'dark'
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm,
    }

    return (
        <ConfigProvider theme={themeConfig}>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 flex flex-col items-center justify-center z-50"
                    initial={{ y: 0 }}
                    animate={{ y: '-100%' }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
                >
                    <div className="absolute inset-0 flex items-center justify-center bg-primary">
                        <Image
                            src={IMAGES.Logo}
                            alt="Logo"
                            width={150}
                            priority
                            className="drop-shadow-lg"
                        />
                    </div>
                </motion.div>
            )}
            <Layout className={`h-screen ${isLoading ? 'hidden' : 'block'}`}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout>
                    <MainHeader collapsed={collapsed} setCollapsed={setCollapsed} />
                    <MainBreadcrumb />
                    <Content className={`${mytheme === 'light' ? 'bg-white' : 'bg-neutral-900'} mx-3 p-2 rounded-md`}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}