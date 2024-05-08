import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { login } from '@/api/auth'

export default function Home() {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const router = useRouter()

  const submitLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)
    await login(username, password)
    setIsLoading(false)
    router.push('/posts')
  }
  
  const goToRegister = async () => {
    router.push('/register')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
      <div className="max-w-md w-full px-8 py-12 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-6" onSubmit={submitLogin}>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700 block">Email</label>
            <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500" />
          </div>
          <div className='flex flex-col gap-4'>
            <Button isLoading={isLoading} type="submit" color='primary'>
              Login
            </Button>
            <Button type='button' variant='ghost' color='primary' onClick={goToRegister}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
