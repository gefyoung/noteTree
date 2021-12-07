import React, { useState, useRef, useEffect } from 'react'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/router'
import CustomSpinner from '../custom/spinner'
import '../../configureAmplify'
import Link from 'next/link'
import LogIn from './createAPage/logIn'
import SignUp from './createAPage/signUp'
import { PageProps } from '../../utils/types'
import ResetPassword from './createAPage/resetPassword'

const CreateYourPage = (props: PageProps) => {

  const [pageState, setPageState] = useState('create')

  return (
    <div className="flex justify-center">
      {pageState === 'login' 
      ? <LogIn setPageState={setPageState}/>
      : pageState ==='resetPass'
      ? <ResetPassword setPageState={setPageState}/>
      : <SignUp {...props} setPageState={setPageState} />}
    </div>
  )

}

export default CreateYourPage