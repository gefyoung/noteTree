import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import API from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/router'
import CustomSpinner from "../custom/spinner"
// import '../configureAmplify'
import UploadNotionComponent from './uploadNotionComponent'
import { AuthContext } from '../../utils/context'
import AccountSettings from './accountSettings'
import MessengerSettings from './messengerSettings'

const Settings = (props) => {
  const { auth, updateAuth, username, notionId, updateUserState, available } = props
  const [pageState, setPageState] = useState('page')

  return (
    <>
    <div className="flex ">
      <div><button onClick={() => setPageState('page')}>Page settings</button></div>
      <div><button onClick={() => setPageState('account')}>Account settings</button></div>
      <div><button onClick={() => setPageState('messenger')}>Messenger settings</button></div>
    </div>
    <div>
      {
      pageState === 'messenger' 
      ? <MessengerSettings {...props} />
      : pageState === 'account' 
      ? <AccountSettings auth={auth} updateAuth={updateAuth} /> 
      : <UploadNotionComponent updateUserState={updateUserState} username={username} notionId={notionId} />  }
    </div>
    </>
  )
}

export default Settings