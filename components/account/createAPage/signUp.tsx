import React, { useState, useRef, useEffect } from 'react'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/router'
import CustomSpinner from '../../custom/spinner'
import '../../../configureAmplify'
import UserAgreement from './userAgreement'
import Google from './google'
import { CreatePageProps, PageProps } from '../../../utils/types'

const SignUp = ({ setPageState, ...props }: CreatePageProps) => {


  const [submitAccountState, setSubmitAccountState] = useState(false)
  const [submitConfirmationState, setSubmitConfirmationState] = useState(false)
  const [submitConfirmation, setSubmitConfirmation] = useState(null)
  const [hiddenPassState, setHiddenPassState] = useState(true)
  const [errState, setErrState] = useState(null)
  const [loginState, setLoginState] = useState({
    username: '',
    email: '',
    password: '',
    code: '',
  })

  const router = useRouter()

  const userAddHandler = async e => {
    e.preventDefault();

    try {
      await Auth.signUp({
        username: "" + loginState.email,
        password: "" + loginState.password,
        attributes: {
          email: loginState.email
        }
      })
      setErrState("accepted")
      setSubmitAccountState(true)
    } catch (err) {
      console.log(err)
      if (err.message === "Username should be an email." || err.code === "UsernameExistsException") {
        setErrState("emailBad")
      }
      if (err.message.includes('password')) {
        setErrState("passBad")
      }
      setSubmitAccountState(false)
    }
  }

  const userVerifyHandler = async e => {
    e.preventDefault();
    setSubmitConfirmationState(true)
    try {
      await Auth.confirmSignUp(loginState.email, loginState.code)
      setSubmitConfirmation("accepted")
      setSubmitConfirmationState(false)
      const authSignInRes = await Auth.signIn(loginState.email, loginState.password)
      router.push('/account')
    } catch (err) {
      console.log(err)
      setSubmitConfirmation("denied")
      setSubmitConfirmationState(false)
    }
  }

  return (
    <div className="flex flex-col ">
      <div className="mb-10 text-3xl ">Create an account</div>
      <div className="flex justify-center mt-5">
        <Google {...props} setPageState={setPageState} />
      </div>
    <div className="flex justify-center mt-5">Or</div>
      {!submitAccountState ? <div className="my-5">
        <div className="mb-5">
          Email
          <div>
            <input
              onChange={(event) => setLoginState({ ...loginState, email: event.target.value })}
              disabled={(errState === "accepted")}
              placeholder="enter email">
            </input>{(errState === "emailBad") && ' ❌'}
          </div>
        </div>
        <div className="mb-5">
          Password
          <div className="container-fluid row">
            <input
              type={hiddenPassState ? "password" : "text"}
              onChange={(event) => setLoginState({ ...loginState, password: event.target.value })}
              disabled={(errState === "accepted")}
              placeholder="enter password"
            ></input>
            <span
              className="ml-2"
              style={{ cursor: "pointer" }}
              onClick={() => setHiddenPassState(!hiddenPassState)}>
              <span></span>{(hiddenPassState) ? 'show' : 'hide'}
            </span>
            {(errState === "passBad") && ' ❌'}

          </div>
          {/* <div>please make it complicated</div> */}
        </div>
        <div className="mb-5">
          <button disabled={(errState === "accepted")} onClick={userAddHandler}>Submit</button>
          {(errState === "accepted") && ' ✔️'}
          {submitAccountState && <CustomSpinner />}
        </div></div> : <div className="m-5 column">

        <div className="mb-2">We sent a confirmation code to your email</div>
        <div className="mb-3">
          <input onChange={(event) => setLoginState({ ...loginState, code: '' + event.target.value })} placeholder="Confirmation code"></input>
        </div>
        <div>
          <button disabled={submitConfirmationState} onClick={userVerifyHandler}>submit</button>
          {submitConfirmationState && <CustomSpinner />}
          {(submitConfirmation === "accepted") ? <CustomSpinner /> : (submitConfirmation === "denied") ? ' ❌' : null}
        </div>

      </div>}
      <div className=""><UserAgreement /></div>
      <div className="mt-10 ">
        Already have an account? <span className="text-blue-500 cursor-pointer " onClick={() => setPageState('login')}>LOG IN</span>
      </div>
    </div>
  )


}

export default SignUp