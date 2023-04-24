'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { cookies } from 'next/dist/client/components/headers';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export const Provider = ({ children }: Props) => {
  useEffect(() => {}, [cookies]);

  return <SessionProvider>{children}</SessionProvider>;
};
