"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.push('/login'); 
    }, [router]); 
}
