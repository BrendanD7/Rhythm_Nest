"use client"

// Home.tsx
import React, {useState} from 'react';
import LoginForm from './Components/LoginForm';
import NavBar from './Components/NavBar';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        setIsLoggedIn(true);
        console.log("User logged in");
    };

    return (
      <div>
        <NavBar isLoggedIn={isLoggedIn} />
        <main className="flex items-center justify-center md:h-screen">
          <div className="relative mx-auto flex w-full max-w-[50%] flex-col space-y-2.5 p-4 md:-mt-32">
              {isLoggedIn ? (
                  <div>
                      <h1>Welcome!</h1>
                  </div>
              ) : (
                  <LoginForm onLogin={handleLogin} />
              )}
          </div>
        </main>
      </div>
    );
}
