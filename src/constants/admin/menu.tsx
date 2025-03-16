import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

export const items: MenuItem[] = [
    {
        key: 'dashboard',
        label: 'Bảng điều khiển',
    },
];