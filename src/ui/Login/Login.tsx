'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useStore } from '@/store/useStore';

type UserLoginForm = {
  email: string;
  password: string;
};
type UserLoginFormErrors = {
  email?: string;
  password?: string;
  validation?: string;
};

const Login = () => {
  const { setLoginStatus } = useStore() as any;
  const router = useRouter();
  const [formData, setFormData] = useState<UserLoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<UserLoginFormErrors>();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = {} as any;

    if (formData.email.trim() === '') {
      validationErrors.email = 'Email is required';
    }
    if (formData.password.trim() === '') {
      validationErrors.password = 'Password is required';
    }

    setErrors(validationErrors);

    // If no errors, submit the form

    if (Object.keys(validationErrors).length === 0) {
      fetch('/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            setLoginStatus(true);
            router.push('/');
            return;
          }
          setErrors((prevState) => ({
            ...prevState,
            validation: 'Invalid email/password',
          }));
        })
        .catch(() => {});
    }
  };

  return (
    // <div className={styles.formWrapper}>
    <div className="flex h-full w-full items-center justify-center bg-blue-900">
      <form
        className="flex h-fit flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex w-full flex-col items-center justify-center">
          <h1 className="mb-2 text-xl">Log in</h1>
          <Image
            src={'/assets/images/pngegg.png'}
            alt="Nextjs starter banner"
            width={120}
            height={120}
            className="cursor-pointer"
          />
        </div>

        <div className="mt-2 flex w-full flex-col">
          <div className="flex items-start justify-between">
            <label htmlFor="email">Email:</label>
            <input
              className="ml-2 rounded border-2 border-solid"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="font-normal text-red-600">
            {errors?.email && <span>{errors.email}</span>}
          </div>
        </div>
        <div className="mt-2 flex w-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <label htmlFor="password">Password:</label>
            <input
              className="ml-2 rounded border-2 border-solid"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="font-normal text-red-600">
            {errors?.password && <span>{errors.password}</span>}
          </div>
          <div className="font-normal text-red-600">
            {errors?.validation && <span>{errors.validation}</span>}
          </div>
        </div>
        <button className="mx-auto mt-2 rounded-lg border-2 border-solid border-slate-500 px-4 py-1 hover:bg-slate-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
