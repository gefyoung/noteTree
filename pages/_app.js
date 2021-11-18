import API from '@aws-amplify/api'
import "tailwindcss/tailwind.css"
import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Auth from '@aws-amplify/auth'
import NavbarComp from "../components/navbar/navbar"
// import { AuthContext } from '../utils/context'

function Application({ Component, pageProps }) {
  const router = useRouter()

  const [userState, setUserState] = useState({
    auth: null,
    notionId: null,
    username: null
  })

  const getUsername = async (props) => {
    try {
      const isAuth = await Auth.currentCredentials()
      if (isAuth.authenticated) {
        try {
          const self = await API.get(process.env.NEXT_PUBLIC_APIGATEWAY_NAME, '/getSelf', {})
          setUserState({...userState, auth: true, username: self.username, notionId: self.notionId})
        } catch {
          setUserState({...userState, auth: true })
        }
      } else {
        setUserState({...userState, auth: false })
      }
    } catch (err) { console.log('amplify error?', err) }
  }

  useEffect(() => {
    getUsername()
  }, [])

  return (router.pathname === "/[id]/review" || router.pathname === "/[id]/message")
    ? <Component {...pageProps} />
    : <>
    {/* <AuthContext.Provider value={{ auth: authState, setAuthState: getUsername}}> */}
      <NavbarComp {...userState} />
      <Component {...userState} updateAuth={getUsername} {...pageProps}/>
      {/* </AuthContext.Provider> */}
    </>
}

export default Application