import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsVoicemail,
} from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <div className="min-h-screen p-10 text-gray-800 bg-white md:p-20 dark:text-white">
      <div className="container flex items-center justify-center mx-auto">
        <div className="justify-center max-w-2xl p-20 mt-5 border-t-4 border-b-4 shadow-xl border-refaa-red rounded-2xl">
          <h1 className="mb-10 text-3xl font-semibold text-center">
            Contact Us
          </h1>
          <h1 className="flex items-center gap-4 text-center text-md">
            <span className=" text-md text-refaa-red hover:shadow-lg">
              <SiGmail />
            </span>
            <Link to="mailto:info@refaa.lk" className="hover:text-refaa-red hover:font-semibold">info@refaa.lk</Link>
          </h1>
          <h1 className="flex items-center gap-4 text-center text-md">
            <span className=" text-md text-refaa-red hover:shadow-lg">
              <SiGmail />
            </span>
            <Link to="mailto:president@refaa.lk" className="hover:text-refaa-red hover:font-semibold">president@refaa.lk</Link>
          </h1>
          <h1 className="flex items-center gap-4 text-center text-md">
            <span className=" text-md text-refaa-red hover:shadow-lg">
              <SiGmail />
            </span>
            <Link to="mailto:secretary@refaa.lk" className="hover:text-refaa-red hover:font-semibold">secretary@refaa.lk</Link>
          </h1>
          <h1 className="my-4 mt-10 text-xl font-semibold text-center">
            Follow Us on:
          </h1>
          <div className="flex justify-center mt-5 row">
            <span className="text-4xl text-refaa-blue hover:shadow-lg">
                <Link to="https://www.facebook.com/profile.php?id=61557499701682&mibextid=ZbWKwL" target="_blank"><BsFacebook /></Link>
              
            </span>
            <span className="ml-4 text-4xl text-refaa-blue hover:shadow-lg">
              <BsLinkedin />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
