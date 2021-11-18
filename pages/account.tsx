
import React, { useContext, useEffect, useState, } from 'react'
import API from '@aws-amplify/api'
import '../configureAmplify'
import LoginComponent from '../components/account/loginComponent'
import AccountSettings from '../components/account/accountSettings'
import Settings from '../components/account/settings'
import { AuthContext } from '../utils/context'
import Auth from '@aws-amplify/auth'
import CustomSpinner from '../components/custom/spinner'

const Account = ({ auth, updateAuth, username, notionId, updateUserState }) => {

  return (
    <>
      <div className="flex">
        <div className="flex-1"></div><div className="w-192">{
          auth === null ? <CustomSpinner /> : auth
            ? <Settings 
              updateUserState={updateUserState} 
              auth={auth} 
              username={username} 
              notionId={notionId} 
              updateAuth={updateAuth} />
            : <LoginComponent auth={auth} updateAuth={updateAuth} />
        }</div>
        <div className="flex-1"></div>
      </div>
    </>
  )
}

export default Account