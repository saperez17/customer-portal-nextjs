'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import type { User } from '@/ui/UserForm/UserForm';
import UserForm from '@/ui/UserForm/UserForm';

const Auth = () => {
  const router = useRouter();

  const registerUserHandler = async (newUser: User) => {
    const res = await fetch('/api/auth/signup/', {
      method: 'POST',
      body: JSON.stringify({
        ...newUser,
      }),
    });
    if (res.ok) {
      router.push('/app/login');
    }
  };

  return (
    <UserForm
      title="Sign up"
      submitButtonText="Create account"
      onSubmitForm={registerUserHandler}
    />
  );
};

export default Auth;
