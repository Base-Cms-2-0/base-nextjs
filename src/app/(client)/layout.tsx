import { Layout } from 'antd';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      <main className="">{children}</main>
    </Layout>
  )
}