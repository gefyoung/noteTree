import { useState } from 'react'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'
import { CognitoUser, } from '@aws-amplify/auth'
import { CognitoUserX, GoogleUser } from '../../utils/types'
import urlBase64ToUint8Array from '../../utils/url64to8array'
import CustomSpinner from '../custom/spinner'

const MessengerSettings = ({ updateUserState, notionId, username, available, ppm, stripeReciever }) => {
  const [loadingState, setLoadingState] = useState(false)

  const goActive = async (props: Boolean) => {
    setLoadingState(true)
      try {

        const currentUser: CognitoUserX | GoogleUser = await Auth.currentAuthenticatedUser()

        const email = currentUser instanceof CognitoUser
          ? currentUser.attributes.email
          : currentUser.email

        const registration = await navigator.serviceWorker.ready

        if (Notification.permission !== "granted") {
          Notification.requestPermission()
        }

        const convertedVapidKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID)

        const subscription = await registration.pushManager.getSubscription()
          ? await registration.pushManager.getSubscription()
          : await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          })

        const subEndpoint = subscription.endpoint

        /* parse/stringify seems to be necessary, otherwise keys doesn't exist on that obj */
        const newSubscription = JSON.parse(JSON.stringify(subscription))

        const updateUserInit = {
          body: {
            available: props,
            email: props ? email : null,
            endpoint: props ? subEndpoint : null,
            auth: props ? newSubscription.keys.auth : null,
            p256dh: props ? newSubscription.keys.p256dh: null,
          }
        }
        console.log("updateUserInit", updateUserInit)

        const updatedUser = await API.post(
          process.env.NEXT_PUBLIC_APIGATEWAY_NAME, '/updateAvailability', updateUserInit
        )
        updateUserState({ available: updatedUser.available })

      } catch (err) {
        console.log(err)
      }
      setLoadingState(false)
  }

  return (
    
    <div>
      <div className="mt-16 mb-8">You are currently {available ? 'Online' : 'Offline'}</div>
      <button onClick={() => goActive(!available)}>{available ? "Go offline" : "Go online"} </button>
      {loadingState && <CustomSpinner />}
    </div>
  )
}

export default MessengerSettings