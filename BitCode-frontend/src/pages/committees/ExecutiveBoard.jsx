import React from 'react'
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom'
import image1 from "/1.jpg"
import image2 from "/2.jpeg"
import image3 from "/3.jpg"
import image4 from "/4.jpg"
import image5 from "/5.jpg"
import image6 from "/6.jpg"
import image7 from "/7.jpg"
import image8 from "/8.jpg"
import image9 from "/9.jpg"
import image10 from "/10.jpg"
import image11 from "/11.jpg"
import image12 from "/12.jpg"
import image13 from "/13.jpg"
import image14 from "/14.jpg"
import image15 from "/15.jpg"
import image16 from "/16.jpg"
import image17 from "/17.jpg"
import image18 from "/18.jpg"
import image19 from "/19.jpg"

export default function ExecutiveBoard() {
  return (
    <div className="min-h-screen text-gray-800 bg-white md:p-20 dark:text-white">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center md:text-4xl ">Executive Committee - 2024/2025</h1>

        <div className="justify-center gap-10 md:flex">
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image1}
                width="96"
                className="mb-3 rounded-full shadow-lg "
              />
              
              <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
              Eng. B.N. Chamara

              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                President
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                <Link
                  to="mailto:president@refaa.lk"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link>
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image2}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Hasaranga Vidanapathirana
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Vice President
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
        </div>

        <div className="justify-center gap-10 md:flex">
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                width="96"
                src={image3}
                
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. (Dr.) Samanthi Seneviratne
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Secretary
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                <Link
                  to="mailto:secretary@refaa.lk"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link>
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10 ">
              <img
                alt="Profile img"
                height="96"
                src={image5}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Kalana Prabhath 
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Assistant Secretary
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image4}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Varunika Kodithuwakku

              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Assistant Secretary
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
        </div>

        <div className="justify-center gap-10 md:flex">
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image6}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Loshan Palayangoda

              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Treasurer
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image7}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Dayan Marabedda
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Assistant Treasurer
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
        </div>
        <div className="justify-center gap-10 md:flex">
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image8}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Tharindu Yahampath
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Editor
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image9}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. (Dr.) Thilina Weerasinghe
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Faculty Coordinator
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
        </div>

        <div className="justify-center gap-10 md:flex">
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image14}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Sampath Jayashantha

              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Committee Member
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image16}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Ravindra Sampath Kumara
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Committee Member
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image19}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Shyamalie Hadiwattage
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Committee Member
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image15}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Rohan Edirisooriya
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Committee Member
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image17}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Chamila Indrajith

              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Committee Member
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
        </div>

        <div className="justify-center gap-10 md:flex">
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image13}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Gehan Lokunarangoda
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Committee Member
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image12}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Samith Ranga

              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Committee Member
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image18}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Hasini Ganege

              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Committee Member
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image10}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Sandun Wickramasinghe
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Committee Member
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-20 mb-20 w-80 md:mb-0">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={image11}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
              Eng. Praveen Bharatha Kumarasiri

              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Committee Member
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                {/* <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>

  )
}
