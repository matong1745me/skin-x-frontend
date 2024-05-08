import { createPost } from '@/api/post'
import { register } from '@/api/user'
import RichText from '@/components/RichText'
import TagsInput from '@/components/TagsInput'
import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export default function NewPost() {
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const submit = useCallback(async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await register(displayName, username, password)
    setIsLoading(false)
    router.replace('/login')
  }, [displayName, password, router, username])

  return (
    <div className="min-h-screen p-10">
      <div className='flex flex-col gap-4'>
        <label>Display Name</label>
        <Input className='col-12' value={displayName} color='primary' onChange={e => setDisplayName(e.target.value)} variant='bordered' />
        <label>Username</label>
        <Input className='col-12' value={username} color='primary' onChange={e => setUsername(e.target.value)} variant='bordered' />
        <label>Password</label>
        <Input className='col-12' value={password} type='password' color='primary' onChange={e => setPassword(e.target.value)} variant='bordered' />
        <label>Confirm Password</label>
        <Input className='col-12' value={confirmPassword} type='password' color='primary' onChange={e => setConfirmPassword(e.target.value)} variant='bordered' />
        <Button type='button' isLoading={isLoading} onClick={submit} color='primary'>Register</Button>
      </div>

    </div>
  )
}
