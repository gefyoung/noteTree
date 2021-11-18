import API from '@aws-amplify/api'
import "tailwindcss/tailwind.css"
import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Auth from '@aws-amplify/auth'
import NavbarComp from "../components/navbar/navbar"
// import { AuthContext } from '../utils/context'
import type { AppProps /*, AppContext */ } from 'next/app'

function Application({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [userState, setUserState] = useState({
    auth: null,
    notionId: null,
    username: null
  })

  const updateUserState = (e: {
    auth?: Boolean, 
    notionId?: string, 
    username?: string
  }) => { setUserState({...userState, ...e})}

  const getSelf = async (props) => {
    if (props) {
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
    } else /* log out */ {
      try {
        await Auth.signOut()
        setUserState({auth: false, notionId: null, username: null})
      } catch { console.log('failed to signout?') }
    }

  }

  useEffect(() => {
    getSelf(true)
  }, [])

  return (router.pathname === "/[id]/review" || router.pathname === "/[id]/message")
    ? <Component {...pageProps} />
    : <>
    {/* <AuthContext.Provider value={{ auth: authState, setAuthState: getUsername}}> */}
      <NavbarComp {...userState} />
      <Component {...userState} updateAuth={getSelf} updateUserState={updateUserState} {...pageProps}/>
      {/* </AuthContext.Provider> */}
    </>
}

export default Application