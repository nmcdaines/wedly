'use client'

import { cx } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()

  return routes.flatMap(({ name, pages }) => {
    let items = []

    if (name) {
      items.push(
        <li className="font-medium text-xs pl-4 pb text-gray-400 uppercase">
          {name}
        </li>,
      )
    }

    for (let page of pages) {
      items.push(
        <li className="">
          <Link
            href={page.href || ''}
            className={cx(
              'block w-full h-full px-4 py-2 rounded-sm hover:bg-white text-sm ',
              (page.exact
                ? page.href === pathname
                : page.href && pathname.startsWith(page.href)) &&
                'text-emerald-500 bg-green-300/20',
            )}
          >
            {page.name}

            {page.comingSoon && (
              <span className="ml-2 text-[10px] text-gray-500">
                (Coming soon)
              </span>
            )}
          </Link>
        </li>,
      )
    }

    items.push(<li className="pt-6"></li>)

    return items
  })
}

type Route = {
  name: string
  href?: string
  exact?: boolean
  comingSoon?: boolean
}

type RouteSection = {
  type?: string
  name?: string
  pages: Route[]
}

const routes: RouteSection[] = [
  {
    type: 'group',
    pages: [
      { name: 'Overview', href: '/', exact: true },
      { name: 'Inbox', href: '/inbox' },
      { name: 'Checklist', href: '/checklist' },
      { name: 'Planner', href: '/planner' },
      { name: 'Guest list', href: '/guest-list' },
      { name: 'Vendors', href: '/vendors' },
      { name: 'Invites', href: '/invites' },
      { name: 'RSVPs', href: '/rsvp' },
      { name: 'Message Guests', href: '/guests' },
      { name: 'Gift registry', href: '/registry', comingSoon: true },
      { name: 'Wishing well', href: '/wishing-well' },
    ],
  },
  {
    type: 'group',
    name: 'Sites',
    pages: [
      { name: 'Site', href: '/site' },
      { name: 'Analytics', href: '/analytics' },
    ],
  },
  {
    type: 'group',
    name: 'Promotions',
    pages: [
      { name: 'Deals', href: '/promotions/deals' },
      { name: 'Expos and events', href: '/promotions/events' },
    ],
  },
  {
    type: 'group',
    name: 'Settings',
    pages: [{ name: 'Plan' }, { name: 'General' }, { name: 'Managers' }],
  },
]

export { Navigation }
