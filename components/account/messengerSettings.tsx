import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'
import { CognitoUser, } from '@aws-amplify/auth'
import { CognitoUserX, GoogleUser } from '../../utils/types'

const MessengerSettings = ({ modifyState, notionId, username, available, ppm, stripeReciever }) => {

  const goOnlineOffline = async (props: Boolean) => {
    try {

      const currentUser: CognitoUserX | GoogleUser = await Auth.currentAuthenticatedUser()

      const email = currentUser instanceof CognitoUser
        ? currentUser.attributes.email
        : currentUser.email

      const updateUserInit = {
        body: { available: props, email: email }
      }

      const updatedUser = await API.post(
        process.env.NEXT_PUBLIC_APIGATEWAY_NAME, '/updateSelfInactive', updateUserInit
      )
      modifyState({ available: updatedUser.available })
    } catch (err) {
      console.log(err)
    }
  }

  return ( 
    <div>
      <div className="mt-16 mb-8">You are currently { available ? 'Online' : 'Offline' }</div>
      <button onClick={() => goOnlineOffline(!available)}>{available ? "Go offline" : "Go online"} </button>
    </div>
  )
}

export default MessengerSettings