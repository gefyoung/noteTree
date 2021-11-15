import React, { useEffect, useRef, useState } from 'react'
import API from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'

import dynamic from "next/dynamic"
import Head from 'next/head'
import checkForCalls from './active/checkForCall'
import registerSubscription  from './active/registerSubscription'
const MessageInitOT = dynamic(() => import('./active/messageOtReceiver'), { ssr: false })

export default function Active() {

  const [state, setState] = useState({
    pageState: 'waiting',
    Receiver: null,
    apikey: null,
    caller: null,
    deviceInput: null,
    sessionId: null,
    token: null
  })
  const modifyState = e => setState({...state, ...e})
  const prevMessageRef = useRef('')

  const acceptCall = async () => {
    try {
      setState({ ...state, pageState: 'accepted' })
      const userSession = await Auth.currentSession()
      const authHeader = { headers: { Authorization: userSession.getIdToken().getJwtToken() } }
      const getOTsession = await API.get(process.env.NEXT_PUBLIC_APIGATEWAY_NAME, "/getSession", authHeader)
      /* check to see if the caller didn't disconnect, if they didn't use the already existing OT state */
      if (getOTsession.sessionId === 'null') {
        modifyState({
          pageState: 'disconnected',
          sessionId: null
        })
      }
    } catch (err) {
      console.log("acceptCall err: ", err)
    }
  }

  const declineCall = async () => {
    const authenticatedUser = await Auth.currentAuthenticatedUser()
    navigator.sendBeacon(
      process.env.NEXT_PUBLIC_APIGATEWAY_URL +
      "/disconnectCall" +
      "?receiver=" + authenticatedUser.username +
      "&sessionId=" + null
    )
    modifyState({
      pageState: 'waiting',
      sessionId: null
    })
  }

  const loadAsync = async () => {
    await registerSubscription()
    const call = await checkForCalls()
    if (call.sessionId) {
      console.log('call found')
      modifyState({
        Receiver: call.Receiver,
        apikey: call.apikey,
        sessionId: call.sessionId,
        token: call.token
      })
    }
  }

  useEffect(() => {
    loadAsync()
  }, [])

  const AcceptDecline = () => {
    return (
      <div className="container">
        <div className="mt-5 row justify-content-center">
          <button data-cy="accept" onClick={() => acceptCall()}>Accept Call</button>
        </div>
        <div className="mt-5 row justify-content-center">
          <button onClick={() => declineCall()}>Decline Call</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <script src="https://static.opentok.com/v2.20.1/js/opentok.min.js"></script>
      </Head>
      {/* <div className="flex flex-col min-h-screen"> */}
        <div className="flex-1 mt-20">
          {/* <Navbar /> */}
          <div className="mx-5 my-5">
            {state.pageState === 'waiting' && state.sessionId
              ? <AcceptDecline />
              : state.pageState === 'accepted'
                ? <div><MessageInitOT
                  prevMessages={prevMessageRef.current}
                  tokenData={state}
                // allowedDevices={state.TAVS}
                /></div>
                : state.pageState === 'disconnected'
                  ? <div>caller disconnected, waiting</div>
                  : state.pageState === "no auth"
                    ? <div>You need to be logged in</div>
                    : <div>
                      <div className="text-lg font-medium">Waiting on calls</div>
                      <div className="mt-5 max-w-prose">You will receive a push notification and prompt when called.
                      You do not need this tab open.</div>
                      <div>
                      </div>
                    </div>}
          </div>
        </div>
        {/* <Footer /> */}

      {/* </div> */}
    </>
  )
}