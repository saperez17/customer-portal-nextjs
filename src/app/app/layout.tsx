import React from 'react';

type MarketingLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: MarketingLayoutProps) {
  return <div className="flex grow">{children}</div>;
}
