import React, { useEffect, useRef, useState } from 'react'
import API from '@aws-amplify/api'
import dynamic from "next/dynamic"
import Head from 'next/head'
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
  const modifyState = e => setState({ ...state, ...e })
  const prevMessageRef = useRef('')

  console.log(state)

  useEffect(() => {
    (async () => {
      try {
        const otSession: {
          sessionId: string
          apikey: string
          Receiver: string
          token: string
        } = await API.get(process.env.NEXT_PUBLIC_APIGATEWAY_NAME, "/getSession", null)
        modifyState({
          sessionId: otSession.sessionId,
          apikey: otSession.apikey,
          Receiver: otSession.Receiver,
          token: otSession.token
        })
      } catch (err) {
        console.log(err)
        modifyState({
          sessionId: null,
          apikey: null,
          Receiver: null,
          token: null
        })
      }
    })()
  }, [])

  return (
    <>
      <Head>
        <script src="https://static.opentok.com/v2.20.1/js/opentok.min.js"></script>
      </Head>

      <div className="flex-1 mt-20">
        <div className="mx-5 my-5">
          {
            state.sessionId ? <div><MessageInitOT
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
    </>
  )
}