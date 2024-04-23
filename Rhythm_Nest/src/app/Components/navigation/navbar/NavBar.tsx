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
        <div className="bg-purple-800">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Image src={logo} alt="Rhythm Nest" width={75} height={75}/>
                    <h1 className="text-white text-xl font-bold ml-4">Rhythm Nest</h1>
                </div>
                <ul className="flex gap-x-6 text-white">
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
    );
};

export default NavBar;