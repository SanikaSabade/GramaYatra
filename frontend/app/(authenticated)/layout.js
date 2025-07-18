// app/layout.jsx
"use client";
import Header from "./Header/page";


export default function RootLayout({ children }) {
  return (
    <div>
<Header></Header>
        <main className="min-h-screen">{children}</main>
    </div>
  );
}

/*
<html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter bg-gray-100 min-h-screen flex flex-col">
        
        <main className="flex-grow">{children}</main>
        
      </body>
    </html>
*/