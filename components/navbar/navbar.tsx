import React from "react";
import Link from 'next/link'
import '../../configureAmplify'

const NavbarComp = ({ auth, notionId, username }) => {

  const aboutClicked = () => {
    window && window.fathom.trackGoal('AMD53BUZ', 0)
  }
  const createYourPageClicked = () => {
    window && window.fathom.trackGoal('KADITVRD', 0)
  }

  return (
    <div className="flex">
      <div className="flex-1"></div>
      <div className="my-8 w-192">
        <div className="flex flex-row">

          <Link href="/">
            <a onClick={() => aboutClicked()} 
              className="px-3 py-2 ml-5 mr-5 rounded-2xl hover:bg-gray-200">
              About
            </a>
          </Link>

          {notionId && <Link href={'/' + username} >
            <a className="px-2 py-1 my-1 mr-5 rounded hover:bg-gray-200 ">
              Your page
            </a>
          </Link>}

          <Link href="/account">
            {auth 
            ? <a className="px-3 py-2 rounded-2xl hover:bg-gray-200">
              Account
            </a>
            : <a 
                className="px-3 py-2 ml-10 border-2 border-black border-solid rounded-2xl hover:bg-gray-200"
                onClick={() => createYourPageClicked()}
              >
              Create your page
            </a>}
          </Link>

        </div>
      </div>
      <div className="flex-1"></div>
    </div >
  )
}

export default NavbarComp;