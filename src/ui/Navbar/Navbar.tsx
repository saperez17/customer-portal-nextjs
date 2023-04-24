'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useStore } from '@/store/useStore';

const Navbar = () => {
  const router = useRouter();
  const { auth, setLoginStatus } = useStore() as any;

  const [show, setShow] = useState(false);

  const logoutHandler = async () => {
    const res = await fetch('/api/auth/signout');
    if (res.ok) {
      setLoginStatus(false);
      router.push('/');
    }
  };

  return (
    <nav className="flex items-center justify-between bg-blue-900 px-6 py-3 text-white">
      <Image
        src={'/favicon-32x32.png'}
        alt="Nextjs starter banner"
        width={26}
        height={26}
        onClick={() => router.push('/')}
        className="cursor-pointer"
      />
      <ul className="m-0 flex list-none flex-row p-0">
        <li className="mr-4">
          <Link href="/" className="text-xl  text-white hover:text-blue-500">
            Home
          </Link>
        </li>
        <li className="mr-4">
          <a href="/app" className="text-xl text-white hover:text-blue-500">
            App
          </a>
        </li>
        {auth.isLoggedIn && (
          <li className="mr-4">
            <Link
              href="/app/profile"
              className="text-xl text-white hover:text-blue-500"
            >
              Profile
            </Link>
          </li>
        )}
      </ul>
      <div className="relative">
        <button
          className="cursor-pointer border-none bg-transparent  text-xl text-white hover:text-blue-500"
          type="button"
          onClick={() => setShow(!show)}
        >
          Account
        </button>
        <ul
          className={`absolute right-0 top-full ${
            !show ? 'hidden' : ''
          } rounded-md bg-white p-1 shadow-md`}
        >
          {!auth.isLoggedIn && (
            <>
              <li className="p-2">
                <Link
                  href="/app/login"
                  className="text-black hover:text-blue-500"
                >
                  Login
                </Link>
              </li>

              <li className="p-2">
                <Link
                  href="/app/auth"
                  className="text-black hover:text-blue-500"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
          {auth.isLoggedIn && (
            <>
              <li className="p-2">
                <Link
                  href="/app/account"
                  className="text-black hover:text-blue-500"
                >
                  Account Settings
                </Link>
              </li>
              <li className="p-2">
                <p
                  className="cursor-pointer text-black hover:text-blue-500"
                  onClick={logoutHandler}
                >
                  Log out
                </p>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
