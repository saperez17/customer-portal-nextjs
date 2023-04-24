import Image from 'next/image';
import React from 'react';

type UserCardProps = {
  name: string | null;
  url: string | null;
  createdAt: string | null;
  membershipLevel: string | null;
};

export const Card = ({ name, url, membershipLevel }: UserCardProps) => {
  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <Image
          className="mb-3 rounded-full shadow-lg"
          src="/assets/images/customer.png"
          alt="Bonnie image"
          width={120}
          height={120}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-gray-500 dark:text-gray-400">{url}</span>
        <span className="font-semibold text-gray-500 dark:text-gray-400">
          {membershipLevel}
        </span>
        {membershipLevel === 'free' && (
          <button className="rounded-sm border-2 border-solid border-cyan-300 bg-cyan-100 px-6 py-1 hover:bg-cyan-200 ">
            Join
          </button>
        )}
      </div>
    </div>
  );
};
