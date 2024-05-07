import fetch from '@/utils/fetch'
import useSWR from 'swr'

const usePosts = (
  search: string = '',
  page: number = 1,
  itemPerPage: number = 10,
  sortBy: string = 'postedAt',
  order: string = 'ASC',
  tags: string = '',
) => {
  const { data, error, isLoading } = useSWR(`/posts?search=${search}&page=${page}&limit=${itemPerPage}&sortBy=${sortBy}&order=${order}&tags=${tags}`, fetch, {
    keepPreviousData: true,
  })
  return {
    data,
    error,
    isLoading
  }
}

export default usePosts