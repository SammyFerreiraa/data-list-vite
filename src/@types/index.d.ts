export interface TagResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tags[]
}

export interface Tags {
  title: string
  slug: string
  amountOfVideos: number
  id: string
}
