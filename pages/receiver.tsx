import { useEffect, useState } from "react"
import API from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import '../configureAmplify'
import CustomSpinner from "../components/custom/spinner"
import Active from "../components/receiver/active"
// import TAVS from '../components/receiver/tavs'
import PPM from '../components/receiver/ppm'
import ConnectStripe from '../components/receiver/connectStripe'

export default function Receiver({ available }) {


  return (
    <>
      <div >
        {
          available === null
            ? <div className="flex justify-center mt-32"><CustomSpinner /></div>
            : !available ? <div>error</div>
              : <Active />
        }
      </div>
    </>
  )
}
