import { useEffect, useState } from "react"
import API from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import '../configureAmplify'
import CustomSpinner from "../components/custom/spinner"
import Active from "../components/receiver/active"
// import TAVS from '../components/receiver/tavs'
import PPM from '../components/receiver/ppm'
import ConnectStripe from '../components/receiver/connectStripe'

export default function Receiver() {
  const [state, setState] = useState({
    available: null,
    ppm: 0,
    stripeReceiver: false,
    audio: false,
    video: false,
    screen: false,
    text: true,
    stripeUrl: null,
  })
  const modifyState = e => setState({ ...state, ...e })
  console.log(process.env.NEXT_PUBLIC_STAGE)
  useEffect(() => {
    (async () => {
      /* used to populate all the settings */
      try {
        const gotSelf = await API.get(process.env.NEXT_PUBLIC_APIGATEWAY_NAME, '/getSelf', null)
        console.log("gotself", gotSelf)
        modifyState({
          // ppm: Number(gotSelf.ppm),
          // stripeReceiver: gotSelf.receiver,
          available: gotSelf.available
        })
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return (
    <>
      <div >
        {
          state.available === null
            ? <div className="flex justify-center mt-32"><CustomSpinner /></div>
            : state.available === undefined ? <div>error</div>
              : <Active />
        }
      </div>
    </>
  )
}
