
import React, { useContext, useEffect, useState, } from 'react'
import API from '@aws-amplify/api'
import '../configureAmplify'
import LoginComponent from '../components/account/loginComponent'
import AccountSettings from '../components/account/accountSettings'
import Settings from '../components/account/settings'
import { AuthContext } from '../utils/context'
import Auth from '@aws-amplify/auth'

const Account = ({ auth, updateAuth, username, notionId }) => {

  return (
    <>
      <div className="flex">
        <div className="flex-1"></div><div className="w-192">{
          auth
            ? <Settings auth={auth} username={username} notionId={notionId} updateAuth={updateAuth} />
            : <LoginComponent auth={auth} updateAuth={updateAuth} />
        }</div>
        <div className="flex-1"></div>
      </div>
    </>
  )
}

export default Account