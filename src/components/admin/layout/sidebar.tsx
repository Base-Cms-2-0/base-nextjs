'use client'

import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { items } from '@/constants/admin/menu'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { ImageStatic } from '@/constants/admin/theme'
import Image from 'next/image'
import React from 'react'

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
    const { Sider } = Layout
    const { mytheme } = useSelector((state: RootState) => state.theme)

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e)
    }

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            theme='light'
        >
            <div className={`${mytheme === 'light' ? 'bg-white border-neutral-200' : 'bg-neutral-900 border-neutral-700'} p-2 flex border-b items-center justify-between`}>
                <Image
                    src={ImageStatic.Logo}
                    alt="Logo"
                    width={85}
                />
            </div>
            <Menu
                onClick={onClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                theme='light'
            />
        </Sider>
    )
}