
import React from "react";
import Whatsapp from "/whatsapp.svg";
import { Link } from "react-router-dom";

export default function WhatsAppButton() {
  return (
    <div className="fixed z-50 bottom-4 right-4">
      <Link to="https://chat.whatsapp.com/H8c6NSERqCt2BuBTbNyo9J" target="_blank">
        <img src={Whatsapp}  width={60} height={60} alt="" />
      </Link>
    </div>
  );
}
