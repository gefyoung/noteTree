import { CognitoUser } from '@aws-amplify/auth';

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
