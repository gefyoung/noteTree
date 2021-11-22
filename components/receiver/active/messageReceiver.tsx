import React, { useEffect, useState, useRef, useReducer } from 'react';
import { useRouter } from 'next/router';
import TextOnlyComponent from '../../tavs/messenger/textOnly'
import PhoneButtons from '../../[id]/message/phoneButtons'

declare var OT

const MessageReceiver = ({ otSession, prevMessages, modifyState }) => {

  const [state, setState] = useState({
    audio: true,
    video: false,
    screen: false,
    text: true,
    mic: false,
    otherUser: false
  })
  const initialState = prevMessages
  const publisherRef = useRef()
  const micPublisherRef = useRef()
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const reducer = (curState, action) => {
    return curState + action.data + "\n"
  }
  const [textState, dispatchTextState] = useReducer(reducer, initialState)
  const router = useRouter()

  // const callDisconnected = () => {
  //   // go to blank page?
  // }

  const disconnectButton = async () => {
    otSession.disconnect()
    modifyState({ callEnded: true })

    // router.reload()
  }

  const onSignalSend = signalInputRefProp => {
    const signalObj = { "type": "signal", "data": "" + signalInputRefProp}
    otSession.signal(signalObj)
  }

  useEffect(() => {
    otSession.on('streamCreated', ({ stream }) => {
      if (stream.hasVideo) {
        const subscriberOptions = {
          width: 230,
          height: 200,
          insertMode: 'append'
        }
        otSession.subscribe(stream, "subscriber", subscriberOptions)
      } else {
        const subscriberOptions = {
          width: 1,
          height: 1
        }
        otSession.subscribe(stream, "micSubscriber", subscriberOptions)
      }
      // session.subscribe(stream, "subscriber", {
      //   width: 230, height: 200, insertMode: 'append', showControls: false,
      // })
    })
    otSession.on('signal', (event) => {
      const myConnectionId = otSession.connection.id
      if (event.data === '%t%yping') {
        if (event.from.connectionId !== myConnectionId) {
          setOtherUserTyping(true)
        }
      } else if (event.data === 'not%t%yping') {
        if (event.from.connectionId !== myConnectionId) {
          setOtherUserTyping(false)
        }
      } else {
        const messages = (event.from.connectionId === myConnectionId) ? {data: `you: ${event.data}` }
        : { data: `them: ${event.data}` }
      dispatchTextState(messages)
      let textArea = document.getElementById('textArea')
      textArea.scrollTop = textArea.scrollHeight
      }
    })
    otSession.on('connectionDestroyed', (connectionEvent) => {
      console.log('connectionDestroyed')
      otSession.disconnect()
      modifyState({ callEnded: true })
      
      // callDisconnected()
    })

  }, [])

  const publishMic = () => {
    const pubOptions = {
      insertMode: 'append',
      // showControls: false,
      width: 1,
      height: 1,
      videoSource: null,
    }
    micPublisherRef.current = otSession.publish('micPublisher', pubOptions)
  }
  const unPublish = () => {
    otSession.unpublish(publisherRef.current)
  }
  const unPublishMic = () => {
    otSession.unpublish(micPublisherRef.current)
  }

  const publishVideo = () => {
    const pubOptions = {
      insertMode: 'append',
      showControls: false,
      width: 80,
      height: 70,
      audioSource: null
    }
    publisherRef.current = otSession.publish('publisher', pubOptions)
  }
  const publishScreen = async () => {
    const userMedia = await OT.getUserMedia({ videoSource: 'screen' })
    const pubOptions = {
      audioSource: null,
      insertMode: 'append',
      showControls: false,
      width: 80,
      height: 70,
      videoSource: userMedia.getVideoTracks()[0],
    }
    publisherRef.current = otSession.publish('publisher', pubOptions)
  }

    return (
      <>
      <div >
        <div id="subscriber" className="border resize h-3/4" ></div>
        {state.text && <TextOnlyComponent 
          otherUser={true}
          textState={textState}
          onSignalSend={onSignalSend}
          session={otSession}
        />}
        <div id="publisher" ></div>
      {otherUserTyping ? <div>other user is typing</div> : <br/>}
        
      </div>
      <PhoneButtons 
      publishScreen={publishScreen}
      publishVideo={publishVideo}
      state={state} 
      setState={setState} 
      unPublish={unPublish} 
      publishMic={publishMic} 
      unPublishMic={unPublishMic}
      />
      <button data-cy="disconnect" className="mt-5" id="disconnect" onClick={() => disconnectButton()}>Disconnect</button>
      <div id="micSubscriber" ></div>
      <div id="micPublisher" ></div>
      </>
    )

}

export default MessageReceiver