import React, { useState } from 'react';
// import TAVSparent from './tavsParent'
import MessageReceiver from './messageReceiver'
import CustomSpinner from '../../custom/spinner'
declare var OT

const MessageInitOT = ({ prevMessages, tokenData }) => {
  const [state, setState] = useState({
    session: null,
    callEnded: false
  })
  const modifyState = e => setState({...state, ...e})

  const tokenDataProps = tokenData
  if (state.callEnded) {
    return (
      <div className="flex m-40 text-xl justify center">Call ended</div>
    )
  }
  if (state.session) {
    return (
      <MessageReceiver
      modifyState={modifyState}
        prevMessages={prevMessages}
        otSession={state.session}
      />
    )
  } else {
    const otSession = OT.initSession(tokenDataProps.apikey, tokenDataProps.sessionId)
    otSession.connect(tokenDataProps.token, function (err) {
      if (err) { console.log(err) } else {
        setState({ ...state, session: otSession })
      }
    })
    return (
      <div className="flex justify-center m-40"><CustomSpinner /></div>
    )
  }

}

export default MessageInitOT

