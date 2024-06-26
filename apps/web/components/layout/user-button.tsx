'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {} from '@radix-ui/react-dropdown-menu'
import { LogOut } from 'lucide-react'

export function UserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex px-2 gap-4">
          <span className="text-xs rounded-full bg-blue-600 text-white p-1.5">
            ND
          </span>

          <span>
            <span className="">Nathaniel Daines</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Get help!
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
