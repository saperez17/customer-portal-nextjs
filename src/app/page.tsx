import type { Shop } from '@prisma/client';
import React from 'react';

import { Card } from '@/ui/Card/Card';

export async function getData() {
  const res = await fetch('http://localhost:3000/api/shops');
  const { data } = await res.json();
  return {
    shops: data,
  };
}

const Page = async () => {
  const data = await getData();
  // const { data: users } = await res.data.json();

  return (
    <div className=" ">
      <div className="mt-8 flex flex-col items-center justify-center">
        <h1 className="inline-block text-2xl">Welcome to Customer Portal!</h1>
        <h2 className="text-lg">Find all the available shops below</h2>
      </div>

      <div className="flex flex-row flex-wrap gap-4 px-8">
        {data.shops.map((shop: Shop) => (
          <Card
            key={`${shop.id}${shop.shopName}`}
            name={shop.shopName}
            createdAt={new Date(shop.createdAt).toISOString()}
            url={shop.shopUrl}
            membershipLevel={shop.membershipLevel}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
