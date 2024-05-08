import { createPost } from '@/api/post'
import RichText from '@/components/RichText'
import TagsInput from '@/components/TagsInput'
import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const submit = useCallback(async (e) => {
    e.preventDefault()
    const body = {
      title,
      content,
      tags,
    }
    setIsLoading(true)
    const newPost = await createPost(body)
    setIsLoading(false)
    if (newPost) {
      router.push('/posts')
    }
  }, [content, router, tags, title])

  return (
    <div className="min-h-screen p-10">
      <div className='flex flex-col gap-4'>
        <label>Title</label>
        <Input className='col-12' value={title} color='primary' onChange={e => setTitle(e.target.value)} variant='bordered' />
        <label>Content</label>
        <RichText body={content} handleBody={setContent}/>
        <label>Tags</label>
        <TagsInput tags={tags} handleTagsChange={(tags) => setTags(tags)} />
        <Button type='button' isLoading={isLoading} onClick={submit} color='primary'>Submit</Button>
      </div>

    </div>
  )
}
