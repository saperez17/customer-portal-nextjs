import type { SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import {
  JWT_ACCESS_TOKEN_PRIVATE_KEY,
  JWT_ACCESS_TOKEN_PUBLIC_KEY,
  JWT_REFRESH_TOKEN_PRIVATE_KEY,
  JWT_REFRESH_TOKEN_PUBLIC_KEY,
} from './envVariables';

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
): string | undefined => {
  let privateKey = JWT_ACCESS_TOKEN_PRIVATE_KEY;

  if (keyName === 'refreshTokenPrivateKey') {
    privateKey = JWT_REFRESH_TOKEN_PRIVATE_KEY;
  }
  const stringPrivateKey = Buffer.from(privateKey as any, 'base64').toString(
    'ascii'
  );
  try {
    const signedKey = jwt.sign(payload, stringPrivateKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
    return signedKey;
  } catch (e) {
    throw Error('error');
  }
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    let publicKey = JWT_ACCESS_TOKEN_PUBLIC_KEY;

    if (keyName === 'refreshTokenPublicKey') {
      publicKey = JWT_REFRESH_TOKEN_PUBLIC_KEY;
    }

    const stringPublicKey = Buffer.from(publicKey as any, 'base64').toString(
      'ascii'
    );
    const decoded = jwt.verify(token, stringPublicKey) as any;

    return decoded;
  } catch (error) {
    return null;
  }
};
