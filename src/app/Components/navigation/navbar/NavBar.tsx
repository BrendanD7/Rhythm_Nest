import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../../../Logo.png";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NavBar = () => {
  /** Hooks */
  const { logOut, user } = useAuth();
  const router = useRouter();

  /** Handle signing the user out, on pressing signout */
  const handleSignout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  /** If the user is not logged in, don't show the navbar */
  if (!user.isLoggedIn) return null;

  /** Define the gradient background */
  const navbarStyle = {
    background: "linear-gradient(to right, #8e2de2, #4a00e0)"
  };

  return (
    <div style={navbarStyle}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src={logo} alt="Rhythm Nest" width={75} height={75} />
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
            <Button
              className="linkButton"
              variant="contained"
              color="error"
              onClick={handleSignout}
            >
              Sign out
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
