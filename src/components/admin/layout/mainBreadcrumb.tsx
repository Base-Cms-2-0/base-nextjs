'use client'

import { Breadcrumb } from 'antd'
import { usePathname } from 'next/navigation'
import { items } from '@/constants/admin/menu'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Link from 'next/link'

export default function MainBreadcrumb() {
    const pathname = usePathname()
    const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([])
    const { mytheme } = useSelector((state: RootState) => state.theme)

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean)

        const buildBreadcrumbItems = () => {
            const result: BreadcrumbItem[] = []

            let currentItems = items as MenuItem[]
            let currentPath = ''

            for (const segment of pathSegments) {
                currentPath = currentPath ? `${currentPath}/${segment}` : `/${segment}`

                const matchingItem = currentItems.find(item => {
                    return item.key === segment || item.key === currentPath || `/${item.key}` === currentPath
                })

                if (matchingItem) {
                    result.push({
                        title: matchingItem.label,
                        path: currentPath
                    })

                    if (matchingItem.children) {
                        currentItems = matchingItem.children
                    }
                } else {
                    result.push({
                        title: segment.charAt(0).toUpperCase() + segment.slice(1),
                        path: currentPath
                    })
                }
            }

            return result
        }

        setBreadcrumbItems(buildBreadcrumbItems())
    }, [pathname])

    const antdBreadcrumbItems = breadcrumbItems.map((item, index) => {
        if (index < breadcrumbItems.length - 1) {
            return {
                title: <Link href={item.path} className="text-sm">{item.title}</Link>
            }
        }
        return {
            title: <span className="text-sm">{item.title}</span>
        }
    })

    return (
        <Breadcrumb
            className={`${mytheme === 'light' ? 'bg-white' : 'bg-neutral-900'} !pl-3 !py-1`}
            items={antdBreadcrumbItems}
        />
    )
}