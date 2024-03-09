import { Plus, Search, FileDown, MoreHorizontal, Filter } from 'lucide-react'
import { Header } from './components/header'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
import { Pagination } from './components/pagination'
import { useSearchParams } from 'react-router-dom'
import { FormEvent, useState } from 'react'

export interface Tags {
  title: string
  slug: string
  amountOfVideos: number
  id: string
}

export interface TagResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tags[]
}

export function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState('')

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const urlFilter = searchParams.get('filter') || ''

  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ['get-tags', urlFilter, page],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`,
      )
      const data = await response.json()

      return data
    },
    placeholderData: keepPreviousData,
  })

  function filterSearch(event: FormEvent) {
    event.preventDefault()

    setSearchParams((params) => {
      params.set('page', '1')
      params.set('filter', filter)

      return params
    })
  }

  if (isLoading) {
    return null
  }
  return (
    <div className="py-10 space-y-8">
      <Header />
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <Button variant="primary">
            <Plus className="size-3 " />
            Create new
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <form className="flex items-center space-x-4">
            <Input variant="filter">
              <Search className="size-3" />
              <Control
                placeholder="Search tags..."
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              />
            </Input>
            <Button onClick={filterSearch}>
              <Filter className="size-3" />
              Filter
            </Button>
          </form>

          <Button>
            <FileDown className="size-3" />
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagsResponse?.data.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell></TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{tag.title}</span>
                    <span className="text-xs text-zinc-500">{tag.id}</span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300">
                  {tag.amountOfVideos} Video(s)
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {tagsResponse && (
          <Pagination
            page={page}
            pages={tagsResponse.pages}
            items={tagsResponse.items}
          />
        )}
      </main>
    </div>
  )
}
