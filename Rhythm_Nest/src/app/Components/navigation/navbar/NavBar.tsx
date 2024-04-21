import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../../../Logo.png";
import { useAuth } from "../../../context/AuthContext";
import {Button} from "@mui/material";

const NavBar = () => {
    const { logOut } = useAuth();

    const handleSignout = async () => {
        try {
            await logOut(); 
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
    return (
        <div className="w-full h-20 bg-purple-800 stick top-0">
            <div className="container mx-auto px-4 h-full">
                <div className="flex justify-between items-center h-full">
                    <Image src={logo} alt="Rhythm Nest" width={75}/>
                    <ul className="hidden md:flex gap-x-6 text-white">
                        <li>
                            <Link href="/collection">
                                <p className="linkButton">Collection</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/wishlist">
                                <p className="linkButton">Wishlist</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/search">
                                <p className="linkButton">Search</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile">
                                <p className="linkButton">Profile</p>
                            </Link>
                        </li>
                        <li>
                            <Button className="linkButton" variant="contained" color="error" onClick={handleSignout}>Sign out</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;