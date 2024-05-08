import fetch from '@/utils/fetch'
import useSWR from 'swr'

const useGetPosts = (
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

const useGetPostById = (id) => {
  const { data, error, isLoading } = useSWR(`/posts/${id}`, fetch)
  return {
    data,
    error,
    isLoading
  }
}

const createPost = async (body) => {
  try {
    const response = await fetch('/posts', {
      method: 'POST',
      body: JSON.stringify(body)
    })

    return response
  }
  catch (err) {

  }
}

export {
  useGetPosts,
  useGetPostById,
  createPost
}