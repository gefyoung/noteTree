import React, { useContext, useEffect, useRef, useState } from "react";
import Link from 'next/link'
import '../../configureAmplify'
import { useRouter } from 'next/router'
import { AuthContext } from "../../utils/context";
import Auth from '@aws-amplify/auth'

const NavbarComp = ({ auth, notionId, username }) => {
  const router = useRouter()
  // const context = useContext(AuthContext)
  // const auth = context.auth

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const userAccount = await Auth.currentAuthenticatedUser()
  //       // console.log(userAccount)
  //       // setUsernameState(userAccount.username)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   })()
  // }, [])

  // const [modalState, setModalState] = useState(null)

  const aboutClicked = () => {
    window && window.fathom.trackGoal('AMD53BUZ', 0)
  }

  return (
    <div className="flex">
      <div className="flex-1"></div>

    <div className="m-8 ml-12 w-192">
      {/* <span className="px-2 py-1 mx-5 my-1 rounded hover:bg-gray-200 ">
        <Link href="/browse">
          <a>Browse</a>
        </Link>
      </span> */}
      <span className="px-2 py-1 mx-5 my-1 rounded hover:bg-gray-200 ">
        <Link href="/">
          <a onClick={() => aboutClicked()}>About</a>
        </Link>
      </span>
      <span className="px-2 py-1 mx-5 my-1 rounded hover:bg-gray-200 ">
        {/* { auth && <Link href={
          typeof(auth) === 'string'
            ? `/${auth}`
            : `/yourPage`
        }>
          <a>Your page</a>
        </Link>} */}
        { notionId && <Link href={ '/' + username } >
          <a>Your page</a>
        </Link>}
      </span>
      <span className="px-2 py-1 mx-5 my-1 rounded hover:bg-gray-200">
        <Link href="/account">
          <a>{auth ? "Account" : "Create your page"}</a>
        </Link>
      </span>


    </div>
    <div className="flex-1"></div>
    </div>
  )
}

export default NavbarComp;