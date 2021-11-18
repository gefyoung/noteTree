import API from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import { useEffect, useRef, useState } from 'react'
import { parsePageId } from 'notion-utils'
import CustomSpinner from '../custom/spinner'
import { useRouter } from 'next/router'
// import '../../configureAmplify'

const UploadNotionComponent = ({ username, notionId, updateUserState }) => {

  const notionRef = useRef(null)
  const usernameRef = useRef(null)

  const [loadingState, setLoadingState] = useState(false)

  const router = useRouter()

  const saveNotionId = async () => {
    setLoadingState(true)
    const parsedId = notionRef.current.value ? parsePageId(notionRef.current.value) : null
    let username = ''
    try {
      const saveNotionInit = {
        body: {
          notionId: parsedId,
        }
      }
      const notionRes = await API.post(process.env.NEXT_PUBLIC_APIGATEWAY_NAME, '/saveNotionId', saveNotionInit)
      updateUserState({ notionId: notionRes.notionId })
    } catch (err) {
      console.log(err)
    }
    setLoadingState(false)
  }

  const submitUsername = async () => {
    setLoadingState(true)
    const usernameInit = {
      body: { username: usernameRef.current.value }
    }
    try {
      const savedUser = await API.post(process.env.NEXT_PUBLIC_APIGATEWAY_NAME, '/saveUsername', usernameInit)
      updateUserState({ username: savedUser.username })
    } catch (err) {
      console.log(err)
    }
    setLoadingState(false)
  }

  if (!username) {
    return (
      <div className="flex justify-center m-8">
        <div className="flex-col">

          <div className="flex flex-row">
            <input type="text" className="px-3 mr-3 border shadow" ref={usernameRef} placeholder="username"></input>
            <button className="mr-3" onClick={submitUsername}>Create a Username</button>
            {loadingState && <CustomSpinner />}
          </div>
        </div>
      </div>
    )
  } else if (!notionId) {
    return (

      <div className="flex justify-center m-8">
        <div className="flex-col">

          <div className="flex flex-row">
            <input type="text" className="px-3 mr-3 border shadow" ref={notionRef} placeholder="notionPageId or URL"></input>
            <button className="mr-3" onClick={saveNotionId}>Add notion page</button>
            {loadingState && <CustomSpinner />}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="flex mt-12">
          <div className="flex-col">
            <div>
              your username is {username}
            </div>
            <div className="flex flex-row">
              <input type="text" className="px-3 mr-3 border shadow" ref={usernameRef} placeholder="notionPageId or URL"></input>
              <button className="mr-3" onClick={submitUsername}>Change your username</button>
              {loadingState && <CustomSpinner />}
            </div>
            <div className="mt-10">
            <div>
              your notionId is {notionId}
            </div>
            <div className="flex flex-row">
              <input type="text" className="px-3 mr-3 border shadow" ref={notionRef} placeholder="notionPageId or URL"></input>
              <button className="mr-3" onClick={saveNotionId}>Change notion page</button>
              {loadingState && <CustomSpinner />}
            </div>
            <div className="mt-5"><button onClick={() => router.push('/' + username)}>visit page</button></div>
            </div>

          </div>


        </div>


        
      </div>
    )
  }


}

export default UploadNotionComponent