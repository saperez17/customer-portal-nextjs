'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export type User = {
  profileImage: string;
  name: string;
  email: string;
  password: string;
};

type UserFormProps = {
  title: string;
  submitButtonText: String;
  onSubmitForm?: (newUser: User) => void;
  onCancelForm?: CallableFunction;
  data?: Partial<User>;
};

const UserForm = ({
  title,
  submitButtonText,
  data,
  onSubmitForm,
}: UserFormProps) => {
  const [formData, setFormData] = useState<User>({
    profileImage: '',
    name: data?.name || '',
    email: data?.email || '',
    password: '',
  });
  const [errors, setErrors] = useState<User>();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = {} as any;

    // Simple validation checks
    if (formData.name.trim() === '') {
      validationErrors.firstname = 'First name is required';
    }
    if (formData.email.trim() === '') {
      validationErrors.email = 'Email is required';
    }
    if (formData.password.trim() === '') {
      validationErrors.password = 'Password is required';
    }

    setErrors(validationErrors);

    // If no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      if (onSubmitForm) {
        onSubmitForm(formData);
      }
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50">
      <form
        className="flex h-fit flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex w-full flex-col items-center justify-center">
          <h1 className="mb-2 text-xl">{title}</h1>
          <Image
            src={'/assets/images/pngegg.png'}
            alt="Nextjs starter banner"
            width={120}
            height={120}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-start justify-between">
          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="text"
            id="profileImage"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            className="ml-2 rounded border-2 border-solid"
          />
        </div>

        <div className="mt-2 flex w-full flex-col">
          <div className="flex items-start justify-between">
            <label htmlFor="name">Name:</label>
            <input
              className="ml-2 rounded border-2 border-solid"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="font-normal text-red-600">
            {errors?.name && <span>{errors.name}</span>}
          </div>
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
        </div>
        <button className="mx-auto mt-2 rounded-lg border-2 border-solid border-slate-500 px-4 py-1 hover:bg-slate-300">
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
