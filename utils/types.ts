import { CognitoUser } from '@aws-amplify/auth';

declare global {
    interface Window { fathom: any, gapi: any }
}

interface UserAttributes {
    sub: string;
    email: string;
    email_verified: string;
    name: string;
    updated_at: string;
    'custom:bytesQuota': string;
    'custom:bytesUsed': string;
}

export interface CognitoUserX extends CognitoUser {
    attributes: UserAttributes;
}

export interface GoogleUser {
    email: string,
    id?: string,
    name?: string,
    picture?: string
    [key: string]: any
}

export interface PageProps {
    auth: Boolean,
    notionId: String,
    username: String,
    available: Boolean,
    updateAuth: Function,
    updateUserState: Function
}

export interface CreatePageProps extends PageProps {
    setPageState: Function
  }