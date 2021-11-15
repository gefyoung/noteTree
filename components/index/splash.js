import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import API from '@aws-amplify/api'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
// import Modal from '../navbar/modal'
export default function SplashPage() {
  const emailRef = useRef()
  const router = useRouter()
  // const [modalState, setModalState] = useState(null)

  const userButtonClick = () => {
    router.push('/geoff-young')
  }
  const signUpClick = () => {
    setModalState("Sign Up")
  }

  return (
    <>
      <div className="flex justify-center mt-40">
        <div className="flex-col m-5 w-192">
          <div className="text-3xl">Statically render your Notion.so pages for free</div>
          <div className="my-5 text-xl">Why?</div>
          <div className="text-2xl">Search Engine Optimization</div>
          <div>Jumpstart your freelancing</div>
          <div>Capture long tail searches just by publishing your notes</div>
          <div>Companies, including Notion, charge $24+ per year for static rendering</div>
        </div>
      </div>
    </>
  )
}