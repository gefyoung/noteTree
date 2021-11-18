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

const Settings = ({ auth, updateAuth, username, notionId }) => {

  const [state, setState] = useState({
    page: '',
    notionId: null,
    username: null,
    available: null,
    ppm: null,
    stripeReciever: null
  })
  const modifyState = e => setState({ ...state, ...e })

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const self = await API.get(process.env.NEXT_PUBLIC_APIGATEWAY_NAME, '/getSelf', null)
  //       console.log('self', self)
  //       setState({ ...state, username: self.username, notionId: self.notionId })
  //     } catch (err) { console.log(err)}
  //   })()

  // }, [])

  return (
    <>
    <div className="flex ">
      <div><button onClick={() => setState({...state, page: 'page'})}>Page settings</button></div>
      <div><button onClick={() => setState({...state, page: 'account'})}>Account settings</button></div>
      <div><button onClick={() => setState({...state, page: 'messenger'})}>Messenger settings</button></div>
    </div>
    <div>
      {
      state.page === 'messenger' 
      ? <MessengerSettings modifyState={modifyState} {...state} />
      : state.page === 'account' 
      ? <AccountSettings auth={auth} updateAuth={updateAuth} /> 
      : <UploadNotionComponent username={username} notionId={notionId} />  }
    </div>
    </>
  )
}

export default Settings