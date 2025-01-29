    import React from "react";
    import Image from "next/image";
    import kgpconnectLogo from "../app/kgpconnect.jpg"
    import Link from "next/link";

    export default function Navbar() {
        return (
            <nav className="fixed w-full h-24 shadow-xl bg-white">
                <div className="flex justify-between items-center px-4">
                    <div>
                        <Link href='/'>
                        <Image src={kgpconnectLogo} alt="logo" width="205" height="205"></Image>
                        </Link>
                    </div>
                    <div>
                        <ul className="flex">
                            <Link href='/about'>
                                <li className="ml-10 uppercase hover:border-b text-xl text-black justify-center">About</li>
                            </Link>
                            <Link href='/contacts'>
                                <li className="ml-10 uppercase hover:border-b text-xl text-black justify-center">Contacts</li>
                            </Link>
                            <Link href='/home'>
                                <li className="ml-10 uppercase hover:border-b text-xl text-black justify-center">Home</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="ml-10">
                        <Link href='/login'>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Login</button>
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }