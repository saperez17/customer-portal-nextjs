'use client';

import React from 'react';

import UserForm from '@/ui/UserForm/UserForm';

export async function getData() {
  const res = await fetch('http://localhost:3000/api/auth/me');
  const data = await res.json();

  return {
    name: data.name,
    email: data.email,
    profileImage: data.profileImage,
  };
}

const Account = async () => {
  const user = await getData();

  return (
    <div className="w-full bg-gray-50">
      <UserForm
        data={user}
        title="Profile info"
        submitButtonText="Update"
        // onSubmitForm={() => {}}
      />
    </div>
  );
};

export default Account;
