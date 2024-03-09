import usePaginationModel from "./pagination.model";
import PaginationView from "./pagination.view";

interface PaginationProps {
  pages: number
  items: number
  page: number
}

export function Pagination({ items, page, pages }: PaginationProps) {
  return (
    <PaginationView {...usePaginationModel({items, page, pages})}/>
  )
}
