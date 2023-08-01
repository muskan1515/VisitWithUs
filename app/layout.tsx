// import { Nunito } from 'next/font/google'

import Navbar from '@/app/components/Navbar/Navbar';
import LoginModal from '@/app/components/Modal/LoginModal';
import RegisterModal from '@/app/components/Modal/RegisterModal';
import SearchModal from '@/app/components/Modal/SearchModal';
import RentModal from '@/app/components/Modal/RentModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

// const font = Nunito({ 
//   subsets: ['latin'], 
// });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body >
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}