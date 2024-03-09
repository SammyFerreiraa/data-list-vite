import { useSearchParams } from "react-router-dom"

interface PaginationProps {
  pages: number
  items: number
  page: number
}

const usePaginationModel = ({items, page, pages}: PaginationProps) => {
  const [, setSearchParams] = useSearchParams()

  function firstPage() {
    setSearchParams((params) => {
      params.set('page', '1')

      return params
    })
  }

  function previousPage() {
    if (page - 1 <= 0) {
      return
    }

    setSearchParams((params) => {
      params.set('page', String(page - 1))

      return params
    })
  }

  function nextPage() {
    if (page + 1 > pages) {
      return
    }

    setSearchParams((params) => {
      params.set('page', String(page + 1))

      return params
    })
  }

  function lastPage() {
    setSearchParams((params) => {
      params.set('page', String(pages))

      return params
    })
  }
  return {
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    items,
    page,
    pages,
  }
}

export default usePaginationModel