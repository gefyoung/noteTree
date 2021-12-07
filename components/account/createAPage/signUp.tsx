import React, { useState, useRef, useEffect } from 'react'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/router'
import CustomSpinner from '../../custom/spinner'
import '../../../configureAmplify'
import Link from 'next/link'
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
        username: "" + loginState.username,
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
      await Auth.confirmSignUp(loginState.username, loginState.code)
      setSubmitConfirmation("accepted")
      setSubmitConfirmationState(false)
      const authSignInRes = await Auth.signIn(loginState.email, loginState.password)
      router.push('/' + authSignInRes.username)
    } catch (err) {
      console.log(err)
      setSubmitConfirmation("denied")
      setSubmitConfirmationState(false)
    }
  }

    return (
      <div className="container">
        <Google {...props} setPageState={setPageState} />
        <span>By continuing, you agree to our </span>
        <span className="text-blue-500" >
          <Link href="/about/tos"><a>User Agreement</a></Link>
        </span>
        <span> and </span>
        <span className="text-blue-500">
          <Link href="/about/privacy"><a>Privacy Policy</a></Link>
        </span>
        <span>
          .
        </span>
        {!submitAccountState ? <div className="m-5">
          <div className="mb-5">
            Email
            <div>
              <input 
                onChange={(event) => setLoginState({...loginState, email: event.target.value})} 
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
                onChange={(event) => setLoginState({...loginState, password: event.target.value})}
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
            <input onChange={(event) => setLoginState({...loginState, code: '' + event.target.value})} placeholder="Confirmation code"></input>
          </div>
          <div>
            <button disabled={submitConfirmationState} onClick={userVerifyHandler}>submit</button>
            {submitConfirmationState && <CustomSpinner />}
            {(submitConfirmation === "accepted") ? <CustomSpinner /> : (submitConfirmation === "denied") ? ' ❌' : null}
          </div>

        </div>}
        <div className="mt-10">
          Already have an account? <span className="text-blue-500 cursor-pointer " onClick={() => setPageState('login')}>LOG IN</span>
        </div>
      </div>
    )


}

export default SignUp