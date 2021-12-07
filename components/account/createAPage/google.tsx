
import { Auth } from '@aws-amplify/auth'
import { useContext, useEffect, useState } from 'react'
import { CreatePageProps, PageProps } from '../../../utils/types';


export default function Google({ ...props}: CreatePageProps) {

  const initGapi = () => {
    // init the Google SDK client
    const g = window.gapi;
    g.load('auth2', function() {
        g.auth2.init({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT,
            // authorized scopes
            scope: 'profile email openid'
        });
    });
}

  const federated = { googleClientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT }

  const authHandler = async (authEvent) => {
    if (authEvent === "signedin") {
      props.updateAuth(true)
    }
  }

  const createScript = () => {
    // load the Google SDK
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.async = true
    script.onload = initGapi
    document.getElementById('div').appendChild(script)
}
  console.log("gapi", window.gapi)
  useEffect(() => {
    const ga = window.gapi && window.gapi.auth2 ? 
        window.gapi.auth2.getAuthInstance() : 
        null;

    if (!ga) createScript();
}, [])

const signIn = () => {
  const ga = window.gapi.auth2.getAuthInstance();
  ga.signIn().then(
      googleUser => {
          getAWSCredentials(googleUser);
      },
      error => {
          console.log(error);
      }
  );
}

const getAWSCredentials = async (googleUser) => {
  const { id_token, expires_at } = googleUser.getAuthResponse();
  const profile = googleUser.getBasicProfile();
  let user = {
      email: profile.getEmail(),
      name: profile.getName()
  };
  
  const credentials = await Auth.federatedSignIn(
      'google',
      { token: id_token, expires_at },
      user
  );
  console.log('credentials', credentials);
}


  return (
    <>
    <div id="div">
    <div className="col s12 m6 offset-m3 center-align">
    <div className="oauth-container btn darken-4 white black-text text-transform:none">
        <div className="left">
            <img width="20px" className="mt-7px mr-8px" alt="Google sign-in" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        </div>
        Login with Google
    </div>
    </div>
    </div>
    </> 
  )
}