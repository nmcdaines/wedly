import { Search as SearchIcon } from 'lucide-react'

const Search = () => {
  return (
    <button className="flex bg-gray-400/20 rounded items-center min-w-72 h-8 px-4">
      <SearchIcon className="w-3 h-3" />
      <span className="ml-2 font-light text-xs">Search</span>
    </button>
  )
}

export { Search }
