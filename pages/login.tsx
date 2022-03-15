import type { NextPage } from 'next'
import { route } from 'next/dist/server/router'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Login: NextPage = () => {
  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    if(router.isReady && code) {
      fetch(`http://localhost:3000/api/auth/getTokens?code=${code}`, {
        credentials: 'same-origin',
        mode: 'same-origin'
      }).then(async (data) => {        
        localStorage.setItem('refresh', JSON.parse(await data.text()).refresh)
        router.push('/')
      })
    }
  }, [code])

  return <div></div>
}

export default Login
