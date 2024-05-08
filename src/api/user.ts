import fetch from '@/utils/fetch'

const register = async (displayName: string, username: string, password: string): void => {
  try {
    await fetch('/users/register', {
      method: 'POST',
      body: JSON.stringify({
        displayName,
        username,
        password,
      })
    })
  }
  catch (err) {

  }
}

export {
  register,
}