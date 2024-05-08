
interface ApiResponse<T> {
  status: number;
  data?: T;
}

const customFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const token = localStorage.getItem('token')
  const headers: HeadersInit = {
    ...options?.headers,
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };


  const requestOptions: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: T = await response.json();

    return responseData;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('HTTP error')) {
      const status = parseInt(error.message.split(': ')[1], 10);
      if (status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    throw error;
  }
};

export default customFetch;
