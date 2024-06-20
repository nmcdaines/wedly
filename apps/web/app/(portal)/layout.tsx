import { Layout } from '@/components/layout'
import { headers } from 'next/headers'
import { Navigation } from '@/components/layout/navigation'
import { Search } from '@/components/layout/search'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const heads = headers()
  const pathname = heads.get('next-url')

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <div className="bg-white border-b border-b-gray-300">
        <Layout className="flex py-2 px-6 items-center">
          <div className="mr-auto">Wedly</div>
          <Search />
          <div className="ml-auto">User</div>
        </Layout>
      </div>

      <Layout className="flex space-x-8 px-2 pt-2">
        <ul className="flex flex-col space-y-1 w-56 h-screen">
          <Navigation />
        </ul>

        <div className="flex-grow">{children}</div>
        <div>{pathname}</div>
      </Layout>
    </div>
  )
}
