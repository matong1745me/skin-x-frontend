const baseUrl = 'http://localhost:3000';

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
    const response = await fetch(`${baseUrl}${url}`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: T = await response.json();

    return responseData;
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};

export default customFetch;
