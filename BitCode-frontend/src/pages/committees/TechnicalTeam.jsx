import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import TC1 from "/TC1.jpg";
import TC2 from "/TC2.jpg";
import TC3 from "/TC3.jpg";
import TC4 from "/TC4.jpg";
import { BsLinkedin } from "react-icons/bs";

export default function TechnicalTeam() {
  return (
    <div className="min-h-screen text-gray-800 bg-white md:p-20 dark:text-white">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center md:text-4xl ">
          Technical Team
        </h1>

        <div className="justify-center gap-10 md:flex">
          <Card className="mx-auto mt-20 hover:shadow-2xl w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={TC1}
                width="96"
                className="mb-3 rounded-full shadow-lg "
              />
              <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                Kavishka Kalhara
              </h5>
              <span className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Team Lead - Developer
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Undergraduate
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Department of Computer Engineering
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Faculty of Engineering
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                University of Ruhuna
              </span>
              <div className="mt-10">
                <Link to="https://www.linkedin.com/in/kavishkakalhara/" target="_blank">
                  <BsLinkedin className="text-3xl hover:text-blue-600 hover:shadow-xl hover:text-4xl" />
                </Link>
              </div>
              {/* <div className="flex mt-4 space-x-3 lg:mt-6">
                <Link
                  to="mailto:kavishkakalharapro@gmail.com"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Contact
                </Link>
              </div> */}
            </div>
          </Card>
          <Card className="mx-auto mt-20 hover:shadow-2xl w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={TC2}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
                Chamuditha Kekulawala
              </h5>
              <span className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Developer
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Undergraduate
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Department of Computer Engineering
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Faculty of Engineering
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                University of Ruhuna
              </span>
              <div className="mt-10">
                <Link to="https://www.linkedin.com/in/krcskekulawala/" target="_blank">
                  <BsLinkedin className="text-3xl hover:text-blue-600 hover:shadow-xl hover:text-4xl" />
                </Link>
              </div>
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
          <Card className="mx-auto mt-20 hover:shadow-2xl w-80">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={TC3}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
                Raveesha Peiris
              </h5>
              <span className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Developer
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Undergraduate
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Department of Computer Engineering
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Faculty of Engineering
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                University of Ruhuna
              </span>
              <div className="mt-10">
                <Link to="https://www.linkedin.com/in/raveesha-peiris-346640295/" target="_blank">
                  <BsLinkedin className="text-3xl hover:text-blue-600 hover:shadow-xl hover:text-4xl" />
                </Link>
              </div>
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
          <Card className="mx-auto mt-20 mb-20 hover:shadow-2xl w-80 sm:mb-0">
            <div className="flex flex-col items-center pb-10">
              <img
                alt="Profile img"
                height="96"
                src={TC4}
                width="96"
                className="mb-3 rounded-full shadow-lg "
              />
              <h5 className="mb-1 text-lg font-medium text-center text-gray-900 dark:text-white">
                Tanuri Bawanya
              </h5>
              <span className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Developer
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Undergraduate
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Faculty of Engineering
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                University of Ruhuna
              </span>
              <div className="mt-10">
                <Link to="https://www.linkedin.com/in/tanuri-weerathunga-51b77a281/" target="_blank">
                  <BsLinkedin className="text-3xl hover:text-blue-600 hover:shadow-xl hover:text-4xl" />
                </Link>
              </div>
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
  );
}
