import React from "react";
import Link from 'next/link'
import '../../configureAmplify'

const NavbarComp = ({ auth, notionId, username }) => {

  const aboutClicked = () => {
    window && window.fathom.trackGoal('AMD53BUZ', 0)
  }

  return (
    <div className="flex">
      <div className="flex-1"></div>

    <div className="m-8 ml-12 w-192">
      <span className="px-2 py-1 mx-5 my-1 rounded hover:bg-gray-200 ">
        <Link href="/">
          <a onClick={() => aboutClicked()}>About</a>
        </Link>
      </span>
      <span className="px-2 py-1 mx-5 my-1 rounded hover:bg-gray-200 ">
        { notionId && <Link href={ '/' + username } >
          <a>Your page</a>
        </Link>}
      </span>
      <span className="px-3 py-2 mx-5 my-1 border-2 border-black border-solid rounded-2xl hover:bg-gray-200">
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