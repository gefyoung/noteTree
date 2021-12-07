
import React from 'react'
import '../configureAmplify'
import CreateYourPage from '../components/account/createYourPage'
import Settings from '../components/account/settings'
import CustomSpinner from '../components/custom/spinner'
import Head from 'next/head'
import { PageProps } from '../utils/types'

const Account = (props: PageProps) => {

  const { auth } = props

  return (
    <>
      <Head>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </Head>
      <div className="flex">
        <div className="flex-1"></div><div className="w-192">{
          auth === null 
            ? <CustomSpinner className="flex justify-center mt-24" /> 
            : auth
            ? <Settings {...props} />
            : <CreateYourPage {...props} />
        }</div>
        <div className="flex-1"></div>
      </div>
    </>
  )
}

export default Account