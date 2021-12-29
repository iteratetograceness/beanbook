import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react';

const MyBeans = () => {

  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/login')
    }
  })

  return (
    <div>
      <p>my beans</p>
    </div>
  )
}

export default MyBeans
