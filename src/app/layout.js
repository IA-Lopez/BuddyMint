"use client";
import './globals.css';
import Header from '../components/Header';
import { Providers } from './providers';
import '@rainbow-me/rainbowkit/styles.css';

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Buddy Platinum Pass" />
        <title>Mint - Platinum Pass</title>
      </head>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
