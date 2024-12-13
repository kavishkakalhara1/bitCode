import { HomeCarousel } from "./HomeCarousel";
import refaa1 from "../assets/carrousel/refaa1.jpg";
import refaa2 from "../assets/carrousel/refaa2.jpg";
import refaa3 from "../assets/carrousel/refaa3.jpg";
import refaa4 from "../assets/carrousel/refaa4.jpg";
import refaa5 from "../assets/carrousel/refaa5.jpg";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";

export default function allToAction() {
  const images = [refaa1, refaa2, refaa3, refaa4, refaa5]; // array of images
  const [index, setIndex] = useState(0); // initial index

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length); // cycle through images
    }, 5000); // change every 5 seconds

    return () => clearInterval(timer); // cleanup on unmount
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-3 text-center sm:flex-row rounded-tl-3xl rounded-br-3xl">
      <div className="flex flex-col justify-center flex-1 ml-10 mr-10">
        <h2 className="mt-20 text-3xl font-semibold text-white md:text-5xl md:mt-0">
          About Us
        </h2>
        <p className="my-5 text-white text-white-500 md:text-2xl">
          Welcome to Code Campus—where technology meets innovation! We provide a
          dynamic learning environment for aspiring developers, entrepreneurs,
          and tech enthusiasts. Our platform offers hands-on coding tutorials,
          practical projects, and expert-led courses designed to help you master
          software development and build your future in tech. Whether you're a
          beginner or looking to sharpen your skills, Code Campus is here to
          guide you every step of the way.
          <br />
          Join us to reconnect, collaborate, and celebrate the legacy of
          Engineering.
        </p>
      </div>
      <div className="flex-1 p-7 rounded-3xl">
        {/* <img
          src={images[index]}
          className="border-l-4 border-r-4 border-blue-300 shadow-lg rounded-3xl"
        /> */}
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
            <img src={refaa1} />
            <img src={refaa2} />
            <img src={refaa3} />
            <img src={refaa4} />
            <img src={refaa5} />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
