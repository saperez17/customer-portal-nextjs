import '../styles/global.css';

import React from 'react';

import Navbar from '@/ui/Navbar/Navbar';
import { TrpcProvider } from '@/utils/trpc-provider';

import { Provider } from './Provider';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  // const [showDropdown, setShowDropdown] = useState(false);

  return (
    <html lang="en">
      <body>
        <TrpcProvider>
          <Provider>
            <div className="flex h-screen flex-col">
              <Navbar />

              {children}
            </div>
          </Provider>
        </TrpcProvider>
      </body>
    </html>
  );
}
