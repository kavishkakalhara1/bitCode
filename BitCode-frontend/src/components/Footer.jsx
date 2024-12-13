import React from "react";
import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <Footer>
      <div className="w-full text-gray-100 border bg-refaa-blue" >
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-3">
          <div className="md:ml-20">
            <Footer.Title title="Contact Us" />
            <Footer.LinkGroup col>
              <Footer.Link href="mailto:info@refaa.lk">
                info@codecampus.lk
              </Footer.Link>
              <Footer.Link href="mailto:president@refaa.lk">
              info@codecampus.lk
              </Footer.Link>
              <Footer.Link href="mailto:secretary@refaa.lk">
              info@codecampus.lk
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div className="md:ml-20">
            <Footer.Title title="help center" />
            <Footer.LinkGroup col>
              <Footer.Link href="https://www.facebook.com/profile.php?id=61557499701682&mibextid=ZbWKwL" target="_blank">Facebook</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div className="md:ml-20">
            <Footer.Title title="legal" />
            <Footer.LinkGroup col>
              <Footer.Link ><Link to="/about/constitution">Privacy Policy</Link></Footer.Link>
              <Footer.Link ><Link to="/about/constitution">Terms &amp; Conditions</Link></Footer.Link>
            </Footer.LinkGroup>
          </div>
          {/* <div>
            <Footer.Title title="download" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">iOS</Footer.Link>
              <Footer.Link href="#">Android</Footer.Link>
              <Footer.Link href="#">Windows</Footer.Link>
              <Footer.Link href="#">MacOS</Footer.Link>
            </Footer.LinkGroup>
          </div> */}
        </div>
        <div className="w-full px-4 py-6 bg-indigo-950 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="/"
            by="CODE-CAMPUS™ -  All Rights Reserved."
            year={new Date().getFullYear()}
          />
          <div className="flex mt-4 mr-20 space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/profile.php?id=61557499701682&mibextid=ZbWKwL" target="_blank" icon={BsFacebook} />
            {/* <Footer.Icon href="#" icon={BsInstagram} /> */}
          </div>
        </div>
      </div>
    </Footer>
  );
}