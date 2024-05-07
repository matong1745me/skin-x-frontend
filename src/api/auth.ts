import fetch from '@/utils/fetch'

const login = async (username: string, password: string): void => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      })
    })
    localStorage.setItem('token', response.accessToken)
  }
  catch (err) {

  }
}

export {
  login,
}