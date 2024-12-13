import React, { useRef } from "react";
import Logo from "../../public/logo.png";
import { useSelector } from "react-redux";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import { toJpeg } from "html-to-image";
import { Button } from "flowbite-react";

export default function DashMemberCard() {
  const { currentUser } = useSelector((state) => state.user);
  const cardRef = useRef(null);
  const handleDownload = () => {
    if (cardRef.current === null) {
      return;
    }

    toJpeg(cardRef.current, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "REFAA_Membership-Card.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to download image", err);
      });
  };

  return (
    <div className="flex flex-col justify-center mx-auto">
      <div className="grid mx-auto mb-20">
        <div
          ref={cardRef}
          className="sm:flex items-center justify-center sm:w-[6in] w-[3.5in] sm:h-[3.5in] gap-2 p-1 mx-auto shadow-2xl rounded-3xl"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <div className="flex-1 p-2 mb-20 sm:mb-0">
            <img
              src={Logo}
              alt="REFAA"
              className="items-center justify-center mx-auto sm:mt-2 w-[2in] mt-10"
            />
            <h1 className="mt-2 text-xs font-bold text-center text-gray-500">
              RUHUNA ENGINEERING FACULTY ALUMNI ASSOCIATION
            </h1>
          </div>
          <div className="p-2 sm:h-full flex-2 bg-refaa-blue rounded-3xl">
            <h1 className="mt-5 text-lg font-bold text-center text-white">
              MEMBERSHIP CARD
            </h1>
            <div className="grid grid-cols-[auto_min-content_auto] gap-x-1 mt-10 px-5 text-xs text-white">
              <div>Name</div>
              <div>:</div>
              <div className="font-semibold">{currentUser.fullname}</div>
            </div>
            <div className="grid grid-cols-[auto_min-content_auto] mt-1 text-xs text-white gap-x-1 px-5">
              <div>Membership No</div>
              <div>:</div>
              <div className="font-semibold">
                {currentUser.isMember === "Life" ||
                currentUser.isMember === "Ordinary"
                  ? currentUser.trend2
                  : "Pending"}
              </div>
              {/* <div className="font-semibold text-gray-400">&nbsp;Pending</div> */}
            </div>
            <div className="px-5 mt-20 text-xs text-white">
              <div className="flex items-center">
                <HiLocationMarker />
                <span className="ml-1">
                  Faculty of Engineering, University of Ruhuna, <br />
                  Hapugala, Galle, Sri Lanka.
                </span>
              </div>
            </div>
            <div className="px-5 mt-2 text-xs text-white">
              <div className="flex items-center">
                <HiMail />
                <span className="ml-1">info@refaa.lk</span>
              </div>
            </div>
            <div className="px-5 mt-2 mb-10 text-xs text-white">
              <div className="flex items-center">
                <HiPhone />
                <span className="ml-1 ">+94 70 245 1096</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleDownload}
        className="bg-refaa-blue hover:bg-red-950 ring-0 focus:ring-transparent hover:shadow-xl"
      >
        Download Membership Card
      </Button>
    </div>
  );
}
