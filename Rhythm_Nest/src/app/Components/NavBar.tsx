import Link from "next/link";
import React from "react";
interface NavBarProps {
    isLoggedIn: boolean;
  }
const NavBar: React.FC<NavBarProps> = ({ isLoggedIn }) => {
    if(!isLoggedIn){
        return null;
    }
    return (
        <div className="w-full h-20 bg-purple-800 stick top-0">
            <div className="container mx-auto px-4 h-full">
                <div className="flex justify-between items-center h-full">
                    <ul className="hidden md:flex gap-x-6 text-white">
                        <li>
                            <Link href="/collection">
                                <p>Collection</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/wishlist">
                                <p>Wishlist</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/search">
                                <p>Search</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile">
                                <p>Profile</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;